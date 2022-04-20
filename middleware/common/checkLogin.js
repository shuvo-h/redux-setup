
const jwt = require("jsonwebtoken");

const checkLogin = function (req,res,next) {
    let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    
    if (cookies) {
        try {
            token = cookies[process.env.COOKIE_NAME];
            const decodedUserInfo = jwt.verify(token,process.env.JWT_SECRET);
            req.decodedUser = decodedUserInfo;
            next()
      } catch (err) {
          console.log(err);
          res.status(401).json({error:"Authentication Failure!"})
      }
    }
}

module.exports ={
    checkLogin
}