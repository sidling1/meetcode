import './App.css';
import LoginPage from './pages/LoginPage';
import React from 'react';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import { io } from 'socket.io-client';
import CreateCall from './pages/CreateCall';
import JoinCall from './pages/JoinCall';


function App() {
  const url = 'http://localhost:5000';

  const socket = io(url , {
      autoConnect: false,
  });  

  const configuration = {
    'iceServers': [
      {'urls': 'stun:stun.l.google.com:19302'},
    ]
  };

  const PeerConnection = new RTCPeerConnection(configuration);
   
  PeerConnection.addEventListener('icecandidate',e=>{
    if(e.candidate){
      socket.emit('new-ice-candidate' , e.candidate);
    }
  });
  
  socket.on('new-ice-candidate' , async e => {
    if(e){
      try{
        await PeerConnection.addIceCandidate(e);
        console.log("\nice candidate added\n");
      } catch(err){
        console.error('Error Adding Candidate' , err);
      }
    }
  });

  PeerConnection.addEventListener('connectionstatechange', event => {
    
    console.log(event);
    console.log(PeerConnection.connectionState);
    if (PeerConnection.connectionState === 'connected') {
        console.log('Connected Succesfully');
    }

  });

  return (
    <Router>
      <Routes>
      <Route path="/" exact element={(<LoginPage socket={socket}/>)}></Route>
      <Route path="/Home" exact element={<HomePage PeerConnection={PeerConnection} socket={socket}></HomePage>}></Route>
      <Route path="/call/:sessionId" element={<CreateCall socket={socket} PeerConnection={PeerConnection}/>}></Route>
      <Route path="/call/:sessionId/:sessionId" element={<JoinCall socket={socket} PeerConnection={PeerConnection}/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
