require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_INFO_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_INFO_API_KEY,
    api_secret: process.env.CLOUDINARY_INFO_API_SECRET,
})


const uploadOneImage = async function (image) {

    // upload the image 
   if (image) {
        try {
            const cloudRes = await cloudinary.uploader.upload(image,{upload_preset:"get-token"})
            if (cloudRes.public_id && cloudRes.url) {
                return {url:cloudRes.url, cloud_id:cloudRes.public_id}
            }else{
                return {error:"Problem to upload image!"}
            }
        } catch (error) {
            return error.message;
        }
   }
}

module.exports={
    uploadOneImage,
}