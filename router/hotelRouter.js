// external imports 
const express = require("express");
const { addNewHotel, getAllHotels, getSingleHotels } = require("../controller/hotels/hotelController");
const { uploadHotelImgae } = require("../middleware/imageUploader/hotelImageUpload");
// internal imports 

const router = express.Router();

// get all hotels 
router.get("/",getAllHotels)
router.get("/:hotel_id",getSingleHotels)

// add new hotel router 
router.post("/hotel",uploadHotelImgae,addNewHotel)


module.exports = router;