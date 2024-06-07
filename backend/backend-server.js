const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');

const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = process.env.MONGO_URI;
const uri = "mongodb+srv://Ubuntu:sidlingrox@cluster0.yfmxfot.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect();
const db = client.db('meetcode');
console.log("Connected to the database !");


const backend = express();
const backendServer = http.createServer(backend);

backend.use(cors());
backend.use(express.json());

backend.get('/',(req,res)=>{

  res.status(200);
  res.send('Hello World!');
})

/*

---------- AUTHENTICATION-----------------------

*/

backend.post('/auth', async (req,res)=>{
  /* Get the Entry with the Username */
  const user = await db.collection('authentication').findOne({
    "username": req.body.username,
  });

  /* Check if the passwords match */

  if(!user){
    res.status(401).send('Invalid Credentials');
    return;
  }

  res.status(200).send('Succesfully Logged In');
})



backendServer.listen(11000, ()=>{
  console.log('Backend Server Started on Port 11000');
})