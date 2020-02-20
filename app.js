var express = require('express');
var app = express();
var bodyParser=require('body-parser')
var request = require('request');
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.get("/", function(req, res) {
   res.render("index");
});


app.post("/results", function(req, res){
    var query = req.body.search;
    console.log(query)
    var url = "http://omdbapi.com/?s=" + query + "&apikey=de3cc7fe";
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body)
            res.render("final", {data: data});
        }
    });
});


app.listen(3000, function(){
    console.log("Movie App has started!!")
});