var express =require("express");
var rooms = require("./data/rooms.json");
var messages = require("./data/messages.json");
var _=require("lodash");

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


})
.delete(function(req,res){
    var roomId = req.params.roomId;
    
});