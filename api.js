var express =require("express");
var rooms = require("./data/rooms.json");
var messages = require("./data/messages.json");
var _=require("lodash");
var uuid = require("node-uuid");

var router = express.Router();
module.exports= router;
//Define various route - get all rooms
router.get("/rooms",function(req,res){
    res.json(rooms);
});

//get messages of specific room
router.route("/rooms/:roomId/messages")
    .get(function (req, res){
    var roomId = req.params.roomId;
    //filter messages with roomId
    var roomMessages = messages
        .filter(m => m.roomId === roomId);
    
    var room = _.find(rooms, r => r.id === roomId);
    if (!room){
        res.sendStatus(404);
        return;
    }
    res.json({
        room: room,
        messages: roomMessages
    })
})
.post(function (req, res){
    var roomId = req.params.roomId;

    var message = {
        roomId: roomId,
        text:req.body.text,
        userId: "b3b12b8c-e0e6-47d8-89b2-4b60e12bba51",
        id: uuid.v4()
    };
    messages.push(message);
    res.sendStatus(200);

})
.delete(function(req,res){
    var roomId = req.params.roomId;

});