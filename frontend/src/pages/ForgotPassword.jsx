// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Ensure this matches your Vercel Environment Variable (VITE_API_BASE_URL or REACT_APP_API_BASE_URL)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/auth';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset link');
      }

      setMessage(data.message); // Display success message from backend
      setEmail(''); // Clear the email input
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Forgot Password</h2>
      {message && <p style={styles.success}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Enter your email address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            placeholder="e.g., your@example.com"
          />
        </div>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      <p style={styles.linkText}>
        Remember your password? <Link to="/login" style={styles.link}>Login</Link>
      </p>
    </div>
  );
};

// Reuse or adapt styles from Login/Register for consistency
const styles = {
    container: {
        maxWidth: '450px',
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
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    formGroup: {
        textAlign: 'left',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: 'bold',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        boxSizing: 'border-box',
        fontSize: '1em',
    },
    button: {
        padding: '12px 20px',
        backgroundColor: '#ffc107', // Amber/Yellow for Forgot Password
        color: '#333',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1.1em',
        fontWeight: 'bold',
        marginTop: '15px',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#e0a800',
    },
    success: {
        color: '#28a745', // Green
        backgroundColor: '#d4edda',
        border: '1px solid #c3e6cb',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '20px',
    },
    error: {
        color: '#dc3545', // Red
        backgroundColor: '#f8d7da',
        border: '1px solid #f5c6cb',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '20px',
    },
    linkText: {
        marginTop: '25px',
        color: '#666',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

export default ForgotPassword;