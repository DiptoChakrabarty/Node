var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("home");
});
app.get("/love/:animal",function(req,res){
    var animal = req.params.animal;
    res.render("love", {retro : animal});
});
app.get("/posts",function(req,res){
     var posts=[
         {title: "a" , author: "aa"},
         {title: "b" , author: "bb"},
         {title: "c" , author: "cc"}
     ];
     res.render("posts",{posts : posts});
});

app.listen(3000,function(){
    
    console.log("Server Started at port 3000");
});