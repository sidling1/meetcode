import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SendRequest from '../scripts/SendRequest';


const LoginPage = () => {

    const navigate = useNavigate();

    const [err,setErr] = useState({
        value: false,
        message: ""
    });
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const DOMAIN_NAME = "http://localhost:11000";

        var {uname , pwd} = document.forms[0];
        
        const data = {
            "username": uname.value,
            "password": pwd.value
        }

        /* Do any encryption decryption if you want :p */

        await SendRequest('POST',`${DOMAIN_NAME}/auth`,data,function(){
            if(this.status == 401){
                setErr({
                    value:true,
                    message:this.responseText,
                });
            }else if(this.status == 200){
                setErr({
                    value:false,
                    message:""
                });
                navigate("/home");
            }else{
                setErr({
                    value:true,
                    message:"Some Unknown Error has Occured",
                });
            }
        });
    }

    const handleClick = ()=>{

    }

return (
    <div>
        
        {err.value?
        
        (<div style={{
            backgroundColor: "red",
            margin: "0px",
            padding: "0px"
        }}>
            {err.message}   
        </div>)
        
        :
        
        null
        }

        <h1 style={{
            fontSize: "20pt",

        }}>
            MeetCode
        </h1>
        
        <p>to ease the interview process</p>
        
        <form onSubmit={handleSubmit}>
            <label>username :
            <input type="text" name="uname"></input>
            </label>
            <label>password :
            <input type="text" name="pwd"></input>
            </label>
            <button type="submit">Login</button>
        </form>

        <p>
            if you do not have an account <button onClick={handleClick()}> Sign-Up </button>
        </p>
        
    </div>
)
}

export default LoginPage;