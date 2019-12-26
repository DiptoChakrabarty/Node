var express =  require("express");
var app = express();
var body = require("body-parser");

app.use(body.urlencoded({extended : true}));

app.set("view engine","ejs");

var games = [
    {name: 'sam', url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHys3zUHtG3crOhn9e93gdB1g1K6fS-628jLZ9os6btto4gfRZ&s" },
    {name: 'snake', url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFzCBvmphx61iko2bVWaf-jLDzeS0ArgL33oAGD9WgPIRcWco5&s" },
    {name:'agent47', url: "https://img.gta5-mods.com/q95/images/hitman-2-sniper-assassin-agent-47/8b6336-agent-47-hitman-2-pu-1366x768.jpg " }
];

app.get("/",function(req,res){
    res.render("home");
});

app.get("/game",function(req,res){
   
    res.render("game",{games : games});
});

app.post("/game",function(req,res){
    var name = req.body.name;
    var url = req.body.url;
    var newgame= {name: name , url: url};
    games.push(newgame);
    res.redirect("/game")
});

app.get("/new",function(req,res){
          
    res.render("form")
});


app.listen(3000,function(){
    console.log("Server started in port 3000");
});