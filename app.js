var express = require("express");
var app = express();
var rooms = require('./data/Rooms.json');
var bodyParser=require("body-parser");

app.set("views", "./views");
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
 
app.get('/', function (req, res) {
    res.render("index.pug", { title: "Index" });
});
 
app.listen(3000, function () {
    console.log('Chat app listening on port 3000!');
});