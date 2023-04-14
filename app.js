const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const data = require(__dirname + '/data.js');

const app = express();
app.set('view engine', 'ejs'); // telling our app to use ejs. And we have to store it in views

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); // to use css and other things


app.get("/",function(req,res){
    let details = data.getData();
    res.render('home', {detailsObejct: details});
    
    app.post("/",function(req,res){
        for (d in details){
            if(req.body.readMore == d){
                app.get("/",function(request,respond){
                    respond.render('blog', {d:d, c:details[d]});
                })   
            }
        } 
    })
})
app.get("/new",function(req,res){
    res.render('newblog', {});
    app.post("/new",function(req,res){
        data.pushData(req.body.heading, req.body.content); //sending new blog details to data.js
        res.redirect("/");
    })
})
app.get("/blogname",function(req,res){
    res.render('blog', {});
})


app.listen(3000,function(){console.log("Server running at port 3000!")});