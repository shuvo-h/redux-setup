const Rooms = require("../../models/Rooms");
const Hotels = require("../../models/Hotels");

async function addNewRoom(req,res,next) {
    const room = req.body;
    newRoom = new Rooms(room); 
    if (req?.decodedUser?.email) {
        try {
            const hotel = await Hotels.findOne({hotel_id:room.hotel_id});
            const existRoom = await Rooms.findOne({hotel_id:room.hotel_id,room_no:room.room_no});
            let bookStatus = {total: hotel.room.total + 1, available:hotel.room.available, booked:hotel.room.booked};
            if (req.body.status === "booked") {
                bookStatus.booked = hotel.room.booked + 1;
            }else{
                bookStatus.available = hotel.room.available + 1;
            }
            if (hotel.hotel_id && (hotel.owner_email === req?.decodedUser?.email)) {
                if (!existRoom) {
                    const updateRoomCount = await Hotels.updateOne(
                        {hotel_id:room.hotel_id},
                        {$set:{room: bookStatus}}
                    )
                    const result = await newRoom.save();
                    res.status(200).json({result})
                }else{
                    res.status(200).json({exist:"The room is already added!"})
                }
            }else{
                res.status(500).json({messgae: "You are authorized for this operation!"})
            }
    
        } catch (err) {
            res.status(500).json({messgae: "Something went wrong. Try again!"})
        }
    }else{
        res.status(500).json({messgae: "You are authorized for this operation!"})
    }
}


module.exports ={
    addNewRoom
}