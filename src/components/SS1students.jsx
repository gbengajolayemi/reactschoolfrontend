import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

const Primary1Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/class/Primary%201');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <>
    <Header/>

    <div>
      
      <h2>Primary 1 Students</h2>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Class Name</th>
            <th>Courses</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.className}</td>
              <td>{student.course }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Primary1Students;
