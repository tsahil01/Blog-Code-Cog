const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs'); // telling our app to use ejs. And we have to store it in views

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); // to use css and other things


app.get("/",function(req,res){
    res.render('home', {});
})
app.get("/new",function(req,res){
    res.render('newblog', {});
})
app.get("/blogname",function(req,res){
    res.render('blog', {});
})


app.listen(3000,function(){console.log("Server running at port 3000!")});