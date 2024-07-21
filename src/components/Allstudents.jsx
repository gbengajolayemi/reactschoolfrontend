import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Headers from './Header';

const Allstudents = () => {
  const [students, setStudents] = useState([]);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editedStudentData, setEditedStudentData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    course: '',
    className: ''
  });
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchStudents = async (page = 1, searchQuery = '') => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/students`, {
        params: { page, search: searchQuery }
      });
      setStudents(response.data.students);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(currentPage, search);
  }, [currentPage, search]);

  const handleEdit = (studentId) => {
    setEditingStudentId(studentId);
    const studentToEdit = students.find(student => student.studentId === studentId);
    if (studentToEdit) {
      setEditedStudentData({
        firstName: studentToEdit.firstName,
        lastName: studentToEdit.lastName,
        age: studentToEdit.age,
        course: studentToEdit.course,
        className: studentToEdit.className
      });
    }
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/auth/students/${editingStudentId}`, editedStudentData);
      setEditingStudentId(null);
      fetchStudents(currentPage, search);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingStudentId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStudentData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDelete = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:5000/api/auth/students/${studentId}`);
        fetchStudents(currentPage, search);
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Headers/>
      <h2>Student List</h2>
      <input
        type="text"
        placeholder="Search by student ID"
        value={search}
        onChange={handleSearchChange}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Course</th>
              <th>Class Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student._id}>
                <td>{student.studentId}</td>
                <td>{editingStudentId === student.studentId ? (
                  <input
                    type="text"
                    name="firstName"
                    value={editedStudentData.firstName}
                    onChange={handleInputChange}
                  />
                ) : student.firstName}</td>
                <td>{editingStudentId === student.studentId ? (
                  <input
                    type="text"
                    name="lastName"
                    value={editedStudentData.lastName}
                    onChange={handleInputChange}
                  />
                ) : student.lastName}</td>
                <td>{editingStudentId === student.studentId ? (
                  <input
                    type="text"
                    name="age"
                    value={editedStudentData.age}
                    onChange={handleInputChange}
                  />
                ) : student.age}</td>
                <td>{editingStudentId === student.studentId ? (
                  <input
                    type="text"
                    name="course"
                    value={editedStudentData.course}
                    onChange={handleInputChange}
                  />
                ) : student.course}</td>
                <td>{editingStudentId === student.studentId ? (
                  <input
                    type="text"
                    name="className"
                    value={editedStudentData.className}
                    onChange={handleInputChange}
                  />
                ) : student.className}</td>
                <td>
                  {editingStudentId === student.studentId ? (
                    <>
                      <button onClick={handleSaveEdit}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(student.studentId)}>Edit</button>
                      <button onClick={() => handleDelete(student.studentId)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Allstudents;
