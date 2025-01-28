import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "123456",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

// let users = [
//   { id: 1, name: "Angela", color: "teal" },
//   { id: 2, name: "Jack", color: "powderblue" },
// ];

async function getAllUsers() {
  const users = await db.query(
    "SELECT * FROM users;"
  );
  return users;
}

async function checkVisisted(userId) {
  const result = await db.query(
    "SELECT country_code FROM visited_countries WHERE user_id = $1", 
    [userId]
    );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
};

async function getCurrentUser(userId) {
  const result = await db.query(
    "SELECT * FROM users WHERE id = $1",
    [userId]
  );
  return result;
};

app.get("/", async (req, res) => {
  const countries = await checkVisisted(currentUserId);
  const currentUser = await getCurrentUser(currentUserId);
  const users = await getAllUsers();

  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users.rows,
    color: currentUser.rows[0].color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1,$2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  if (req.body.add === "new"){
    res.render("new.ejs");
  } else {
      currentUserId = req.body.user;
      const userData = await getCurrentUser(currentUserId);
      const countries = await checkVisisted(currentUserId);
      const users = await getAllUsers();
      // console.log(userData);
      res.render("index.ejs",
        {
          countries: countries,
          total: countries.length,
          users: users.rows,
          color: userData.rows[0].color,
        }
      )
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html

  const userData = await db.query(
    "INSERT INTO users (username, color) VALUES ($1, $2) RETURNING id, color",
    [req.body.name, req.body.color]
  );
  currentUserId = userData.rows[0].id;
  const countries = await checkVisisted(currentUserId);
  const users = await getAllUsers();
  res.render("index.ejs",
  {
    countries: countries,
    total: countries.length,
    users: users.rows,
    color: userData.rows[0].color,
  })
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
