const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server , {
    cors:{
        origin:"http://localhost:3000"
    }
});

const OngoingCalls = {"0":{},"1":{},"2":{},"3":{},"4":{},"5":{},"6":{},"7":{},"8":{},"9":{}}


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect',()=>{
    console.log('connection closed');
  })

  socket.on('offer', (e)=>{
    const Id = e.SessionId;
    console.log('Offer Event Triggered !');
    OngoingCalls[Id] = e.offer;
    console.log(OngoingCalls);
  })

  socket.on('answer', (e)=>{
    console.log('Answer event Triggered !');
    console.log(e);
    io.emit('answer', e);
  })

  socket.on('query' , e=>{
    socket.emit('reply' , OngoingCalls[e]);
  })


  socket.on('new-ice-candidate' , async e => {
    io.emit('new-ice-candidate' , e);
  })
  
});


server.listen(5000, () => {
  console.log('listening on *:5000');
});