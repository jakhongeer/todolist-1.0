const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set("view engine", "ejs")

app.get("/", function(req, res) {

    var today = new Date();
    currentDay = today.getDay()
    console.log(currentDay);
    var day = ""

    switch (currentDay) {
        
    }

    if (today.getDay >= 5) {
        day = "Weekend";
    } else {
        day = "Weekday";
    }
    res.render("list", {kindOfDay: day});
})

app.listen(3000, function() {
    console.log("Server is running on port 3000...")
})
