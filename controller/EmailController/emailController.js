function receiveEmail(req,res,next) {
    if (req.body.meilGunResult.id && req.body.meilGunResult.messageId) {
        res.status(200).json({messageID: req.body.meilGunResult.messageId, message_sent: "ok"})
    }else{
        res.status(500).json({messageID: null, message_sent: "Something went wrong!"})
    }
}

module.exports ={
    receiveEmail
}


