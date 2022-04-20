// external imports 
const express = require("express");
const { addNewHotel, getAllHotels, getSingleHotels, getOwnersHotels } = require("../controller/hotels/hotelController");
const { checkLogin } = require("../middleware/common/checkLogin");
const { uploadHotelImgae } = require("../middleware/imageUploader/hotelImageUpload");
// internal imports 

const router = express.Router();

// get all hotels 
router.get("/",getAllHotels)

// get single hotel based on ID 
router.get("/:hotel_id",getSingleHotels)

// get all hotels based on single owner with owner email 
router.post("/hotel/owner",checkLogin,getOwnersHotels)

// add new hotel router 
router.post("/hotel",uploadHotelImgae,addNewHotel)



module.exports = router;