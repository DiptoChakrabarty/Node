var express =  require("express");
var app = express();
var body = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog");
// setup app
app.use(body.urlencoded({extended : true}));

app.use(express.static("public"));

app.set("view engine","ejs");

// Set mongoose Schema
var blogschema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date,default: Date.now }
});

var blog = mongoose.model("blog",blogschema);

// setup REST routes



app.listen(3000,function(){
    console.log("Server started in port 3000");
});