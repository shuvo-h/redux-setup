// external imports 
const express = require("express");
const { addNewRoom } = require("../controller/rooms/roomController");
const { checkLogin } = require("../middleware/common/checkLogin");
const router = express.Router();

// add new room router 
router.post("/room",checkLogin,addNewRoom)

module.exports = router;