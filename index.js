// Basic Working,

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient } = require('mongodb');
const { getUniqueID, getRandomNumber } = require('./utilities');

const ObjectId = require("mongodb").ObjectId;


const port = process.env.PORT || 7000;


//Middleware Work,

app.use(cors());
app.use(express.json());




// Functionally Working,


// Calling User and password with .env,
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l2npz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2fqf1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


// creating a client in MongoClient,

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });





console.log(uri);


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

    const featuresProductsCollection = database.collection('featuresProducts');
    
    const contParticipantCollection = database.collection('contestParticipant');
    const contQuizeCollection = database.collection('contestQuizes');
    const contResultCollection = database.collection('contestResult');


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

    // new added
    // get single user par_id participant info by email 
    app.get("/contest/id/:userEmail",async(req,res)=>{
      const {userEmail} = req.params;
      const userInfo = await contParticipantCollection.findOne({email:userEmail});
      console.log(userInfo,userEmail);
      res.json({par_id:userInfo.par_id,email:userInfo.email})
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

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})




/*
const resultSchema = {
  "par_id": 45454,
  "contest_status": "running"|"end",
  "question_count": 0,
  "contest_started": Date.now(),
  "contest_ended": Date.now(),
  "last_quize_release_time": Date.now(),
  "last_answer_receive_time": Date.now(),
  "time_consumed":"time_consumed + (last_answer_receive_time - last_quize_release_time)",
  "remaining_time": "(question_count * 1 * 60 * 1000) - (time_consumed + last_answer_receive_time - last_quize_release_time)"
  "valid_Score":"",
  "given_quizes_id": []
}
*/
/*
user id:
question_count: 10 //max 10
prev_question: "",
prev_ans: "",
quize_release_time: Date.now();
answer_receive_time: Date.now();
time_consumed: ((answer_receive_time - quize_release_time)/1000).toFixed(4),
remaining_time: "",
total_time: "60",
reamining_time: 0,
valid_point: "",

wrong_answer: -2 point
no answer: -1
right answer: 5
*/


