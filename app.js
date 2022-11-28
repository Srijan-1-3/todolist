const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


var today = new Date();

mongoose.connect("mongodb://localhost:27017/itemsDB")


const itemsSchema = new mongoose.Schema({
    name: String
})


const Item = mongoose.model("Item",itemsSchema);




app.get("/",function(req,res){

    var options = {
        weekday:"long",
        day:"numeric",
        month:"long"
    };


    var day = today.toLocaleDateString("en-US",options);

    var all_items = Item.find({},function(err,foundItems){
  
            res.render('list',{ kindOfDay: day,listItems:foundItems});
        
  });

    
});

app.post("/",function(req,res){
   
    var item = req.body["new-item"];
    Item.create({name : item},function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Succesfully added to table");
        }
    })

    res.redirect("/")
})



app.listen(3000,function(){
    console.log("Server running on port 3000")
});