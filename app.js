var express = require("express");
var app = express();
var rooms = require('./data/Rooms.json');
var bodyParser=require("body-parser");
var uuid = require("node-uuid");
var _=require("lodash");

app.set("views", "./views");
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));

// view engine setup
//app.set('views', path.join(__dirname, 'views'));

app.get('/', function (req, res) {
    res.render("index.pug", { title: "Index" });
});
app.get('/admin/rooms', function (req, res) {
    res.render("rooms", {
        title: "Admin Rooms",
        rooms: rooms
    });
});

//Creat chat room
app.get('/admin/rooms/add', function (req, res) {
    res.render("add");
});

//Creat chat room
app.post('/admin/rooms/add', function (req, res) {
    var room = {
        name: req.body.name,
        id:uuid.v4()
    };
    rooms.push(room);
    res.redirect("/admin/rooms"); 
});
app.post('/admin/rooms/edit/:id', function (req, res) {
    var roomId =req.params.id;
    var room =_.find(rooms, r => r.id === roomId);
    room.name = req.body.name;

    res.redirect("/admin/rooms"); 
});
app.get('/admin/rooms/edit/:id', function (req, res) {
    var roomId = req.params.id;
    var room = _.find(rooms, r => r.id === roomId);
    res.render("edit",{room}); 
});

app.get('/admin/rooms/delete/:id', function (req, res) {
    var roomId = req.params.id;
    rooms = rooms.filter(r => r.id !== roomId);
    res.redirect("/admin/rooms"); 
});

app.listen(3000, function () {
    console.log('Chat app listening on port 3000!');
});