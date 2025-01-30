import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "123456",
  port: 5432
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];

async function getAllItems(){
  const items = await db.query("SELECT * FROM items");
  return items.rows;
};

app.get("/", async (req, res) => {
  items = await getAllItems();
  // console.log(items);
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  await db.query("INSERT INTO items(title) VALUES ($1)",
    [item]);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const newTitle = req.body.updatedItemTitle;
  const itemId = req.body.updatedItemId;
  await db.query("UPDATE items SET title = $1 WHERE id = $2",
    [newTitle, itemId]);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const itemId = req.body.deleteItemId;
  try {
    await db.query("DELETE FROM items WHERE id = $1",
    [itemId]);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
