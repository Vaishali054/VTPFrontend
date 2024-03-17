import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './homepage.css';
import TopNavBar from '../../components/TopNavbar/TopNavBar';
import { handleLogin } from '../../api/loginauth'; // Import the API function for login

export default function Login() {
  const [email_id, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await handleLogin(email_id, password); // Call the API function for login
      if (response.ok) {
        // console.log('Login successful');
        window.location.href = '/auth/profile';
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Internal server error. Please try again later.');
    }
  };

  return (
    <>
       <TopNavBar />
      <div className="login-container">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email_id"
              value={email_id}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <div>
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </div>
    </>
  );
}
