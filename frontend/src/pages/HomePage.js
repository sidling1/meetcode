import React from "react"
import { useNavigate } from "react-router-dom"

const HomePage = ({socket , PeerConnection})=>{

    const navigate = useNavigate();

    const handleJoinCall = ()=>{
        const SessionId = prompt("Enter the SessionId");
        if(SessionId != "")navigate(`/call/${SessionId}/${SessionId}`);
    }
    

    const handleCreateCall = async ()=>{
        const SessionId = Math.floor(Math.random()*10);
        navigate(`/call/${SessionId}`);
    }


    return (
        <div>
            Hello World HomePage
            <br/>
            <br/>
            <br/>

            <button onClick={handleJoinCall}>Join A Call</button>
            <button onClick={handleCreateCall}>Create A Call</button>
        </div>
    )
}

export default HomePage