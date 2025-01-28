import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
// let country_codes = [];

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

async function checkVisited() {
  const result = await db.query("SELECT * FROM visited_countries");
  const country_codes = result.rows.map((country) => country.country_code);
  return country_codes;
}

app.get("/", async (req, res) => {
  const country_codes = await checkVisited();
  res.render("index.ejs", {
    total: country_codes.length, 
    countries: country_codes
  });
});

app.post("/add", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [req.body.country.toLowerCase()]
      );
    const country_code = result.rows[0].country_code
    try {
      await db.query(
        "INSERT INTO visited_countries(country_code) VALUES($1);",
        [country_code]
        );
      res.redirect("/");
    } catch (error) {
      const country_codes = await checkVisited();
      res.render("index.ejs", {
        total: country_codes.length, 
        countries: country_codes, 
        error: "Country already added, try again"
      });
    }
  } catch (error) {
    const country_codes = await checkVisited();
    res.render("index.ejs", {
      total: country_codes.length, 
      countries: country_codes, 
      error: "Can't find that country, try again"
    });
  }

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
