// External imports
const express = require("express");
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv").config();
var bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const mongoose = require("mongoose");
const { errorHandler, notFoundHandler } = require("./middleware/common/errorHandler");
const app = express();
const port = process.env.PORT || 5000;

// requested parsers 
app.use(express.json());

// app.use(cors({ credentials:true,origin: `${process.env.FRONTEND_CLIENT_URI}` }));
app.use(cors({ credentials:true,origin: `http://localhost:3000` }));
/*
const corsOptions = {
    origin: ["http://localhost:3000",`${process.env.FRONTEND_CLIENT_URI}`,`${process.env.FRONTEND_CLIENT_URI_FIREBASE}`],
   //update: or "origin: true," if you don't wanna add a specific one
    credentials: true,
  };
  app.use(cors(corsOptions));
*/


app.use(cookieParser(`${process.env.COOKIE_SIGN_SECRET}`));
// app.use(express.urlencoded({limit:"100000kb",extended:true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload({
    createParentPath: true,
    limits: { 
        fileSize: 50 * 1024 * 1024 * 1024 //50MB max file(s) size
    },
}));


// Internal imports 
const authenticateRouter = require("./router/authenticateRouter");
const hotelRouter = require("./router/hotelRouter");
const roomRouter = require("./router/roomRouter");
const contactRouter = require("./router/contactSendGridEmailRouter");

// database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("DB connection successfull."))
.catch(err=>console.log(err))

// routing setup 
// Authentication registration login router 
app.use("/authenticate",authenticateRouter)

// hotel routes 
app.use("/hotels",hotelRouter)

// hotel routes 
app.use("/rooms",roomRouter)


// contact us sendgrid email route 
app.use("/contact",contactRouter)

// public test route 
app.get("/",(req,res)=>{
    res.send("Server is working, go ahead")
})

//  404 not found handler
app.use(notFoundHandler);

// common error handling
app.use(errorHandler)

// listen app 
app.listen(port,()=>{
    console.log("App is running on port",port);
})