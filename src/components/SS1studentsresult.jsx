import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

const SS1StudentsResult = () => {
  const [results, setResults] = useState([]);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editedResultData, setEditedResultData] = useState({
    chemistry: '',
    math: '',
    english: ''
  });
  const [newResultVisible, setNewResultVisible] = useState(false);
  const [newResultData, setNewResultData] = useState({
    studentId: '',
    chemistry: '',
    math: '',
    english: ''
  });

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/results/ss1');
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);

  const handleEdit = (studentId) => {
    setEditingStudentId(studentId);
    const resultToEdit = results.find(result => result.studentId === studentId);
    if (resultToEdit) {
      setEditedResultData({
        chemistry: resultToEdit.chemistry,
        math: resultToEdit.math,
        english: resultToEdit.english
      });
    }
  };

  const handleSaveEdit = async (studentId) => {
    try {
      await axios.put(`http://localhost:5000/api/results/ss1/ss1students/${studentId}`, editedResultData);
      setEditingStudentId(null);
      // Refresh result list after editing
      const response = await axios.get('http://localhost:5000/api/results/ss1');
      setResults(response.data);
    } catch (error) {
      console.error('Error updating result:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingStudentId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedResultData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDelete = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student result?')) {
      try {
        await axios.delete(`http://localhost:5000/api/results/ss1/ss1students/${studentId}`);
        // Remove the deleted result from the list of results
        setResults(prevResults => prevResults.filter(result => result.studentId !== studentId));
        console.log('Result deleted:', studentId);
      } catch (error) {
        console.error('Error deleting result:', error);
      }
    }
  };

  const handleAddResultClick = () => {
    setNewResultVisible(true);
  };

  const handleAddResultSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/results/ss1/uploadSingleResult', newResultData);
      // Refresh result list after adding new result
      const response = await axios.get('http://localhost:5000/api/results/ss1');
      setResults(response.data);
      // Clear input fields
      setNewResultData({
        studentId: '',
        chemistry: '',
        math: '',
        english: ''
      });
      setNewResultVisible(false);
    } catch (error) {
      console.error('Error adding result:', error);
    }
  };

  const handleNewResultInputChange = (e) => {
    const { name, value } = e.target;
    setNewResultData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <>
    <Header/>

    <div>
      <h2>SS1 Student Results</h2>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Chemistry</th>
            <th>Math</th>
            <th>English</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr key={result.studentId}>
              <td>{result.studentId}</td>
              <td>{editingStudentId === result.studentId ? (
                <input
                  type="text"
                  name="chemistry"
                  value={editedResultData.chemistry}
                  onChange={handleInputChange}
                />
              ) : result.chemistry}</td>
              <td>{editingStudentId === result.studentId ? (
                <input
                  type="text"
                  name="math"
                  value={editedResultData.math}
                  onChange={handleInputChange}
                />
              ) : result.math}</td>
              <td>{editingStudentId === result.studentId ? (
                <input
                  type="text"
                  name="english"
                  value={editedResultData.english}
                  onChange={handleInputChange}
                />
              ) : result.english}</td>
              <td>
                {editingStudentId === result.studentId ? (
                  <>
                    <button onClick={() => handleSaveEdit(result.studentId)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                    <button onClick={() => handleDelete(result.studentId)}>Delete</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(result.studentId)}>Edit</button>
                    <button onClick={() => handleDelete(result.studentId)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      <button onClick={handleAddResultClick}>Add Score</button>
      {newResultVisible && (
        <form onSubmit={handleAddResultSubmit}>
          <label>
            Student ID:
            <input type="text" name="studentId" value={newResultData.studentId} onChange={handleNewResultInputChange} />
          </label>
          <label>
            Chemistry:
            <input type="text" name="chemistry" value={newResultData.chemistry} onChange={handleNewResultInputChange} />
          </label>
          <label>
            Math:
            <input type="text" name="math" value={newResultData.math} onChange={handleNewResultInputChange} />
          </label>
          <label>
            English:
            <input type="text" name="english" value={newResultData.english} onChange={handleNewResultInputChange} />
          </label>
          <button type="submit">Add Score</button>
        </form>
      )}
    </div>
    </>
  );
};

export default SS1StudentsResult;

