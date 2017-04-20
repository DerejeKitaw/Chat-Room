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
    if(!room){
        res.sendStatus(404);
        return;
    }
    room.name = req.body.name;
    res.redirect("/admin/rooms"); 
});
app.get('/admin/rooms/edit/:id', function (req, res) {
    var roomId = req.params.id;
    var room = _.find(rooms, r => r.id === roomId);
    //Do not dender if room doesnt exist
    if(!room){
        res.sendStatus(404);
        return;
    }
    res.render("edit",{room}); 
});

app.get('/admin/rooms/delete/:id', function (req, res) {
    var roomId = req.params.id;
    rooms = rooms.filter(r => r.id !== roomId);
    res.redirect("/admin/rooms"); 
});
