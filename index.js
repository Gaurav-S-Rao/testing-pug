const path = require("path");
const express = require("express");
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("user_account", {
    title: "hello",
  });
});

app.listen(5000, (req, res) => {
  console.log(`listening on port 5000.....`);
});
