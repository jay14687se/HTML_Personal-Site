//jshint esversion:6
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const apiKey = "2c9d1e9a3b9de2b6f17ac1bf63e4cac4";
  const place = req.body.cityName;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const iconURL = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
      res.write("<h1>The weather at " + place + " is " + temp + " degree Celcius.</h1>");
      res.write("<p>The weather description currently says "+ weatherDesc +".</p>");
      res.write("<img src=" + iconURL + "></img>");
      res.send();
    });
  });
});

var listener = app.listen(3000, function(){
  console.log("Server has started on port " + listener.address().port);
});
