var express = require("express");
var app = express();
var rooms = require('./data/Rooms.json');

app.set("views", "./views");
app.set('view engine', 'pug');

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

app.listen(3000, function () {
    console.log('Chat app listening on port 3000!');
});