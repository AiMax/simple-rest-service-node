var express = require('express');
var app = express();
var port = 3000;
var bodyParser = require("body-parser");
const { ok } = require('assert');
app.use(bodyParser.json());


var catalog = new Object(); // A Map of javascript Objects.
catalog[0] = {id:0, name: "USB drive", price: 10};
 

app.get('/', function (req, res){
    res.json(catalog);
});

app.get("/catalog/:id", function(req, res, next) {
    id = req.params.id;
    if(catalog[id] == null) {
        next("No product with code " + id + " found.");
        res.send(404);
    } else { 
        res.json(catalog[id])
    }
});

app.post("/catalog", function(req, res, next) {
    body = req.body;
    if(catalog[body.id] == null) {
        catalog[body.id] = body
        res.status(200).send(body)
    } else {
        next("Can not add the product to the database.");
        res.sendStatus(409) 
    }
});

app.put("/catalog/:id", function(req, res, next) {
    body = req.body;
    catalog[body.id] = body;
    res.status(200).send(body);
});

app.delete("/catalog/:id", function(req, res, next) {
    var o = catalog[req.body.id]
    delete catalog[req.body.id]
    res.status(200).send("Object " + o + "delete");
});

var server = app.listen(port, function(){
    console.log('Server running at http://127.0.0.1:' + port);
});

