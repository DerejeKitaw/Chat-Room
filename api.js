var express =require("express");
var rooms = require("./data/rooms/json");

var router = express.Router();
module.exports= router;
//Define various route
router.get("/rooms",function(req,res){
    res.json(rooms);
});