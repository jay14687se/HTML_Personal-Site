//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/bmicalculator", function(req, res){
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function(req, res){
  var result = parseFloat(req.body.weight)/Math.pow(parseFloat(req.body.height), 2);
  res.send("Your BMI is " + result);
});

var listener = app.listen(3000, function(){
  console.log("Server has been started on port " + listener.address().port);
});
