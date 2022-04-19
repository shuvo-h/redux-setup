// external imports
const express = require("express");
const { addNewUser, doUserLogin, logout, keepUserLogin } = require("../controller/Authentication/authenticationController");
const { addUserValidator, addUserValidationHandler } = require("../middleware/authenticate/authenticateValidator");
const { doLoginValidator, doLoginValidationHandler } = require("../middleware/authenticate/loginValidator");
const { checkLogin } = require("../middleware/common/checkLogin");
const { uploadImage } = require("../middleware/imageUploader/uploadImage");
const router = express.Router();
// internal imports

// registration route path 
router.post("/registration",uploadImage,addUserValidator,addUserValidationHandler,addNewUser)

// login route path                                   checkLogin  // delete this (checkLogin) fromk this route. It is written for protected routes only
router.post("/login",doLoginValidator,doLoginValidationHandler,doUserLogin)

// keep user login router 
router.get("/onAuthStateChange",checkLogin,keepUserLogin)


// logout
router.delete("/logout",logout)

module.exports = router;