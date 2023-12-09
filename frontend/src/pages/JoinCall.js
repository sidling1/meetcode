import React, { useEffect } from "react";

const JoinCall = ({ PeerConnection , socket})=>{

    var Stream;

    const InitializeInputSystem = async () =>{
        const constrains = {
            "video":true,
            "audio":true
        }
        
    
        await navigator.mediaDevices.getUserMedia(constrains)
        .then(stream=>{
            console.log('got Media Stream' , stream);
            Stream = stream;
        })
        .catch(e=>{
            console.error('Error Accessing Camera/Mic' , e);
        })
    
        const videoElement = document.getElementById("local-content");
        videoElement.srcObject = Stream;
    
        Stream.getTracks().forEach(track => {
            PeerConnection.addTrack(track, Stream);
        })
        
        PeerConnection.addEventListener('track', async (event) => {
            // console.log('Track Event Called');
            const remoteVideo = document.getElementById('remote-content');
            console.log(remoteVideo)
            const [remoteStream] = event.streams;
            console.log("Recieved stream",remoteStream);
            remoteVideo.srcObject = remoteStream;
        });
        


        const SessionId = window.location.pathname.split('/')[2];
        var offer;


        socket.on('reply',async e=>{
            offer = e;
            PeerConnection.setRemoteDescription(new RTCSessionDescription(offer));
            console.log('Remote Description Set')
            const answer = await PeerConnection.createAnswer();
            await PeerConnection.setLocalDescription(answer);
            socket.emit('answer', answer);
            console.log('Local Description Set');
        });

        socket.emit('query' , SessionId);


    }
    

    useEffect(()=>{
        InitializeInputSystem();
    },[]);


    return(
       
        <div>
            <h1>Welcome to the video call</h1>
            <video id="local-content" autoPlay={true} playsInline={true} muted={true}></video>
            <video id="remote-content" autoPlay={true} playsInline={true}></video> 
        </div>
        
    );
}

export default JoinCall;