var mongoose = require("mongoose");
passportlocal = require("passport-local-mongoose");

var userschema =  new mongoose.Schema({
    username: String,
    password: String
});

userschema.plugin(passportlocal);


module.exports = mongoose.model("user",userschema);