import React, { useEffect } from "react";

const CreateCall = ({socket , PeerConnection })=>{    

    const InitializeInputSystem = async () =>{
        const constrains = {
            "video":true,
            "audio":true
        }
        var Stream;
    
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
    
        const SessionId = window.location.pathname.substring(6);
        const offer = await PeerConnection.createOffer();
        await PeerConnection.setLocalDescription(offer);

        console.log('Local Description Set');

        socket.on('answer',async (e)=>{
            console.log(e);
            const remoteDesc = new RTCSessionDescription(e);
            await PeerConnection.setRemoteDescription(remoteDesc);
            console.log('Remote Description Set');
            PeerConnection.restartIce();

        });

        socket.emit('offer' , {"offer" : offer , "SessionId": SessionId});

    }
    
    useEffect(()=>{
        InitializeInputSystem();
        PeerConnection.restartIce();
    },[]);

    PeerConnection.restartIce();

    return(
        <div>
            <h1>Welcome to the video call</h1>
            <video id="local-content" autoPlay={true} playsInline={true} muted={true}></video>
            <video id="remote-content" autoPlay={true} playsInline={true}></video>  
            { PeerConnection.restartIce() }
        </div>
    );
}

export default CreateCall;