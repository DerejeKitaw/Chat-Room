var express = require("express");
var app = express();

var bodyParser=require("body-parser");

app.set("views", "./views");
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('node_modules/bootstrap/dist'));
app.use(bodyParser.urlencoded({extended: true}));
 
//TODO: Create a middleware to log all incomming request -- Done partialy
app.use(function(req,res,next){
    console.log('Incoming request: ' + req.url);
    next();
});

app.get('/', function (req, res) {
    res.render("home.pug", { title: "Home" });
});
 var adminRouter = require("./admin");
 app.use("/admin",adminRouter);
//create new api router
var apiRouter = require("./api");
app.use("/api",apiRouter);

app.listen(3000, function () {
    console.log('Chat app listening on port 3000!');
});