//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const date = require(__dirname + "/date.js");

const _ = require("lodash");

//Database
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://admin-yourFirstName:<password>@cluster0.niakw.mongodb.net/todolistDB" , {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

//var,let,const inside funtion local;
//let,const inside if/else local but var global

let workItems = [];

app.use(express.static("public"));
//Able to include css file

app.set("view engine", "ejs");
//To use embedded java script for tempelates
//by default access views folder. //need to create .ejs file

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));
//Able to include css file

//Database
const itemSchema = new mongoose.Schema({
  name: String
  });

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema]
    });

const Item = mongoose.model("Item",itemSchema);
const List = mongoose.model("List",listSchema);


const item1 = new Item({
     name: "Purchase a dog."
});
const item2 = new Item({
  name: "Solve some questions."
});
const item3 = new Item({
  name: "Call jhoklu mollu."
});


const defaultItems = [item1,item2,item3];


  

//Database






app.get("/", function (req, res) {

  Item.find({},function(err,foundItem){

    if(foundItem.length == 0){
      Item.insertMany(defaultItems , function(err){
        if(!err){
            console.log(err);
        }else{
            console.log("Succesfully saved all");
        }
        
    });
     res.redirect("/");
    }else{
      let day = date();
      res.render("list", { listTitle: day, newListItems: foundItem });
      //Used for .ejs file

      }
  });
 
});

//Express Route Parameters
app.get("/:customListName" , function(req,res){
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName},function(err,foundList){
    if(!err){
      if(!foundList){
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/"+customListName);
      }else{
        res.render("list", { listTitle: customListName, newListItems: foundList.items });
      }
    }
  }); 
});



app.post("/", function (req, res) {

    //console.log(req.body);
    let day1 = date();
    
    let newitem = req.body.newitem;
    const listName = req.body.list;


    const item = new Item({
      name: newitem 
 });



    if(listName === day1){
      item.save();
      res.redirect("/");
    }else{
      List.findOne({name: listName},function(err,foundList){
        foundList.items.push(item);
        foundList.save();
        res.redirect("/"+listName);
      });
        
    }
  
 // res.render("list",{newListItem: newitem}); , this will give an error must be include in get method
  //console.log(newitem);
});

app.post("/delete",function(req,res){
    const checkedItemId = req.body.checkbox;
    let day1 = date();
    const listName = req.body.listName;
    
    if(listName == day1){
      Item.findByIdAndRemove(checkedItemId,function(err){
        if(err)
        console.log(err);
        else{
          console.log("Element successfully deleted");
          res.redirect("/");
        }
        
      });
    }else{
      List.findOneAndUpdate({name: listName},{$pull:{items: {_id: checkedItemId}}},function(err,foundList){
        if(!err){
          res.redirect("/"+listName); 
        }
      });
    }
    



    //console.log(checkedItemId);
    
});



// app.get("/work", function (req, res) {
//     res.render("list", {listTitle: "Work List" ,newListItems: workItems});

// });

// app.post("/work",function(req,res){
//     let item = req.body.newitem;
//     workItems.push(item);
//     res.redirect("/work");
// });


app.get("/about", function (req, res) {
    res.render("about");

});

app.listen(process.env.PORT || 3000, function () {
  console.log("server started on port 3000");
});
