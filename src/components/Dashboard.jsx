import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const Dashboard = () => {
  return (
    <div>
      <Header/>
      <h2>Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '20px' }}>
        <Link to="/allstudents" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ backgroundColor: '#FFC0CB', padding: '20px', borderRadius: '5px' }}>
            <h3>All Students</h3>
            <p>View and manage all students</p>
          </div>
        </Link>
        <Link to="/ss1students" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ backgroundColor: '#87CEEB', padding: '20px', borderRadius: '5px' }}>
            <h3>SS1 Students</h3>
            <p>View and manage SS1 students</p>
          </div>
        </Link>
        <Link to="/ss2students" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ backgroundColor: '#90EE90', padding: '20px', borderRadius: '5px' }}>
            <h3>SS2 Students</h3>
            <p>View and manage SS2 students</p>
          </div>
        </Link>
        <Link to="/ss3students" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ backgroundColor: '#FFD700', padding: '20px', borderRadius: '5px' }}>
            <h3>SS3 Students</h3>
            <p>View and manage SS3 students</p>
          </div>
        </Link>
        <Link to="/ss1studentsresult" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ backgroundColor: '#FFA07A', padding: '20px', borderRadius: '5px' }}>
            <h3>SS1 Results</h3>
            <p>Upload and manage SS1 results</p>
          </div>
        </Link>
        <Link to="/ss2studentsresult" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ backgroundColor: '#98FB98', padding: '20px', borderRadius: '5px' }}>
            <h3>SS2 Results</h3>
            <p>Upload and manage SS2 results</p>
          </div>
        </Link>
        <Link to="/ss3studentsresult" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ backgroundColor: '#DAA520', padding: '20px', borderRadius: '5px' }}>
            <h3>SS3 Results</h3>
            <p>Upload and manage SS3 results</p>
          </div>
        </Link>
        <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ backgroundColor: '#FF6347', padding: '20px', borderRadius: '5px' }}>
            <h3>Register Students</h3>
            <p>Register new students</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
