const nodeMailer = require("nodemailer");
const mailGun = require("nodemailer-mailgun-transport");

const mailAuth = {
    auth:{
        api_key: `${process.env.MAIN_GUN_PRIVATE_API_KEY}`,
        domain: `${process.env.MAIL_GUN_DOMAIN_NAME}`
    }
}

const transport = nodeMailer.createTransport(mailGun(mailAuth))

function sendGunNodeMailer(req,res,next) {
    if (req.body.email && req.body.message) {
        try {
            const mailOptions = {
                from:`${req.body.email}`,
                to: `${process.env.ALLOWED_MAIL_RECEIVER}`,
                subject:`${req.body.issue}` || "No subject",
                text: `${req.body.message}`
            }
            
            transport.sendMail(mailOptions, function (err,data) {
                if (err) {
                    console.log(err);
                }else{
                    req.body.meilGunResult = data;
                    next();
                }
            })            
        } catch (error) {
            throw new Error("Something went wrong to send email")
        }
    }else{
        throw new Error("Email and message are required")
    }
}

module.exports = {
    sendGunNodeMailer
}