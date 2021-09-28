const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs");

app.use(express.static("public"))

let item = "";
let items = ["Get up at 7 am", "Go to uni", "Go to home"];
let workItems = [];

app.get("/", function (req, res) {
  let today = new Date();
  currentDay = today.getDay();
  let day = "";

  let options = {
      weekday : "long",
      day : "numeric",
      month : "long",
  };
  
  day = today.toLocaleDateString("en-US", options);
  res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", function(req, res) {
    console.log(req.body)
    let item = req.body.newItem;
    
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
    res.render("list", {listTitle: "Work", newListItems: workItems});
})


app.listen(3000, function () {
  console.log("Server is running on port 3000...");
});
