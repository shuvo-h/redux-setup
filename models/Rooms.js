const mongoose = require("mongoose");

const roomsSchema = mongoose.Schema(
    {
        hotel_id: {
            type: String,
            require: true,
            trim: true
        },
        room_no: {
            type: String,
            require: true,
            trim: true
        },
        hotelName: {
            type: String,
            require: true,
            trim: true
        },
        status: {
            type: String,
            require: true,
            trim: true
        },
        rent: {
            type: String,
            require: true,
            trim: true
        },
        room_imgs: [
            {
                uri:{
                    type: String,
                    require: true,
                    trim: true
                },
                title:{
                    type: String,
                    require: true,
                    trim: true
                },
                id:{
                    type: String,
                    require: true,
                    trim: true
                },
            }
        ],
        room_floor: {
            type: Number,
            require: true,
            trim: true
        },
        bed: {
            type: Number,
            require: true,
            trim: true
        },
        tv: {
            type: String,
            require: true,
            trim: true
        },
        internate: {
            type: String,
            require: true,
            trim: true
        },
        other_facilities: [{
            type: String,
            require: true,
            trim: true
        }],
        room_service: {
            type: String,
            require: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
)

const Rooms = mongoose.model("Rooms",roomsSchema);

module.exports = Rooms;