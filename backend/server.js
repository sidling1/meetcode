const app = require('express')();
const server = require('http').createServer(app);
const { Server } = require("socket.io");



const io = new Server(server , {
    cors:{
        origin:"http://localhost:3000"
    }
});

const OngoingCalls = {"0":{},"1":{},"2":{},"3":{},"4":{},"5":{},"6":{},"7":{},"8":{},"9":{}}


io.on('connection', (socket) => {
  socket.on('disconnect',()=>{
    console.log('connection closed');
  })

  socket.on('offer', async (e)=>{
    const Id = e.SessionId;
    
    // const rooms = db.collection("rooms");

    const data = {
      "Id":Id,
      "Offer":e.offer,
      "Answer":[],
    }

    // await rooms.insertOne(data);
    OngoingCalls[Id] = e.offer;
    console.log(OngoingCalls);
  })

  socket.on('answer', (e)=>{
    console.log('Answer event Triggered !');
    console.log(e);

    io.emit('answer', e);
  })

  socket.on('query' ,async e=>{

    // const data = await db.collection("rooms").findOne({"Id":e});

    // console.log(data.Offer);

    socket.emit('reply' , OngoingCalls[e]);
  })


  socket.on('new-ice-candidate' , async e => {
    io.emit('new-ice-candidate' , e);
  })
  
});



server.listen(5000,()=>{
  console.log("server listening on port 5000");
})

