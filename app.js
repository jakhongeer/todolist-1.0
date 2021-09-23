const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.get("/", function(req, res) {

    var today = new Date();
    console.log(today.getDay())

    if (today.getDay >= 5) {
        res.sendFile(__dirname + "/weekend.html")
    } else {
        res.sendFile(__dirname + "/weekday.html")
    }
})

app.listen(3000, function() {
    console.log("Server is running on port 3000...")
})
