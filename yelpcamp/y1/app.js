var express =  require("express");
var app = express();
var body = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/games");

app.use(body.urlencoded({extended : true}));

app.set("view engine","ejs");

// Set Schema
var gameschema = new mongoose.Schema({
    name: String,
    url: String,
    description: String
});

var games = mongoose.model("games",gameschema);

/*  adding to db manually without form
 games.create({
    name: 'sam', 
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHys3zUHtG3crOhn9e93gdB1g1K6fS-628jLZ9os6btto4gfRZ&s",
    description: "Awesome Stealth Game"
}, function(err,game){
    if(err){
        console.log(err);
    } else {
        console.log("New game added");
        console.log(game);
    }
})*/

app.get("/",function(req,res){
    res.render("home");
});

app.get("/game",function(req,res){

    games.find({},function(err,allgame){
        if(err){
            console.log(err);
        } else {
            res.render("game", {games: allgame});
        }
    });
   
    //res.render("game",{games : games});
});

app.post("/game",function(req,res){
    var name = req.body.name;
    var url = req.body.url;
    var desc = req.body.description;
    var newgame= {name: name , url: url , description: desc};
    //games.push(newgame);
    // save to db
    games.create(newgame,function(err,newimg){
        if(err){
            console.log(err);
        } else {
            res.redirect("/game");
        }
    });
    
});

app.get("/new",function(req,res){
          
    res.render("form")
});

app.get("/game/:id",function(req,res){
    games.findById(req.params.id,function(err,found){
        if(err){
            console.log(err);
        } else {
            res.render("show" , {game_name : found}); 
        }
    });
});


app.listen(3000,function(){
    console.log("Server started in port 3000");
});