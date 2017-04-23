
Rooms - /rooms
        Define rooms in a new api router /api
            var apiRouter = require("./api");
            app.use("/api", apiRouter);
rooms properties
    can be listed -  /rooms
        server
            router.get("/rooms",function(req, res){
            res.json(rooms);
            });
        client
            $.ajax({
                type:"GET",
                url: "/api/rooms",
                success: function (rooms){
                    roomId = rooms[0].id;
                    $.each(rooms, function(key , room){
                        var a = '<a href="#" data-room-id="' +room.id + '" class="room list-group-tem">'
                        $("#rooms").append(a);
                    });
                }
            });

    can be created - /rooms/add
        will have id - use uuid.v4()
        will have name - from form - req.body.name
        after room created redirect to main - req.baseUrl+ "/rooms"
    can be deleted - /rooms/delete
    can be edited - /rooms/edit/:id
        get roomId to be edited
        get room to be edited
        check if room exist
            if room do not exist through 404 error
            if room exist update the room with new value
                new value is res.locals.room

    can have messages
        messages can be created
            will have id - use uuid.v4()
            will have description - from form - req.body.name         
        messages can be deleted
        messages can be updated

users
    can add new rooms
    can post message to current room
