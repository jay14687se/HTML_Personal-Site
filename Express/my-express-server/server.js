//jshint esversion:6
const express = require('express');
const app = express();

app.get("/", function(request, response){
  // console.log(request);
  response.send("<h1>Hello World!</h1>");
});

app.get("/contact", function(req, res){
  res.send("Contact me at: maneshjay@gmail.com");
});

app.get("/about", function(req, res){
  res.send("I'm a software engineer with experience in functional and automation testing. Loving learning development now");
});

app.listen(3000, function(){
  console.log("Server has started on port 3000");
});
