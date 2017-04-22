$(function () {

    var roomId;

$.ajax({
        type: "GET",
        url: "/api/rooms",
        success: (function (rooms) {
        roomId = rooms[0].id;
        getMessages();
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
   

});