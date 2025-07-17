// src/pages/Dashboard.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, token, logout, loading, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div style={styles.loading}>Loading dashboard...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome to Your Dashboard!</h2>
      {user && (
        <div style={styles.userInfo}>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      )}
      {profile && (
        <div style={styles.profileDetails}>
          <h3>Your Profile Details (From API):</h3>
          <p>ID: {profile._id}</p>
          <p>Username: {profile.username}</p>
          <p>Email: {profile.email}</p>
          <p>Role: {profile.role}</p>
        </div>
      )}
      <button onClick={logout} style={styles.logoutButton}>Logout</button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '25px',
    color: '#333',
    fontSize: '2em',
  },
  userInfo: {
    backgroundColor: '#e6f7ff',
    borderLeft: '5px solid #007bff',
    padding: '15px',
    marginBottom: '20px',
    borderRadius: '4px',
    textAlign: 'left',
  },
  profileDetails: {
    backgroundColor: '#f0f0f0',
    padding: '15px',
    marginBottom: '20px',
    borderRadius: '4px',
    textAlign: 'left',
  },
  logoutButton: {
    padding: '12px 25px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
    marginTop: '20px',
  },
  loading: {
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '1.2em',
    color: '#555',
  }
};

export default Dashboard;
