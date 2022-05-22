// Basic Working,

const nodemailer = require("nodemailer");

const express = require('express');
const cors = require('cors');

require('dotenv').config();
const app = express();
const { MongoClient } = require('mongodb');
const { getUniqueID, getRandomNumber } = require('./utilities');

const {createServer} = require("http");
const { Server, socket } = require('socket.io');

const ObjectId = require("mongodb").ObjectId;


const port = process.env.PORT || 7000;


// Middleware Work,

// app.use(
//   cors({
//     allowedHeaders: ["authorization", "Content-Type"], 
//    // you can change the headers
//     exposedHeaders: ["authorization"], 
//     //you can change the headers
//     origin: "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false
//   }) 
// )



app.use(cors());
// app.use(
//   cors({
//     allowedHeaders: ["authorization", "Content-Type"], 
//    // you can change the headers
//     exposedHeaders: ["authorization"], 
//     //you can change the headers
//     origin: "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false
//   }) 
// )


app.use(express.json());

const http = createServer(app);
const io = new Server(http, {
  cors:{
    origin: ["http://localhost:3000","https://sports-club-70293.web.app"]
  }
})




// Functionally Working,


// Calling User and password with .env,
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l2npz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2fqf1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


// creating a client in MongoClient,

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);


// Socket implementation 
const soketList = [];
const adminList = [];
const questionList = [
  {question:"Hello, How are you?",Ans:"I am fine"},
  {question:"Where are you from?",Ans:"I am from dhaka"},
  {question:"Hello",Ans:"How Can I Help You?"},
  {question:"Hi",Ans:"How Can I Help You?"},
  {question:"I need some Prodect",Ans:"Ok, What Type..?"},
  {question:"How much",Ans:"it's 100$"},
  {question:"any new contest here",Ans:"Sorry sir it's not available right time"},
  {question:"Thank You",Ans:"You are must Wellcame"},
  {question:"Thanks",Ans:"Wellcame"}
]

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
  
  // send message to user 
  socket.on("chatMessage",(data)=>{
    const userIDExist = soketList.filter(id => id === socket.id);
    // console.log(userIDExist,"userIDExist");
    if (!userIDExist.length && !data.admin) {
      soketList.push(socket.id);
      // console.log(userIDExist,"userIDExist userIDExist");
    }
    if (data.admin && !data.message) {
      const isExit = adminList.filter(item=>item.email === data.admin_email);
      if (isExit.length === 0) {
        adminList.push({socketID:socket.id,email:data.admin_email})
      }
    }

    // console.log(soketList,"soketList",adminList,"adminList-----------------");
    const userID = soketList.filter(id => id === socket.id);
    console.log(soketList,"soketList");
    if (userID.length) {
      io.to(adminList[0]?.socketID).emit("getMessage",{user_id:userID[0],question: data.message});
    }else{
      const adminUser = adminList.filter(item => item.socketID === socket.id);
      console.log(adminUser,"adminUser");
      if (adminUser) {
        const userID = soketList.filter(id => id === data.user_id);
        io.to(data.user_id).emit("getMessage",{user_id:userID[0],ans: data.message});
      }

    }

    
    console.log(data);
    // const reqQuestion = questionList.filter(item => data.message === item.question);
    // const userID = soketList.filter(id => id === socket.id);
    // const genericReplay = {question: data.message,Ans:"Please send a mail to us from contact us page for inquire more.",contact_link:"https://sports-club-70293.web.app/contact"}
    // const replay = reqQuestion[0] ? reqQuestion[0] : genericReplay;    
    // io.to(userID).emit("getMessage",{user_id:userID[0],ans: replay})
  })


  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
     console.log('A user disconnected ', socket.id);
     const rmIdx = soketList.indexOf(socket.id);
     rmIdx && soketList.splice(rmIdx,1);
     const admInx = adminList.map(item => item.socketID).indexOf(socket.id);
     console.log(adminList,"adminList");
     admInx && adminList.splice(admInx,1);
  });
});





