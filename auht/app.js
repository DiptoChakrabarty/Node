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
passport.use(new localstrategy(user.authenticate()));

mongoose.connect("mongodb://localhost/auth");

app.use(passport.initialize());
app.use(passport.session());


app.set("view engine","ejs");


// Start Setting the Routes
//***************** *//
app.get("/",function(req,res){
    res.render("index");
});


app.get("/secret",islogged,function(req,res){
    res.render("secret");
});

//signup method

app.get("/signup",function(req,res){
    res.render("signup");
});

app.post("/signup",function(req,res){
    var name = req.body.username;
    var pass = req.body.password;
    console.log(name,pass);
    user.register(new user({username: name}),pass,function(err,user){
        if(err){
            console.log(err);
            res.render("signup");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/secret");
        });

    });
});



// signin method
app.get("/signin",function(req,res){
    res.render("signin");
});



/*app.post("/signin",function(req,res){
    user.create(req.body.users,function(err,Users){
        if(err){
            res.redirect("/signin");
        }else{
            res.redirect("/")
        }
    });
});*/

app.post("/signin",passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/signin"
}),function(req,res){

});

//Logout User
app.get("/logout",function(req,res){
        req.logout();
        res.redirect("/");
});

//Middleware for logged in

function islogged(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}



app.get("/*",function(req,res){
    res.render("extra");
});

app.listen(3000,function(){
    console.log("Server Started in port 3000");
});
