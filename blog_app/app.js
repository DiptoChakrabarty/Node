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

blog.create({
    title: 'sam', 
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHys3zUHtG3crOhn9e93gdB1g1K6fS-628jLZ9os6btto4gfRZ&s",
    body: "Awesome Stealth Game"
}, function(err,blog){
    if(err){
        console.log(err);
    } else {
        console.log("New blog added");
        console.log(blog);
    }
})*

// setup REST routes
app.get("/",function(req,res){
    res.redirect("/blogs");
});

app.get("/blogs",function(req,res){
    blog.find({},function(err,blogs){
        if(err){
            console.log("Error");
        } else {
            res.render("index" , {blogs : blogs})
        }
    });
   
});


app.listen(3000,function(){
    console.log("Server started in port 3000");
});