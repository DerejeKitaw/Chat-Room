$(function () {
    //RoomId used to populate messages for each room
    var roomId;

    $.ajax({
        type: "GET",
        url: "/api/rooms",
        success: (function (rooms) {
            roomId = rooms[0].id;
            getMessages(); //getting current room from global roomID for now
            $.each(rooms, function (key, room) {
                var a = '<a href="#" data-room-id="' + room.id + '" class="room list-group-item">' + room.name + '</a>';
                $("#rooms").append(a);
            });

        })
    })
    function getMessages() {
        $.ajax({
            type: "GET",
            url: "/api/rooms/" + roomId + "/messages",
            success: (function (data) {
                $("#roomName").text("Messages for " + data.room.name);
                var messages = "";
                $.each(data.messages, function (key, message) {
                    messages += message.text + "\r";
                });
                $("#messages").val(messages);
            })
        })
    }
$("#post").click(function () {
        var message = {text: $("#message").val()};

        $.ajax({
            type: "POST",
            url: "/api/rooms/" + roomId + "/messages",
            data: message,
            success: (function () {
            $("#message").val("");
            getMessages();
        })
        })
    });
$('body').on('click', 'a.room', function (event) {
        roomId = $(event.target).attr("data-room-id");
        getMessages();
    });
    $("#delete").click(function(){
        $.ajax({
            type: "DELETE",
            url: "/api/rooms/" + roomId + "/messages",
            success: (function () {
            $("#messages").val("");
        })
        })
    });

});