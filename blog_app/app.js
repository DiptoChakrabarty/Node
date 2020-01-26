var express =  require("express"),
    app = express(),
    body = require("body-parser"),
    passport = require("passport"),
    local= require("passport-local"),
    mongoose = require("mongoose");

var blog= require("./models/blog.js");
var user = require("./models/user.js");
var comment = require("./models/comment.js");
var seedDB = require("./seeds");

var methodOverride =  require("method-override");

mongoose.connect("mongodb://localhost/blog");
// setup app
app.use(body.urlencoded({extended : true}));

app.use(express.static("public"));

app.use(methodOverride("_method"));

app.set("view engine","ejs");

seedDB();


// Passport Configuration

app.use(require("express-session")({
    secret: "I am Awesome",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new local(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


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

// New Route

app.get("/blogs/new",function(req,res){
    res.render("new");
});

// Post route
app.post("/blogs",function(req,res){
    blog.create(req.body.blog,function(err,newblog){
        if(err){
            res.render("new");
        } else{
            res.redirect("/");
        }
    });
});

// Get by ID
app.get("/blogs/:id",function(req,res){
    blog.findById(req.params.id).populate("comments").exec(function(err,found){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("showid",{blog:found});
        }
    });
});

//Edit items
app.get("/blogs/:id/edit",function(req,res){
    blog.findById(req.params.id,function(err,found){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("edit",{blog:found});
        }
    });
    
});

//Update items

app.put("/blogs/:id",function(req,res){
        blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updated){
            if(err){
                res.redirect("blogs");
            }else {
                res.redirect("/blogs/"+req.params.id);
            }

        });

});

//Delete items
app.delete("/blogs/:id",function(req,res){
    blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    });
});


//Comments Route

app.get("/blogs/:id/comments/new",function(req,res){
    blog.findById(req.params.id,function(err,data){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new",{blog : data});
      
        }

    });
});

app.post("/blogs/:id/comments",function(req,res){

    blog.findById(req.params.id,function(err,data){
        if(err){
            res.redirect("/blogs");
        }
        else{
            comment.create(req.body.comments,function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    blogs.comments.push(comment);
                    blogs.save();
                    res.redirect("/blogs/"+blogs._id);
                }

            });
        }
    });
});
    
// Registrations Routes *********************//

app.get("/signup",function(res,req){
        res.render("signup");
});


app.post("signup",function(res,req){
    var name = req.body.username;
    var pass =  req.body.password;
    user.register(new user({username: name}),pass,function(err,user){
        if(err){
            res.render("signup");
        }
       passport.authenticate("local")(req,res,function(){                               //local is local strategy
                res.redirect("/")
       });
    });
});

app.listen(3000,function(){
    console.log("Server started in port 3000");
});