const mongoose = require("mongoose");

const hotelsSchema = mongoose.Schema(
    {
        hotel_id: {
            type: String,
            require: true,
            trim: true
        },
        hotelName: {
            type: String,
            require: true,
            trim: true
        },
        address: {
            type: String,
            require: true,
            trim: true
        },
        city: {
            type: String,
            require: true,
            trim: true
        },
        country: {
            type: String,
            require: true,
            trim: true
        },
        img_banner: {
            type: String,
            require: true,
            trim: true
        },
        hotel_category: {
            type: String,
            require: true,
            trim: true
        },
        room: {
            total: {
                type: Number,
                require: true,
                trim: true
            },
            booked: {
                type: Number,
                require: true,
                trim: true
            },
            available: {
                type: Number,
                require: true,
                trim: true
            },
        },
        img_uri:[
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
        description: {
            type: String,
            require: true,
            trim: true
        },
        contact_email: {
            type: String,
            require: true,
            trim: true
        },
        contact_phone: {
            type: String,
            require: true,
            trim: true
        },
        contact_Extra_info: {
            type: String,
            require: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
)

const Hotels = mongoose.model("Hotels",hotelsSchema);

module.exports = Hotels;