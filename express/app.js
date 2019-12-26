var express =require("express");
var app = express();

app.get("/",function(req,res){
    res.send("Hello Dipto how are you ");
});
app.get("/goodbye",function(req,res){
    res.send("GoodBye");
});
app.get("/:sub/:num",function(req,res){
    var sub = req.params.sub;
    var num = req.params.num;
    var num = parseInt(num,10);
    var empty=" ";
    for (var i=0;i<num;i++){
        empty=empty + " " + sub;
    }
    if (sub=="cow"){
        res.send("Cow");
    }
    res.send(empty);
    //res.send(empty);
    //res.send("This is Sub Page for" + sub);
});
app.get("*",function(req,res){
    res.send("Wrong Page Sorry");
});

app.listen(3000,function(){
    console.log("Server started in port 3000");
});