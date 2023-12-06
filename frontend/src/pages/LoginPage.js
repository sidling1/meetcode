import React from 'react';
import { useNavigate } from 'react-router-dom';



const LoginPage = ({socket}) => {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        var {uname} = document.forms[0];
            
        socket.connect();

        navigate("/home");
    }

return (
    <div>
        
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
            <label>username :
            <input type="text" name="uname"></input>
            </label>
            <br />
            <br />
            <br />
            <button type="submit">Login</button>
        </form>
        
    </div>
)
}

export default LoginPage;