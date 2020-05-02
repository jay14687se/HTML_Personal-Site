//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');
const mongoose = require('mongoose');
const _ = require('lodash');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("view engine", "ejs");

app.use(express.static("static-files"));

mongoose.connect("mongodb+srv://admin-jayanth:SWOWlcvwkOyxjQhH@jayanth-learning-fo7te.mongodb.net/todolistDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const itemSchema = {
  name: String
}

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "Welcome to your todolist!"
})

const item2 = new Item({
  name: "Hit the + button to add a new item."
})

const item3 = new Item({
  name: "<-- Hit this to delete an item."
})

const defaultItems = [item1, item2, item3];

const customListSchema = {
  name: String,
  items: []
}

const List = mongoose.model("List", customListSchema);

app.get("/", function(req, res) {
  Item.find({}, function(err, results) {
    if (results.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Succesfully added!");
        }
      })
      res.redirect("/");
    } else {
      res.render("list", {
        listTitle: date.getDate(),
        items: results
      });
    }
  });
});

app.post("/", function(req, res) {
  console.log(req.body);
  let listItemAdd = req.body.listItemAdd;
  const item = new Item({
    name: listItemAdd
  });
  List.findOne({
    name: req.body.list
  }, function(err, list) {
    if (!err) {
      if (!list) {
        item.save();
        res.redirect("/");
      } else {
        list.items.push(item);
        list.save();
        res.redirect("/" + list.name);
      }
    }
  });
});

app.post("/delete", function(req, res) {
  console.log(req.body);
  List.findOne({name: req.body.listName}, function(err, list){
    if(!err){
      if(!list){
        Item.deleteOne({_id: req.body.todoItem}, function(err){
          if(!err){
            console.log("Item Deleted");
            res.redirect("/");
          }
        });
      } else {
        List.findOne({name: list.name}, function(err, list) {
          if (!err) {
            list.items.forEach((item, i) => {
              if (item._id.toString() === req.body.todoItem.toString()) {
                list.items.splice(i, 1);
                console.log(list.items);
                List.updateOne({name: list.name}, {items: list.items}, function(err) {
                  if (!err) {
                    res.redirect("/" + list.name);
                  }
                });
              }
            });
          }
        });
      }
    }
  });
});

app.get("/:customListName", function(req, res) {
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({
    name: customListName
  }, function(err, foundList) {
    if (!err) {
      if (!foundList) {
        const list = new List({
          name: customListName,
          items: defaultItems
        })
        list.save();
        res.redirect("/" + customListName);
      } else {
        res.render("list", {
          listTitle: foundList.name,
          items: foundList.items
        });
      }
    }
  });
});

const listener = app.listen(3000, function() {
  console.log("Server has started on port " + listener.address().port);
});

// const items = ["Buy Food", "Cook Food", "Eat Food"];// const for arrays allows pushing new items into an array but not assign new array.
// const workItems = [];
// res.render("list", {
//   listTitle: date.getDate(),
//   items: items
// });
// if (req.body.list === "Work") {
//   workItems.push(listItemAdd);
//   res.redirect("/work");
// } else {
//   items.push(listItemAdd);
//   res.redirect("/");
// }

// const customListName = req.params.customListName;
// List.updateOne({name: list.name}, {items: list.items}, function(err) {
//   if (!err) {
//     res.redirect("/" + list.name);
//   }
// });
// Item.findByIdAndRemove
// app.get("/work", function(req, res) {
//   res.render("list", {
//     listTitle: "Work List",
//     items: workItems
//   });
// });

// app.post("/work", function(req, res) {
//   console.log(req.body);
//   let workItem = req.body.listItemAdd;
//   workItems.push(workItem);
//   res.redirect("/work");
// })

// app.get("/about", function(req, res){
//   res.render("about");
// })

// Item.find({_id: req.body.todoItem}, function(err, foundItem){
//   if(!err){
//     if(foundItem.length === 0){
//       List.find({}, function(err, lists) {
//         if (!err) {
//           lists.forEach((list, i) => {
//             list.items.forEach((item, i) => {
//               if (item._id.toString() === req.body.todoItem.toString()) {
//                 list.items.splice(i, 1);
//                 console.log(list.items);
//                 List.updateOne({name: list.name}, {items: list.items}, function(err) {
//                   if (!err) {
//                     res.redirect("/" + list.name);
//                   }
//                 });
//               }
//             });
//           });
//         }
//       });
//     } else {
//       Item.deleteOne({_id: req.body.todoItem}, function(err){
//         if(!err){
//           console.log("Item Deleted");
//           res.redirect("/");
//         }
//       });
//     }
//   }
// });

// if(req.body.listName === "Today"){
//   Item.deleteOne({_id: req.body.todoItem}, function(err){
//     if(!err){
//       console.log("Item Deleted");
//       res.redirect("/");
//     }
//   });
// } else {
//   List.updateOne({name: req.body.listName}, {$pull: {items: {_id: req.body.todoItem}}}, function(err) {
//     if (!err) {
//       res.redirect("/" + req.body.listName);
//     }
//   });
// }
