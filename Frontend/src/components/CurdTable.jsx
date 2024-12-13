import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress,
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Popup from './Popup';


function CurdTable() {
  const [users, setUsers] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [popupTitle, setPopupTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);


  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/users/get-users');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setUsers(data?.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [formSubmitted]);


  // Handle Add User button
  const handleAddUser = () => {
    setPopupTitle('Add User');
    setCurrentUser(null);
    setPopupOpen(true);
  };

  // Handle Edit User button
  const handleEdit = (user) => {
    setPopupTitle('Edit User');
    setCurrentUser(user);
    setPopupOpen(true);
  };

  // Handle form submission
  const handleFormSubmit = async (userData) => {
    try {
      const url = currentUser
        ? `http://localhost:4000/api/users/update-user/${currentUser._id}`
        : 'http://localhost:4000/api/users/create';
      const method = currentUser ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to ${currentUser ? 'update' : 'add'} user: ${response.statusText}`);
      }
  
      // Make sure that the response is valid and contains the updated user data
      const updatedUser = await response.json();
      console.log('Updated User:', updatedUser); // Debugging log
  
      if (currentUser) {
        // Update the user in the list (ensure user._id exists)
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === currentUser._id ? { ...user, ...updatedUser } : user
          )
        );
      } else {
        // Add new user to the list
        setUsers((prevUsers) => [...prevUsers, updatedUser]);
      }
      setFormSubmitted(!formSubmitted);
      setPopupOpen(false); // Close the popup after form submission
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (userId, userName) => {
    try {
      // Send DELETE request to the server with the user's identifier
      const response = await fetch(`http://localhost:4000/api/users/delete/${userId}`, {
        method: 'POST',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
  
      // Remove the user from the state (frontend)
      setUsers((prevUsers) => prevUsers.filter((user) => user.userName !== userName));
      
    } catch (error) {
      alert(error.message); // Handle any errors
    }
  };
  

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    // If there's an error, show an error message
    return <div>Error: {error}</div>;
  }

  return (
    <div className="table-wrapper">
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddUser()}
        >
          Add User
        </Button>
      </div>

      <TableContainer className='table-container' component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#0096FF' }}>
            <TableRow>
              {/* <TableCell>Username</TableCell> */}
              {/* <TableCell>Email</TableCell> */}
              <TableCell>Full Name</TableCell>
              <TableCell>Doctor Name</TableCell>
              <TableCell>Clinic Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>No. of Patients</TableCell>
              <TableCell>Revenue</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users?.map((user) => (
              <TableRow key={user._id}>
                {/* <TableCell>{user.userName}</TableCell> */}
                {/* <TableCell>{user.email}</TableCell> */}
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.doctorName}</TableCell>
                <TableCell>{user.clinicName}</TableCell>
                <TableCell>{user.location}</TableCell>
                <TableCell>{user.noOfPatient}</TableCell>
                <TableCell>{user.revenue}</TableCell>
                <TableCell>
                  {/* Edit and Delete Buttons */}
                  <IconButton onClick={() => handleEdit(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user._id, user.userName)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        title={popupTitle}
        userData={currentUser}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default CurdTable;
