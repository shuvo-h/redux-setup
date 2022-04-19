// external imports 
const express = require("express");
const { receiveEmail } = require("../controller/EmailController/emailController");
const { sendGunNodeMailer } = require("../middleware/emailSenderReceiver/emailSenderReceiver");

const router = express.Router();

// receive email from contact 
router.post("/receive",sendGunNodeMailer,receiveEmail) 

module.exports =router;