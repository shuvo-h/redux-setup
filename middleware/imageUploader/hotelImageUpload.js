const { uploadOneImage } = require("../../utilities/singleImageUploader");

const uploadHotelImgae = async function (req,res,next) {
    const images = req.body?.img_uri;
    if (images.length) {
        let images_URIs = []
        images.map(async(img,ind)=>{
            const uriAndId = await uploadOneImage(img.uri);
            if (uriAndId.url && uriAndId.cloud_id) {
                images_URIs.push({uri:uriAndId.url,title:`${img.title}`,id:uriAndId.cloud_id})
                return uriAndId
            }else{
                return
            }
        })
        const nextToUploadImage = setTimeout(()=>{
            req.body.img_uri = images_URIs;
            next();
            clearTimeout(nextToUploadImage)
        },5000 * images.length)
    }else{
        next();
    }
}

module.exports = {
    uploadHotelImgae
}