const express = require("express");
app = express();

const PORT = process.env.PORT || 3005;


app.use(express.static("public"));
app.set("view engine","ejs")

app.get("/",function(req,res){
    res.render("index");
});

app.get("/desc",function(req,res){
    res.send("This is another page");
});


app.listen(PORT,function(){
    console.log("Server Started at port 3005");
})