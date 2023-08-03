import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const requestBody = {
      login_id: username,
      password: password
    };

    try {
      const response = await fetch('/assignment_auth.jsp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.access_token;
        setMessage('Login successful! Token received.');
        
        // Store the token in local storage
        localStorage.setItem('token', token);
        console.log(localStorage.getItem('token'));
      } else {
        setMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /><br/><br/>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br/>
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>

      <button onClick={()=>navigate("/customer-list1")}>Go to Customer List</button>
    </div>
    
  );
};

export default Login;
