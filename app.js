var express = require("express");
var app = express();

var bodyParser=require("body-parser");

//Settings
app.set("views", "./views");
app.set('view engine', 'pug');

//Express midleware
app.use(express.static('public'));
app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('node_modules/bootstrap/dist'));

//To get form data from the form
app.use(bodyParser.urlencoded({extended: true}));

//To get json data from the form
app.use(bodyParser.json());

//TODO: Create a middleware to log all incomming request -- Done partialy
app.use(function(req,res,next){
    console.log('Incoming request: ' + req.url);
    next();
});

//root page is "home"
app.get('/', function (req, res) {
    res.render("home.pug", { title: "Home" });
});

//admin router mounted at /admin
var adminRouter = require("./admin");
 app.use("/admin",adminRouter);

//apiRouter router mounted at /api
var apiRouter = require("./api");
app.use("/api",apiRouter);

app.listen(3000, function () {
    console.log('Chat app listening on port 3000!');
});