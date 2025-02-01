import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "secret-web",
    password: "123456",
    port: 5432
});

db.connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/register", (req, res) => {
    res.render("register.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/submit", (req, res) => {
    res.render("submit.ejs");
})

app.post("/register", async (req, res) => {
    const {username, password} = req.body;
    const hash = await bcrypt.hash(password, 13);
    try {
        await db.query("INSERT INTO users(username, password) VALUES ($1, $2)",
            [username, hash]);
    } catch (error) {
        console.log(error);
    }
    res.redirect("/");
});

app.post("/login", async (req, res) => {
    const {username, password} = req.body;
    
    try {
        const result = await db.query(
            "SELECT password FROM users WHERE username = $1",
            [username]
        );
        const isLogin = await bcrypt.compare(password, result.rows[0].password)
        if(!isLogin){
            console.log("Login failed");
            res.redirect("/login");
        }
        res.render("secrets.ejs");
    } catch (error) {
        console.log(error);
        res.redirect("/login");
    }
})

// app.post("/submit", (req, res) => {

// });

app.listen(port, (req, res) => {
    console.log(`App running on port ${port}`);
});