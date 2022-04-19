const { check, validationResult } = require("express-validator");
const createError = require("http-errors");

const doLoginValidator = [
    check("email")
        .isEmail()
        .withMessage("Invalid email address")
        .trim(),
    check("password")
        .isLength({min: 1})
        .withMessage("Password is required")
]

const doLoginValidationHandler = function (req,res,next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    }else{
        res.status(510)
        .json({errors: mappedErrors, data:req.boby})
    }
}

module.exports = {
    doLoginValidator,
    doLoginValidationHandler
}