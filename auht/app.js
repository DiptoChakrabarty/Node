var express =  require("express"),
     app = express(),
     body = require("body-parser"),
     passport = require("passport"),
     localstrategy = require("passport-local"),
     passportlocal = require("passport-local-mongoose"),
     user = require("./models/user"),
     mongoose = require("mongoose");



// setup app

app.use(require("express-session")({
    secret: "Sharingan Warrior",
    resave: false,
    saveUninitialized: false

}));

app.use(body.urlencoded({extended : true}));

app.use(express.static("public"));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

mongoose.connect("mongodb://localhost/auth");

app.use(passport.initialize());
app.use(passport.session());


app.set("view engine","ejs");


// Start Setting the Routes
//***************** *//
app.get("/",function(req,res){
    res.render("index");
});


app.get("/secret",function(req,res){
    res.render("secret");
});


app.get("/signin",function(req,res){
    res.render("signin");
});

//app.post("signin",function(req,res){

//})



app.get("/*",function(req,res){
    res.render("extra");
});

app.listen(3000,function(){
    console.log("Server Started in port 3000");
});
