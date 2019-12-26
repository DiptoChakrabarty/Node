var express = require("express");
var body = require("body-parser")
var app = express();
app.set("view engine","ejs");
app.use(body.urlencoded({extended: true}));

friends=["Bob","Marley","pokemon"]

app.get("/",function(req,res){
    res.render("home");
});

app.get("/friends",function(req,res){
    res.render("friends",{friends : friends});
});

app.post("/add",function(req,res){
    var frnd= req.body.frnd;
    friends.push(frnd);
    //res.send("Added a new friend");
    res.redirect("/friends");
});

app.listen(3000,function(){
    console.log("Server running at port 3000");
});