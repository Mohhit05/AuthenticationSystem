// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword'; // Import new page
import ResetPassword from './pages/ResetPassword';   // Import new page
import { AuthProvider, useAuth } from './context/AuthContext'; // Import AuthProvider and useAuth
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

const Home = () => {
  const { user, logout } = useAuth(); // Use useAuth hook
  return (
    <div style={styles.homeContainer}>
      <h1 style={styles.homeHeading}>Welcome to the Authentication System</h1>
      <nav style={styles.nav}>
        {!user ? (
          <>
            <Link to="/register" style={styles.navLink}>Register</Link>
            <Link to="/login" style={styles.navLink}>Login</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
            <button onClick={logout} style={styles.logoutButton}>Logout</button>
          </>
        )}
      </nav>
      {user && <p style={styles.welcomeMessage}>Hello, {user.username} ({user.role})!</p>}
    </div>
  );
};

function App() {
  return (
    <Router>
      {/* AuthProvider wraps the entire app to provide auth context */}
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

// Separate component to use useAuth hook within Router context
const AppContent = () => {
  return (
    <>
      {/* You can add a global header/navbar here if you want */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* New route */}
        <Route path="/reset-password/:token" element={<ResetPassword />} /> {/* New route with token */}

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add other protected routes here later */}
        </Route>

        {/* Catch-all for unknown routes */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
};

// Basic inline styles for App.jsx
const styles = {
  homeContainer: {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '30px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  homeHeading: {
    color: '#333',
    marginBottom: '30px',
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '30px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: '1.1em',
    padding: '10px 15px',
    border: '1px solid #007bff',
    borderRadius: '5px',
    transition: 'background-color 0.3s, color 0.3s',
  },
  navLinkHover: {
    backgroundColor: '#007bff',
    color: 'white',
  },
  logoutButton: {
    textDecoration: 'none',
    color: '#dc3545',
    fontWeight: 'bold',
    fontSize: '1.1em',
    padding: '10px 15px',
    border: '1px solid #dc3545',
    borderRadius: '5px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
  },
  welcomeMessage: {
    fontSize: '1.2em',
    color: '#555',
    marginTop: '20px',
  }
};


export default App;