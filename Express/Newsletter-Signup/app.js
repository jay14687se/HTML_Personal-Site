//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("static-files"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us4.api.mailchimp.com/3.0/lists/ee005d6560";
  const options = {
    method: "POST",
    auth: "jayse1:ea6c17455e8cdb004e6c8fafd8c3e121-us4"
  };
  var request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
      const apiData = JSON.parse(data);
      if (apiData.error_count === 0) {//apiData.error_count > 0
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

const listener = app.listen(process.env.PORT || 4000, function(){
  console.log("Server has started on port " + listener.address().port);
});
