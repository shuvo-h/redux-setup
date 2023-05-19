const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const lodash = require('lodash');

// config and global setup
dotenv.config();
global.appRoot = path.resolve(__dirname);
global._ = lodash;
const isProduction = process.env.NODE_ENV.trim() === "production";

const port = process.env.PORT || 5000;


const app = express();

// config app use middleware
const baseUrl = isProduction ? "" : "http://localhost:3000";
const whitelistDomain = [baseUrl, "www.shuvohaldar.com"];
const corsOptions = {
    optionsSuccessStatus:200,
    origin: function(origin,cb){
        console.log(origin,"___It the oriGIN");
        if (whitelistDomain.indexOf(origin) !== -1 || !isProduction) {
            cb(null,true);
        }else{
            cb(new Error("Not allowed by Cors. Contact with Shuvo"))
        }
    }
};
app.use(cors(corsOptions))
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static(path.join(__dirname, 'build'))); // React build folder

app.get('/api', (req, res) => {
    res.send('Hello React-Express Combine App!')
})

// last API routes to catch all API and React router
// catch all api route which don't match
app.get("/api/*",(req,res)=>{
    res.send("API route didn't found")
})

// send the react files if any of the route hit without "/api"
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"build","index.html"))
})

app.listen(port,()=>{
    console.log("%s App is running at http://localhost:%s", "✓", port);
    // logger.info("✓ App is running at "+HOST+" in "+app.get("env")+" mode");
})