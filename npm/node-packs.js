var cat = require("cat-me");
var fake = require("faker")

for (var i=0;i<10;i++){

var randomName = fake.name.findName(); 
var randomEmail = fake.internet.email();
var randomcity = fake.address.city();
console.log(randomName,randomEmail,randomcity);
};




//console.log(cat());