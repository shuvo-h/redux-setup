// external imports 
const {check, validationResult} = require("express-validator");
const { engine } = require("express/lib/application");
const createError = require("http-errors");
const User = require("../../models/People");
const { deleteImage } = require("../imageUploader/uploadImage");

// new user info validate 
const addUserValidator = [
    check("name")
        .isLength({min:3})
        .withMessage("Name is required atleast 3 character!")
        .isAlpha("en-US", {ignore:" -"})
        .withMessage("Name must not contain anything other than alphabet")
        .trim(),
    check("email")
        .isEmail()
        .withMessage("Invalid email address")
        .trim()
        .custom(async(value)=>{
            try {
                const user = await User.findOne({email:value});
                if (user) {
                    res.json({error:{message:"Email already exist!"}})
                    throw createError("Email already exist")
                }
            } catch (err) {
                res.json({error:{message:err.message}})
                throw createError(err.message)
            }
        }),
    check("password")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        })
        .withMessage("Password must be at least 8 characters long and should contain 1 lowercase, 1 uppercase, 1 number & 1 symbol"),

    ]

const addUserValidationHandler = function (req,res,next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    }else{
        // remove the file if anything uploaded eg. avater 
        if (req?.body?.avatar_id) {
            deleteImage(req?.body?.avatar_id)
        }
        // send error ersponse
        res.status(500).json({errors:mappedErrors})
    }
}

module.exports ={
    addUserValidator,
    addUserValidationHandler
}