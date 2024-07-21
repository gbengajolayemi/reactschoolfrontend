import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import './Styles/Login.css'; // Import the CSS file for styling

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/staffs/login', { emailOrUsername, password });
      setMessage('Login successful');
      localStorage.setItem('token', res.data.token);
      history.push('/dashboard'); // Redirect to dashboard
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Staffs Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email or Username:</label>
          <input 
            type="text" 
            value={emailOrUsername} 
            onChange={(e) => setEmailOrUsername(e.target.value)} 
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="form-control"
          />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
      <p className="register-link">
        Don't have an account? <br/><Link to="/admincontact">Contact ADMIN to help set up</Link>
      </p>
    </div>
  );
};

export default Login;
