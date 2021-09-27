const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs");

app.use(express.static("public"))

var item = "";
var items = ["Get up at 7 am", "Go to uni", "Go to home"];
var workItems = [];

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
  res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", function(req, res) {
    item = req.body.newItem;
    
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/")
    }
})

app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
})


app.listen(3000, function () {
  console.log("Server is running on port 3000...");
});
