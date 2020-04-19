//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");

app.use(express.static("static-files"));

const items = ["Buy Food", "Cook Food", "Eat Food"];// const for arrays allows pushing new items into an array but not assign new array.
const workItems = [];

app.get("/", function(req, res) {
  res.render("list", {
    listTitle: date.getDate(),
    items: items
  });
});

app.post("/", function(req, res) {
  console.log(req.body);
  let listItemAdd = req.body.listItemAdd;
  if (req.body.list === "Work") {
    workItems.push(listItemAdd);
    res.redirect("/work");
  } else {
    items.push(listItemAdd);
    res.redirect("/");
  }
})

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    items: workItems
  });
});

app.post("/work", function(req, res) {
  console.log(req.body);
  let workItem = req.body.listItemAdd;
  workItems.push(workItem);
  res.redirect("/work");
})

app.get("/about", function(req, res){
  res.render("about");
})

const listener = app.listen(3000, function() {
  console.log("Server has started on port " + listener.address().port);
});
