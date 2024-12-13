import React, { useEffect } from 'react';

const Popup = ({ isOpen, onClose, title, userData, onSubmit }) => {
  if (!isOpen) return null; 

  const [formData, setFormData] = React.useState({});

  useEffect(() => {
    if (userData) {
      setFormData(userData);
      console.log("userData", userData);
    } else {
      setFormData({});
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    console.log("formData", formData);
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <button style={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 style={styles.title}>{title}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Full Name:
            <input
              type="text"
              name="fullName"
              value={formData.fullName || ''}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Username:
            <input
              type="text"
              name="userName"
              value={formData.userName || ''}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Clinic Name:
            <input
              type="text"
              name="clinicName"
              value={formData.clinicName || ''}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Doctor Name:
            <input
              type="text"
              name="doctorName"
              value={formData.doctorName || ''}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Number of Patients:
            <input
              type="number"
              name="noOfPatient"
              value={formData.noOfPatient || ''}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Revenue:
            <input
              type="number"
              name="revenue"
              value={formData.revenue || ''}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.submitButton}>Submit</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    animation: 'fadeIn 0.3s ease-in-out',
  },
  popup: {
    backgroundColor: '#f9f9f9',
    padding: '25px',
    borderRadius: '12px',
    width: '420px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    animation: 'scaleIn 0.3s ease-in-out',
  },
  closeButton: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#888',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    fontSize: '16px',
    color: '#555',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  input: {
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  inputFocus: {
    borderColor: '#007BFF',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  submitButtonHover: {
    backgroundColor: '#0056b3',
  },
};

export default Popup;
