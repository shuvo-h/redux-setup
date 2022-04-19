require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_INFO_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_INFO_API_KEY,
    api_secret: process.env.CLOUDINARY_INFO_API_SECRET,
})

const uploadImage = async function (req,res,next) {
    const image = req.body.avatar;

    // upload the image 
   if (image) {
        try {
            const cloudRes = await cloudinary.uploader.upload(image,{upload_preset:"get-token"})
            if (cloudRes.public_id && cloudRes.url) {
                req.body.avatar = cloudRes.url;
                req.body.avatar_id = cloudRes.public_id;
                next()
            }else{
                res.status(500).json({
                    errors:{
                        common:{msg: "Problem to upload the avater!"}
                    }
                })
            }
        } catch (error) {
            res.status(500).json({
                errors:{
                    common:{msg: "Problem to upload the image!"}
                }
            })
        }
   }else{
       next()
   }
}

const deleteImage = async function (avaterId) {
    if (avaterId) {
        const cloudRes = await cloudinary.uploader.destroy(avaterId);
    }
}


module.exports={
    uploadImage,
    deleteImage,
}