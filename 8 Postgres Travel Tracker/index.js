import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "123456",
  port: 5432
});

db.connect();

app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM visited_countries");
  const country_codes = result.rows.map((country) => country.country_code);
  res.render("index.ejs", {total: result.rows.length, countries: country_codes});
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
