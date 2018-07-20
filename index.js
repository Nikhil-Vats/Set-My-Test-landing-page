const path = require('path');

var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/NewProject");
var nameSchema = new mongoose.Schema({
    full_Name: String,
    address_line_1: String,
    email: String
});
var User = mongoose.model("User", nameSchema);
const publicPath = path.join(__dirname,'/');

app.use(express.static(publicPath));

app.post("/addUser", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("User saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});