// Work on Async Function used in data,
async function runerw() {

  // try Mothed,

  try {
    await client.connect();
    const database = client.db('sports');
    const playersCollection = database.collection('players');
    const footballCollection = database.collection('football');
    const cricketCollection = database.collection('cricket');
    const otherCollection = database.collection('other');
    const userCollection = database.collection('users');
    const cricketplayersCollection = database.collection('cricketplayers');
    const hockeyPuckPlayersCollection = database.collection('hockeyPuckPlayers');
    const volleyBallPlayersCollection = database.collection('volleyBall');
    const basketBallPlayersCollection = database.collection('basketBall');
    const baseBallPlayersCollection = database.collection('baseBall');
    const tableTennisPlayersCollection = database.collection('tableTennis');

    const playersReviewCollection = database.collection('review');
    const bookingTicketCollection = database.collection('booking');
    const registerEventCollection = database.collection('eventRegister');
    const upcomingEventsCollection = database.collection('upcomingEvents');

    const ordersInfoCollection = database.collection('ordersInfo');


    const contParticipantCollection = database.collection('contestParticipant');
    const contQuizeCollection = database.collection('contestQuizes');
    const contResultCollection = database.collection('contestResult');
    const featuresProductsCollection = database.collection('featuresProducts');


    app.get('/featuresProducts', async (req, res) => {
      const cursor = featuresProductsCollection.find({});
      const featuresInfo = await cursor.toArray();
      res.send(featuresInfo);

    })




    app.post('/ordersInfo', async(req, res) =>{
      const ordersInfo = await ordersInfoCollection.insertOne(req.body);
      res.json(ordersInfo);
      });



  




      app.get('/ordersInfo', async (req, res) => {
        const cursor = ordersInfoCollection.find({});
        const ordersInfo = await cursor.toArray();
        res.send(ordersInfo);
  
      })


  
      


    app.get('/upcomingEvents', async (req, res) => {
      const cursor = upcomingEventsCollection.find({});
      const getEvents = await cursor.toArray();
      res.send(getEvents);

    })

    app.post('/booking', async (req, res) => {
      const tickets = req.body
      console.log('hit the api ', tickets)
      const result = await bookingTicketCollection.insertOne(tickets)
      console.log(result)
      res.json(result)
    })


    app.post('/eventRegister', async (req, res) => {
      const tickets = req.body
      console.log('hit the api ', tickets)
      const result = await registerEventCollection.insertOne(tickets)
      console.log(result)
      res.json(result)
    })




    app.get('/eventRegister', async (req, res) => {
      const cursor = registerEventCollection.find({});
      const getTickets = await cursor.toArray();
      res.send(getTickets);

    })


    app.get('/booking', async (req, res) => {
      const cursor = bookingTicketCollection.find({});
      const getTickets = await cursor.toArray();
      res.send(getTickets);

    })












    app.get('/players', async (req, res) => {
      const cursor = playersCollection.find({});
      const getplayers = await cursor.toArray();
      res.send(getplayers);

    })


    app.get('/football', async (req, res) => {
      const cursor = footballCollection.find({});
      const getfootball = await cursor.toArray();
      res.send(getfootball);

    })




    app.get('/cricket', async (req, res) => {
      const cursor = cricketCollection.find({});
      const getcricket = await cursor.toArray();
      res.send(getcricket);

    })




    app.get('/other', async (req, res) => {

      const cursor = otherCollection.find({});

      const page = req.query.page;
      const size = parseInt(req.query.size);
      const count = await cursor.count();

      let products;
      if (page) {
        products = await cursor.skip(page * size).limit(size).toArray()
      }
      else {
        products = await cursor.toArray();
      }



      res.send({
        count,
        products
      });


    });








    app.post('/other', async (req, res) => {
      const products = req.body
      console.log('hit the api ', products)
      const result = await otherCollection.insertOne(products)
      console.log(result)
      res.json(result)
    })



    app.get('/cricketplayers', async (req, res) => {
      const cursor = cricketplayersCollection.find({});
      const getcricketr = await cursor.toArray();
      res.send(getcricketr);

    })



    app.get('/hockeyPuckPlayers', async (req, res) => {
      const cursor = hockeyPuckPlayersCollection.find({});
      const gethockey = await cursor.toArray();
      res.send(gethockey);

    })




    app.get('/tableTennis', async (req, res) => {
      const cursor = tableTennisPlayersCollection.find({});
      const getTableTennis = await cursor.toArray();
      res.send(getTableTennis);

    })



    app.get('/baseBall', async (req, res) => {
      const cursor = baseBallPlayersCollection.find({});
      const getBaseBall = await cursor.toArray();
      res.send(getBaseBall);

    })



    app.get('/basketBall', async (req, res) => {
      const cursor = basketBallPlayersCollection.find({});
      const getBasketBall = await cursor.toArray();
      res.send(getBasketBall);

    })



    app.get('/volleyBall', async (req, res) => {
      const cursor = volleyBallPlayersCollection.find({});
      const getVolleyBall = await cursor.toArray();
      res.send(getVolleyBall);

    })



    // user post data 


    app.post('/users', async (req, res) => {
      const user = req.body
      const result = await userCollection.insertOne(user)
      console.log(result)
      res.json(result)
    })

    app.get('/users', async (req, res) => {
      const result = userCollection.find({});
      const allUsers = await result.toArray();
      res.json(allUsers)
    })





    app.put('/users', async (req, res) => {
      const user = req.body;
      const filter = { email: user.email };
      const options = { upsert: true };
      const updateDoc = { $set: user };
      const result = await userCollection.updateOne(filter, updateDoc, options)
      res.json(result)
    })







    app.put('/users/admin', async (req, res) => {
      const user = req.body
      console.log('put', user)
      const filter = { email: user.email };
      const updateDoc = { $set: { role: 'admin' } };
      const result = await userCollection.updateOne(filter, updateDoc)
      res.json(result)
    })




    app.get('/users/:email', async (req, res) => {
      const email = req.params.email
      const query = { email: email }
      const user = await userCollection.findOne(query)
      let isAdmin = false;
      if (user?.role === 'admin') {
        isAdmin = true;
      }
      res.json({ admin: isAdmin })
    })
























    app.post('/review', async (req, res) => {
      const user = req.body
      const result = await playersReviewCollection.insertOne(user)
      console.log(result)
      res.json(result)
    })



    app.get('/review', async (req, res) => {
      const cursor = playersReviewCollection.find({});
      const getreview = await cursor.toArray();
      res.send(getreview);

    })







    app.delete('/booking/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      console.log(id);
      const result = await bookingTicketCollection.deleteOne(query);
      res.json(result);
      console.log(result);
    })




    // update api (update a booking status)
    app.put('/update/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const updateStatus = {
        $set: {
          status: "approved"
        }
      }

      const result = await bookingTicketCollection.updateOne(query, updateStatus)
      res.json(result)
    })



    app.delete('/eventRegister/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      console.log(id);
      const result = await registerEventCollection.deleteOne(query);
      res.json(result);
      console.log(result);
    })




    // update api (update a booking status)
    app.put('/updatemere/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const updateStatus = {
        $set: {
          status: "approved"
        }
      }

      const result = await registerEventCollection.updateOne(query, updateStatus)
      res.json(result)
    })


    app.get('/featuresProducts', async (req, res) => {
      const cursor = featuresProductsCollection.find({});
      const featuresInfo = await cursor.toArray();
      res.send(featuresInfo);

    })







    // contest api 
    // insert perticipant registration 
    app.post("/contest/participant",async(req,res)=>{
      try {
        const existPerticipant = await  contParticipantCollection.findOne({email:req.body?.email})
        if(existPerticipant){
          res.json({error:{message:`Already registered from ${req.body.email}`}})
        }else{
          const parID = getUniqueID();
          const newParticipant = req.body;
          newParticipant.par_id = parID;
          const result = await  contParticipantCollection.insertOne(newParticipant)
          res.json(result)
        }
      } catch (err) {
        res.json({error:{message: err.message}})
      }
    })

    
    // get all perticipant info 
    app.get("/contest/participant",async(req,res)=>{
      const all_participant = await contParticipantCollection.find({}).toArray()
      res.json(all_participant)
    })

    // insert new quizes 
    app.post("/contest/quizes",async(req,res)=>{
      try {
        const existQuize = await contQuizeCollection.findOne({question:req.body.question})
        if (existQuize) {
              res.json({error:{message:`This question is already added: ${req.body.question}`}})
        }else{
              const newQuize = req.body;
              newQuize.qz_id = getUniqueID();
              const result = await contQuizeCollection.insertOne(newQuize)
              res.json(result)
        }
      } catch (err) {
        res.json({error:{message: err.message}})
      }
    }) 

    // get random quize 
    app.post("/contest/run/quize",async(req,res)=>{
      const isFinishedPerticipant = await contResultCollection.findOne({par_id:parseInt(req.body?.par_id)})
      if (isFinishedPerticipant && (isFinishedPerticipant.contest_status === "completed")) {
        const contestResultArray = await contResultCollection.find({par_id:parseInt(req.body?.par_id)}).project({_id:0, contest_status:1, question_count:1, remaining_time:1, valid_Score:1}).toArray(); 
        const contest_result = contestResultArray[0]
        res.json({contest_result,isFinishedPerticipant})
      }else{
        const previousAns = req.body?.prev_ans;
        try {
          const perticipant = await contParticipantCollection.findOne({par_id:parseInt(req.body.par_id)})
          if (perticipant) {
            const playingPerticipant = await contResultCollection.findOne({par_id:parseInt(req.body.par_id)})
            
            if (playingPerticipant) {
              // get all quizes ID 
              const quizeQuerOptions ={lavel: perticipant.lavel, playing_ctg: perticipant.playing_ctg}
              const ctgQuizesID = await contQuizeCollection.find(quizeQuerOptions).project({_id:0,qz_id:1}).toArray();
              const uniqueIds = ctgQuizesID.filter(item=> !playingPerticipant.given_quizes_id.includes(item.qz_id))
              const randomIndex = getRandomNumber(0,uniqueIds.length-1)
              // find the next quize 
              const nextQuizeArray = await contQuizeCollection.find(uniqueIds[randomIndex]).project({_id:0,qz_id:1,question:1,options:1}).toArray();
              const nextQuize = nextQuizeArray[0];
              // calculate score
              const ansOptions = {qz_id:parseInt(req.body?.prev_question_id)}
              const previousQuize = await contQuizeCollection.find(ansOptions).project({_id:0,ans:1}).toArray();
              let last_quize_score = 0;
              if (!previousAns) {
                last_quize_score = -1;
              }else if (previousAns === previousQuize[0]?.ans) {
                last_quize_score = 5;
              }else{
                last_quize_score = -2;
              }
              
              // Create the new update result
              const previousResult = {
                question_count: playingPerticipant.question_count + 1,
                last_quize_release_time: Date.now(),
                last_answer_receive_time: Date.now(),
                time_consumed: playingPerticipant.time_consumed + ( Date.now() - playingPerticipant.last_quize_release_time), // milliseconds
                remaining_time: (playingPerticipant.question_count * 1 * 60 * 1000) - (playingPerticipant.time_consumed + Date.now() - playingPerticipant.last_quize_release_time),
                valid_Score: playingPerticipant.valid_Score + last_quize_score,
                given_quizes_id: [...playingPerticipant.given_quizes_id, nextQuize.qz_id]
              }
              if (previousResult.question_count === 10 && playingPerticipant?.contest_status === "running") {
                // update the DB and tell the UI finished contest and not send next quize but sent the result
                previousResult.contest_status = "completed";
                previousResult.contest_ended = Date.now();
                const resultUpdate = await contResultCollection.updateOne({par_id:playingPerticipant.par_id},{$set: previousResult},{upsert:false})
                // send the response to UI 
                if (resultUpdate.modifiedCount > 0) {
                    res.json({quize_status:previousResult.contest_status, total_question:previousResult.question_count, remaining_time:previousResult.remaining_time, valid_Score:previousResult.valid_Score})
                }else{
                  res.json({error:{message:"Something went wrong."}})
                }
              }else{
                // update the DB 
                const resultUpdate = await contResultCollection.updateOne({par_id:playingPerticipant.par_id},{$set: previousResult}, {upsert:false})
                  // send the next quize 
                  if ((resultUpdate.modifiedCount > 0 ) && nextQuize.qz_id) { 
                      res.json(nextQuize)
                  }else{
                    console.log("no int");
                    res.json({error:{message:"Something went wrong."}})
                  }
              }
              }else{
                // start the contast and insert the data for first quize
                // get all quizes
                const quizeQuerOptions ={lavel: perticipant.lavel, playing_ctg: perticipant.playing_ctg, }
                const ctgQuizesID = await contQuizeCollection.find(quizeQuerOptions)
                .project({_id:0,qz_id:1,question:1,options:1}).toArray();
                // choose a random quize 
                const randomIndex = getRandomNumber(0,ctgQuizesID.length-1)
                const selectedQuize = ctgQuizesID[randomIndex]
                console.log(selectedQuize,quizeQuerOptions,"i am new");
                // insert the result data into result collection
                const newPerticipantResult = {
                  par_id: perticipant.par_id,
                  lavel: perticipant.lavel, 
                  playing_ctg: perticipant.playing_ctg,
                  contest_status: "running",
                  question_count: 1,
                  contest_started: Date.now(),
                  contest_ended: null,
                  last_quize_release_time: Date.now(),
                  last_answer_receive_time: Date.now(),
                  time_consumed: 0, // milliseconds
                  remaining_time: 0,
                  valid_Score: 0,
                  given_quizes_id: [selectedQuize.qz_id]
                  // "time_consumed":"time_consumed + (last_answer_receive_time_BODY - last_quize_release_time_DB)",
                  // "remaining_time": "(question_count * 1 * 60 * 1000) - (time_consumed + last_answer_receive_time_BODY - last_quize_release_time_DB)"
                }
                console.log(newPerticipantResult); 
                const insertRedult = await contResultCollection.insertOne(newPerticipantResult);
                 
                 if (insertRedult.insertedId && selectedQuize.qz_id) {
                    res.json(selectedQuize)
                  }else{
                   res.json({error:{message:"Something went wrong."}})
                 }
            }
            
          }else{
            res.json({message:"You have not registered for this contest"})
          }
        } catch (err) {
          res.json({error:{message: err.message}})
        }
      }
    })

    // get contest result 
    app.post("/contest/result",async(req,res)=>{
      console.log(req.body);
      const resultOptions = {lavel: req.body?.lavel, playing_ctg: req.body?.playing_ctg, contest_status:"completed"}
      try {
        const contestResults = await contResultCollection.find(resultOptions).project({_id:0,par_id:1,remaining_time:1,valid_Score:1}).toArray()
        // add the position for each participant (calc)
        
        const finalResults = [];
        contestResults.forEach((result)=>{
          const _result ={...result}
          _result.total_score =  parseInt(_result.valid_Score) +  Math.floor((parseInt(_result.remaining_time) /1000)/10)  // convert milliseconds=>seconds and give 1 point for every 10 seconds
          finalResults.push(_result)
        })
        let highestToLowest = finalResults.sort((a, b) => parseFloat(b.total_score) - parseFloat(a.total_score));
        const sendResult = [];
        highestToLowest.forEach((item,index)=>{
          item.position = index + 1;
          sendResult.push(item);
        })
        console.log(sendResult);
        res.json(sendResult)
      } catch (err) {
        res.json({error:{message: err.message}})
      }
    })

    
    // get single contest user par_id participant info by email 
    app.get("/contest/id/:userEmail",async(req,res)=>{
      const {userEmail} = req.params;
      const userInfo = await contParticipantCollection.findOne({email:userEmail});
      console.log(userInfo,userEmail);
      res.json({par_id:userInfo?.par_id,email:userInfo?.email})
    })


    // send player's email
    app.post("/player/sendEmail",async(req,res)=>{
      // let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        // host: "smtp.ethereal.email",
        // port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: `${process.env.NODE_MAILER_USER}`, // generated ethereal user
          pass: `${process.env.NODE_MAILER_PASS}`, // generated ethereal password
        },
      });

       // send mail with defined transport object
        let info = await transporter.sendMail({
          from: `"Fred Foo 👻" <${process.env.NODE_MAILER_USER}>`, // sender address
          to: `${req.body.email}`, // list of receivers
          subject: "Communicate With Player", // Subject line
          text: `${req.body.message}`, // plain text body
          // html: `<p>${req.body.message}</p>`, // html body
        });

        res.json(info)

    })


    app.post('/ordersInfo', async(req, res) =>{
      const ordersInfo = await ordersInfoCollection.insertOne(req.body);
      res.json(ordersInfo);
      });

      app.get('/ordersInfo', async (req, res) => {
        const cursor = ordersInfoCollection.find({});
        const ordersInfo = await cursor.toArray();
        res.json(ordersInfo);
      })


      // payment stripe
      app.post('/create-payment-intent', async (req, res) => {
        const paymentInfo = req.body;
        const amount = paymentInfo.price * 100;
        const paymentIntent = await stripe.paymentIntents.create({
            currency: 'usd',
            amount: amount,
            payment_method_types: ['card']
        });
        res.json({ clientSecret: paymentIntent.client_secret })
    })


    // end of mongodb connection 

  }


  finally {
    //  await client.close();
  }
}




runerw().catch(console.dir);





app.get('/', (req, res) => {
  res.send('SportClub.com')
})

app.get('/test', (req, res) => {
  res.send('SportClub.com test API')
})

http.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})

// app.listen(port, () => {
//   console.log(`listening at http://localhost:${port}`)
// })


