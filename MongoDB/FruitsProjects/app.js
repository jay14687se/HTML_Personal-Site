//jshint esversion:6

// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

const mongoose = require('mongoose');

// // Connection URL
// const url = 'mongodb://localhost:27017';
//
// // Database Name
// const dbName = 'fruitsDB';
// Create a new MongoClient
// const client = new MongoClient(url, {
//   useUnifiedTopology: true
// });

// Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   const db = client.db(dbName);
//   insertDocs(db, function() {
//     client.close();
//   });
// });

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useUnifiedTopology: true , useNewUrlParser: true });

// const insertDocs = function(db, callback) {
//   const collection = db.collection('fruits');
//   collection.insertMany([{
//     name: "Apple",
//     score: 8,
//     review: "Great Fruit"
//   }, {
//     name: "Orange",
//     score: 6,
//     review: "Kinda Sour"
//   }, {
//     name: "Banana",
//     score: 9,
//     review: "Great Stuff"
//   }], function(err, r) {
//     assert.equal(null, err);
//     assert.equal(3, r.insertedCount);
//     assert.equal(3, r.ops.length);
//     console.log("Inserted 3 documents into the collection");
//     callback(r);
//   });
// }

const fruitSchema = new mongoose.Schema ({
  name: String,
  rating: Number,
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Apple",
  rating: 8,
  review: "Awesome fruit"
})

fruit.save();
