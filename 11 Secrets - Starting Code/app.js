import './loadEnv.js';
import express from "express";
import session from "express-session";
import passport from 'passport';
import passportLocal from 'passport-local';
// import bodyParser from "body-parser";
import pg from "pg";
// import { Pool } from 'pg';
import connectPgSimple from 'connect-pg-simple';
import bcrypt from "bcrypt";
import passportGoogle from 'passport-google-oauth20';

const localStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.Strategy;
const pgSession = connectPgSimple(session);

const app = express();
const port = 3000;

const pool = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "secret-web",
    password: "123456",
    port: 5432
});
pool.connect();

// const pool = new pg({
//     // connectionString: process.env.DATABASE_URL,
// });

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("public"));

app.use(
    session({
        store: new pgSession({
            pool: pool,
            tableName: "session",
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false},
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new localStrategy(async (username, password, done) => {
        try {
            const result = await pool.query(
                "SELECT * FROM users WHERE username = $1",
                [username]
            );
            if (result.rows.length === 0) return done(null, false, {message: "User tidak ditemukan"});
            
            const user = result.rows[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return done(null, false, {message: "Password salah"});

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let result = await pool.query(
                    "SELECT * FROM users WHERE google_id = $1",
                    [profile.id]
                );
                if (result.rows.length === 0){
                    result = await pool.query(
                        "INSERT INTO users (username, google_id) VALUES ($1, $2) RETURNING *",
                        [profile.displayName, profile.id]
                    );
                }
                return done(null, result.rows[0]);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
    );
    done(null, result.rows[0]);
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/register", (req, res) => {
    res.render("register.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/auth/google", passport.authenticate("google", {scope: ["profile"]}));

app.get(
    "/auth/google/callback",
    passport.authenticate(
        "google",
        {
            successRedirect: "/secret",
            failureRedirect: "/login"
        })
    );

app.get("/submit", (req, res) => {
    res.render("submit.ejs");
});

app.get("/secret", ensureAuthenticated, (req, res) => {
    res.render("secrets.ejs");
});

app.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).send("Gagal logout.");
        res.redirect("/login");
    });
});

app.post("/register", async (req, res) => {
    const {username, password} = req.body;
    const hash = await bcrypt.hash(password, 13);
    try {
        await pool.query("INSERT INTO users(username, password) VALUES ($1, $2)",
            [username, hash]);
    } catch (error) {
        res.status(500).send("Terjadi kesalahan, silahkan coba lagi");
    }
    res.redirect("/");
});

// Old login
// app.post("/login", async (req, res) => {
//     const {username, password} = req.body;
    
//     try {
//         const result = await db.query(
//             "SELECT password FROM users WHERE username = $1",
//             [username]
//         );
//         const isLogin = await bcrypt.compare(password, result.rows[0].password)
//         if(!isLogin){
//             console.log("Login failed");
//             res.redirect("/login");
//         }
//         res.render("secrets.ejs");
//     } catch (error) {
//         console.log(error);
//         res.redirect("/login");
//     }
// })

// New login
app.post(
    "/login",
    passport.authenticate("local",{
        successRedirect: "/secret",
        failureRedirect: "/login"
    })
);


// app.post("/submit", (req, res) => {

// });

app.listen(port, (req, res) => {
    console.log(`App running on port ${port}`);
});