const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const data = require(__dirname + '/data.js');
const _ = require("lodash");

const app = express();
app.set('view engine', 'ejs'); // telling our app to use ejs. And we have to store it in views

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); // to use css and other things

let details = data.getData();
let detailsKey = Object.keys(details);
let detailsKeyLowercase = detailsKey.map(word => word.toLowerCase());


app.get("/",function(req,res){
    res.render('home', {detailsObejct: details}); //sends JS object to home 

    app.post("/",function(request,response){

        if(Object.keys(details).length ===0){
            response.redirect("/new");
        }
        
        else{
            var h = _.kebabCase(request.body.heading);
            console.log(request.body.heading)
            response.redirect("/posts/:${h}");
        }
    });
})

app.get("/new",function(req,res){
    res.render('newblog', {});
    app.post("/new",function(req,res){
        var heading = _.upperCase(req.body.heading);
        var content = req.body.content;
        data.pushData(heading,content); //sending new blog details to data.js
        res.redirect("/");
    })
})
app.get("/posts/:postName",function(req,res){
    var detailsKeyLowercase = Object.keys(details).map(word => word.toLowerCase());
    var requestedHeading = _.lowerCase(req.params.postName)

    if(detailsKeyLowercase.includes(requestedHeading)){res.render('blog', {title: _.upperCase(req.params.postName), content: details[_.upperCase(req.params.postName)]});} 
})


app.listen(3000,function(){console.log("Server running at port 3000!")});