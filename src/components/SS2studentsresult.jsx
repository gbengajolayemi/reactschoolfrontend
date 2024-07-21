import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';


const SS2Studentsresult = () => {
  const [students, setStudents] = useState([]);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editedStudentData, setEditedStudentData] = useState({
    studentId: '',
    chemistry: '',
    math: '',
    english: ''
  });
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newStudentData, setNewStudentData] = useState({
    studentId: '',
    chemistry: '',
    math: '',
    english: ''
  });

  useEffect(() => {
    const fetchSS2Students = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/results/ss2');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching SS2 students data:', error);
      }
    };

    fetchSS2Students();
  }, []);

  const handleEdit = (studentId) => {
    setEditingStudentId(studentId);
    const studentToEdit = students.find(student => student.studentId === studentId);
    if (studentToEdit) {
      setEditedStudentData({
        studentId: studentToEdit.studentId,
        chemistry: studentToEdit.chemistry,
        math: studentToEdit.math,
        english: studentToEdit.english
      });
    }
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/results/ss2/ss2students/${editingStudentId}`, editedStudentData);
      setEditingStudentId(null);
      // Refresh student list after editing
      const response = await axios.get('http://localhost:5000/api/results/ss2');
      setStudents(response.data);
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
        await axios.delete(`http://localhost:5000/api/results/ss2/ss2students/${studentId}`);
        // Remove the deleted student from the list of students
        setStudents(prevStudents => prevStudents.filter(student => student.studentId !== studentId));
        console.log('Student deleted:', studentId);
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleAddUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudentData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/results/ss2/uploadSingleResult', newStudentData);
      // Refresh the student list after adding the new user
      const response = await axios.get('http://localhost:5000/api/results/ss2');
      setStudents(response.data);
      // Reset the new student data and close the modal
      setNewStudentData({
        studentId: '',
        chemistry: '',
        math: '',
        english: ''
      });
      setShowAddUserModal(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <>
    <Header/>
    <div>
      <h2>SS2 Students List</h2>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Chemistry</th>
            <th>Math</th>
            <th>English</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{editingStudentId === student.studentId ? (
                <input
                  type="text"
                  name="studentId"
                  value={editedStudentData.studentId}
                  onChange={handleInputChange}
                  readOnly
                />
              ) : student.studentId}</td>
              <td>{editingStudentId === student.studentId ? (
                <input
                  type="number"
                  name="chemistry"
                  value={editedStudentData.chemistry}
                  onChange={handleInputChange}
                />
              ) : student.chemistry}</td>
              <td>{editingStudentId === student.studentId ? (
                <input
                  type="number"
                  name="math"
                  value={editedStudentData.math}
                  onChange={handleInputChange}
                />
              ) : student.math}</td>
              <td>{editingStudentId === student.studentId ? (
                <input
                  type="number"
                  name="english"
                  value={editedStudentData.english}
                  onChange={handleInputChange}
                />
              ) : student.english}</td>
              <td>
                {editingStudentId === student.studentId ? (
                  <>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(student.studentId)}>Edit</button>
                )}
                <button onClick={() => handleDelete(student.studentId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleAddUser}>Add User</button>

      {showAddUserModal && (
        <div className="modal">
          <form onSubmit={handleAddUserSubmit}>
            <label>
              Student ID:
              <input
                type="text"
                name="studentId"
                value={newStudentData.studentId}
                onChange={handleAddUserInputChange}
                required
              />
            </label>
            <label>
              Chemistry:
              <input
                type="number"
                name="chemistry"
                value={newStudentData.chemistry}
                onChange={handleAddUserInputChange}
                required
              />
            </label>
            <label>
              Math:
              <input
                type="number"
                name="math"
                value={newStudentData.math}
                onChange={handleAddUserInputChange}
                required
              />
            </label>
            <label>
              English:
              <input
                type="number"
                name="english"
                value={newStudentData.english}
                onChange={handleAddUserInputChange}
                required
              />
            </label>
            <button type="submit">Add</button>
            <button type="button" onClick={() => setShowAddUserModal(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
    </>
  );
};

export default SS2Studentsresult;
