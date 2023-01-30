const express = require("express");
const bodyParser = require("body-parser");
const { renderFile } = require("ejs");

const app = express();

const items = ["buy some food", "prepare some food", "eat some food"];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  let today = new Date();
  let options = {
    weekday: "long",
    month: "short",
    day: "numeric",
  };

  const day = today.toLocaleDateString("en-US", options);

  res.render("list", { eDay: day, newListItem: items });
});

app.post("/", (req, res) => {
  const item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("server running...");
});
