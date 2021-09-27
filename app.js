const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs");

app.use(express.static("public"))

var item = "";
var items = ["Get up at 7 am", "Go to uni", "Go to home"];

app.get("/", function (req, res) {
  var today = new Date();
  currentDay = today.getDay();
  var day = "";

  var options = {
      weekday : "long",
      day : "numeric",
      month : "long",
  };
  
  day = today.toLocaleDateString("en-US", options);
  res.render("list", { kindOfDay: day, newListItems: items});
});

app.post("/", function(req, res) {
    item = req.body.newItem;

    items.push(item); 
    res.redirect("/")
})

app.listen(3000, function () {
  console.log("Server is running on port 3000...");
});
