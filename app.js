var bodyParser = require("body-parser"),
    express    = require("express"),
    mongoose   = require("mongoose"),
    app        = express(),
    List       = require("./models/list");

mongoose.connect("mongodb://localhost/toDoList", { useNewUrlParser: true, useUnifiedTopology: true});

// var todos = [
//     "complete video",
//     "boil potatoes",
//     "make aloo tikki",
//     "make burger"
// ];

app.use(bodyParser.urlencoded({extended: true}));    
app.use(express.static("public"));
app.set("view engine","ejs");

// List.create({todos: ["basic task"]},function(err,list){
//     if(err)
//     {
//         console.log(err);
//     }else{
//         console.log(list);
//     }
// });

// ROUTES

app.get("/",function(req,res){
    res.render("home");
});

// INDEX & NEW ROUTE
app.get("/lists",function(req,res){
    List.find({},function(err,lists){
        if(err)
        {
            console.log(err);
        }else{
            // console.log(list[0].todos);
            res.render("index",{lists: lists});
            // var tasks = list[0].todos;
            // res.render("index",{tasks: tasks});
        }
    });
    
});
// CREATE ROUTE
app.post("/lists",function(req,res){
    var todo = req.body.todo;
    List.find({},function(err,list){
        list[0].todos.push(todo);
        list[0].save();
    });
    res.redirect("/lists");
});

app.listen(3000,function(){
    console.log("Server has started!");
});