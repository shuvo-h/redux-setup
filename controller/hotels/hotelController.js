const Hotels = require("../../models/Hotels");

async function addNewHotel(req,res,next) {
    const hotel = req.body;
    hotel.hotel_id = `gth-${Date.now().toString(36)}${Math.floor(Math.random()*9000)}`
    newHotel = new Hotels(hotel); 
    try {
        const result = await newHotel.save();
        res.status(200).json({result})

    } catch (err) {
        res.status(500).json({
            errors:{
                common:{msg: "Unknown error occured!"}
            }
        })
    }
}


async function getAllHotels(req,res,next) {
    try {
        const hotels = await Hotels.aggregate([
            {
                $project: {
                    hotel_id: 1,
                    hotelName: 1,
                    address: 1,
                    city: 1,
                    country: 1,
                    img_uri: 1,
                    hotel_category: 1
                }
            }
        ]);
        res.status(200).json({hotels,success: true});
    } catch (err) {
        res.status(501).json({message:"Something went wrong",success: false})
    }
}



async function getSingleHotels(req,res,next) {
    const hotelID = req.params.hotel_id;
    try {
        const hotel = await Hotels.findOne({hotel_id:hotelID});
        res.status(200).json({hotel,success: true});
    } catch (err) {
        res.status(501).json({message:"Something went wrong",success: false})
    }
}




module.exports ={
    addNewHotel,
    getAllHotels,
    getSingleHotels
}