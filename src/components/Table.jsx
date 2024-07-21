import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import './Styles/Table.css';

const Table = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editEmail, setEditEmail] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Number of users per page

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users?page=${page}&limit=${limit}`);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditEmail(user.email);
    setEditUsername(user.username);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditEmail('');
    setEditUsername('');
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/auth/user/${editingUser._id}`, {
        email: editEmail,
        username: editUsername,
      });
      fetchUsers(currentPage);
      handleCancelEdit();
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="table-container">
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td className="actions">
                  <button className="edit-btn" onClick={() => handleEditClick(user)}>Edit</button>
                  <button className="delete" onClick={() => handleDeleteUser(user._id)}>Delete</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingUser && (
          <div className="edit-form">
            <h3>Edit User</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
              </div>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                />
              </div>
              <button className="save-btn" type="submit">Save</button>
              <button className="cancel-btn" type="button" onClick={handleCancelEdit}>Cancel</button>
            </form>
          </div>
        )}

        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span> Page {currentPage} of {totalPages} </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
