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
    // console.log(details);
    // console.log(detailsKeyLowercase);

    if (Object.keys(details).length === 0 && details.constructor === Object){
        app.post("/",function(request,response){response.redirect('new')})
        console.log("QAZXSW")
    }
    else{
        app.post("/",function(request,response){
            // res.render('blog',{h: req.body.head, c:req.body.con})
            console.log(req.body.con);
            console.log(req.body.head);
        })
    }
})
app.get("/new",function(req,res){
    res.render('newblog', {});
    app.post("/new",function(req,res){
        data.pushData(req.body.heading, req.body.content); //sending new blog details to data.js
        res.redirect("/");
    })
})
app.get("/posts/:postName",function(req,res){
    var requestedHeading = _.lowerCase(req.params.postName)
    if(detailsKeyLowercase.includes(requestedHeading)){
        res.render('blog', {title: _.startCase(req.params.postName), content: details[_.startCase(req.params.postName)]});
    } 
})


app.listen(3000,function(){console.log("Server running at port 3000!")});