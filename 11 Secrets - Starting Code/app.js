import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

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

async function checkLogin(username, password){
    try {
        const result = await db.query(
            "SELECT * FROM users WHERE username = $1 RETURNING password",
            [username]
        );
        if (result.rows.password == password){
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

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
    const username = req.body.username;
    const password = req.body.password;
    try {
        await db.query("INSERT INTO users(username, password) VALUES ($1, $2)",
            [username, password]);
    } catch (error) {
        console.log(error);
    }
    res.redirect("/");
});

app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.pasword;
    const isLogin = checkLogin(username, password);

    if(isLogin){
        res.render("secrets.ejs");
    } else {
        res.redirect("/");
    }
})

// app.post("/submit", (req, res) => {

// });

app.listen(port, (req, res) => {
    console.log(`App running on port ${port}`);
});