import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import './Styles/Register.css'; // Import the CSS file for styling

const Register = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    age: '',
    course: '',
    className: ''
  });
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { studentId, firstName, lastName, age, course, className } = formData;

    if (!studentId || !firstName || !lastName || !age || !course || !className) {
      setMessage('All fields are required');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage('Registration successful');
      setTimeout(() => {
        history.push('/login');
      }, 2000); // Redirect to login page after 2 seconds
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student ID:</label>
          <input 
            type="text" 
            name="studentId" 
            value={formData.studentId} 
            onChange={handleChange} 
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>First Name:</label>
          <input 
            type="text" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange} 
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input 
            type="text" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange} 
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input 
            type="number" 
            name="age" 
            value={formData.age} 
            onChange={handleChange} 
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Course:</label>
          <input 
            type="text" 
            name="course" 
            value={formData.course} 
            onChange={handleChange} 
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Class Name:</label>
          <input 
            type="text" 
            name="className" 
            value={formData.className} 
            onChange={handleChange} 
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
      <p className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
