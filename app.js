var express = require("express");
var app = express();

var bodyParser=require("body-parser");

app.set("views", "./views");
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
 
//TODO: Create a middleware to log all incomming request

app.get('/', function (req, res) {
    res.render("index.pug", { title: "Index" });
});
 var adminRouter = require("./admin");
 app.use("/admin",adminRouter);
app.listen(3000, function () {
    console.log('Chat app listening on port 3000!');
});