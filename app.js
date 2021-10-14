const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(express.static("public"));


const items = ["Get up at 7 am", "Go to uni", "Get back to home"];
const workItems = [];

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemsSchema = new mongoose.Schema({
  name: String
})

const Item = new mongoose.model("Item", itemsSchema);

const firstItem = new Item({
  name: "Welcome to do todo app"
})

const secondItem = new Item({
  name: "Hit the + to add an item"
})

const thirdItem = new Item({
  name: "<-- Hit the - to remove an item"
})

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema]
})

defaultItems = [firstItem, secondItem, thirdItem];

const List = new mongoose.model("List", listSchema);

app.get("/", function (req, res) {

  
  Item.find({}, function(err, foundItems) {

    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err){
        if (err) {
          console.log(err)
        } else {
          console.log("Success!")
        }
      });
      res.redirect("/");

    } else {
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }

    
  })
  
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName
  })

  item.save(); 

  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.post("/delete", function(req, res) {
  const checkedItem = req.body.checkbox;

  Item.findByIdAndRemove(checkedItem, function(err) {
    if(err){
      console.log(error)
    } else {
      console.log("Successfully deleted!")

      res.redirect("/")
    }
  })
})

app.get('/:customName', function(req, res) {

  const customName = req.params.customName

  List.findOne({name: customName}, function(err, foundList) {
    if (!err) {
      if (!foundList){
        //Create the list 
        const list = new List({
          name: customName,  
          items: defaultItems  
        })
        list.save();
        res.redirect("/" + customName)
      } else {
        //Show the existing list
        res.render('list', { listTitle: foundList.name, newListItems: foundList.items })
      }
    } 
  })
    
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000...");
});
