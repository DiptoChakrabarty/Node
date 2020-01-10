var express =  require("express"),
     app = express(),
     body = require("body-parser"),
     localstrategy = require("passport-local"),
     passportlocal = require("passport-local-mongoose"),
     user = require("./models/user"),
     mongoose = require("mongoose");



// setup app
app.use(body.urlencoded({extended : true}));

app.use(express.static("public"));


mongoose.connect("mongodb://localhost/auth");


app.set("view engine","ejs");


app.get("/",function(req,res){
    res.render("index");
});


app.get("/secret",function(req,res){
    res.render("secret");
});

app.get("/*",function(req,res){
    res.render("extra");
});


app.listen(3000,function(){
    console.log("Server Started in port 3000");
});
