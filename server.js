const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const cluster = require('cluster');
const os = require('os');
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
        console.log("Requesed origin = ", origin);
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


// if It is cluster.isMaster, then fork() new cluster
if (cluster.isMaster) {
    const CPUs = os.cpus();  // get the number of available CPU cores 
    for(let i = 0; i< CPUs.length; i++){   // fork worker processes for each available CPU core 
        cluster.fork() 
    } 
    // The of the number of cores 
    console.log(`Available CPUs: ${CPUs.length}`) 
    cluster.on('online',(worker,code,signal)=>{
        console.log(`worker ${worker.process.pid} is online`); 
    })
    // Handle worker process crashes and restart them
    cluster.on('exit', (worker, code, signal) => {
        // console.log(`Worker ${worker.process.pid} died. Restarting...`);
        // console.log(`Only ${Object.keys(cluster.workers).length} process remaining.`);
        const newWorker =  cluster.fork();
        const pids = Object.keys(cluster.workers).map(key =>{return cluster.workers[key]}).map(el=>el.process.pid)
        console.log("PID: died =",worker.process.pid, "| new worker = ", newWorker.process.pid, "| active pid list = ", pids);
    });
}else{
    app.get('/api', (req, res) => {
        res.send('Hello Tech Learn Combine App! ' + process.pid)
    })
    app.get('/kill', (req, res) => {  // testing to kill a process which automatic forc a new process worker
        res.send('Killin the worker process! ' + process.pid);
        process.exit();
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
    
    const server = app.listen(port,()=>{
        // console.log(`worker process ${process.pid} is listening on port ${port}`); 
        console.log("%s App is running at http://localhost:%s with pid (%s)", "✓", port, process.pid);
        // logger.info("✓ App is running at "+HOST+" in "+app.get("env")+" mode");
    })
    
}
