// external imports 
const express = require("express");

// internal imports 
const { addNewHotel, getAllHotels, getSingleHotels, getOwnersHotels, deleteSingleHotel, updateAHotel } = require("../controller/hotels/hotelController");
const { checkLogin } = require("../middleware/common/checkLogin");
const { uploadHotelImgae } = require("../middleware/imageUploader/hotelImageUpload");

const router = express.Router();

// get all hotels 
router.get("/",getAllHotels)

// get single hotel based on ID 
router.get("/:hotel_id",getSingleHotels)

// get all hotels based on single owner with owner email 
router.post("/hotel/owner",checkLogin,getOwnersHotels)

// add new hotel router 
router.post("/hotel",uploadHotelImgae,addNewHotel)

// delete hotel by ID 
router.delete("/hotel/:hotel_id",checkLogin,deleteSingleHotel)

// update hotel by ID 
router.patch("/hotel/:hotel_id",checkLogin,updateAHotel)



module.exports = router;