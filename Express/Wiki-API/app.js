//jshint esversion:6
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view-engine", 'ejs');
app.set(express.static("static-files"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const articleSchema = {
  title: String,
  content: String
}

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
  .get(function(req, res) {
    Article.find(function(err, foundArticles) {
      // console.log(foundArticles);
      if (err) {
        res.send(err);
      } else {
        res.send(foundArticles);
      }
    });
  })
  .post(function(req, res) {
    console.log(req.body.title);
    console.log(req.body.content);
    const article = new Article({
      title: req.body.title,
      content: req.body.content
    });
    // Article.insertMany
    article.save(function(err) {
      if (!err) {
        res.send("Request posted successfully");
      } else {
        res.send("Error hile posting request. The error is " + err);
      }
    });
  })
  .delete(function(req, res) {
    Article.deleteMany(function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send("Deleted all articles");
      }
    });
  });

app.route("/articles/:articleTitle")
  .get(function(req, res){
    // console.log(req.params.articleTitle);
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
      if(!foundArticle){
        res.send("No such article found!");
      } else {
        res.send(foundArticle);
      }
    });
  })
  .put(function(req, res){
    Article.updateOne(
      {title: req.params.articleTitle},
      {title: req.body.title, content: req.body.content},
      {overwrite:true},
      function(err){
        if(err){
          res.send(err);
        } else {
          res.send("New article added");
        }
      }
    );
  })
  .patch(function(req, res){
    Article.updateOne(
      {title: req.params.articleTitle},
      {$set: req.body},
      function(err){
        if(!err){
          res.send("Successfully updated article.");
        } else {
          res.send(err);
        }
      }
    );
  })
  .delete(function(req, res){
    Article.deleteOne({title: req.params.articleTitle}, function(err, foundArticle){
      if(!foundArticle){
        res.send("No such article found!");
      } else {
        res.send("Deleted requested article.");
      }
    })
  })

const listener = app.listen(3000, function() {
  console.log("Server stated on port " + listener.address().port);
});
