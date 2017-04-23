var express =require("express");
var rooms = require("./data/rooms.json");
var messages = require("./data/messages.json");
var _=require("lodash");
var uuid = require("node-uuid");

var router = express.Router();
module.exports= router;

//get all rooms
router.get("/rooms",function(req,res){
    res.json(rooms);
});

//get messages of specific room
router.route("/rooms/:roomId/messages")
    .get(function (req, res){
        //get roomId
        var roomId = req.params.roomId;
        //filter messages for roomId
        var roomMessages = messages
            .filter(m => m.roomId === roomId);
        //find all rooms with roomId
        var room = _.find(rooms, r => r.id === roomId);
        //if no room found send not found error messages
        if (!room){
            res.sendStatus(404);
            return;
        }
        //If room with roomId found respond with the room and room messages
        res.json({
            room: room,
            messages: roomMessages
        })
    })
    .post(function (req, res){
        //get roomId
        var roomId = req.params.roomId;
        // TODO: define userId
        //prepare massages to be post
        var message = {
            id: uuid.v4(),
            roomId: roomId,
            userId: "b3b12b8c-e0e6-47d8-89b2-4b60e12bba51",
            text: req.body.text
        };
        //add new messages to the end of messages
        messages.push(message);
        //TODO: implement if error happen
        //erspont sucess code
        res.sendStatus(200);

    })
    .delete(function(req,res){
        //get roomId where messages will be deleted
        var roomId = req.params.roomId;
        //If roomId match in the messages filter them
        messages= messages.filter(m => m.roomId != roomId);
        res.sendStatus(200);
    });