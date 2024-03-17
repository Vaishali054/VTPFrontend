import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';
import TopNavBar from '../../components/TopNavbar/TopNavBar';
import { handleLogin } from '../../api/loginauth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await handleLogin(email, password);
      if (response.ok) {
        document.cookie = `token=${response.token}; path=/`;
        window.location.href = '/StocksList';
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
              type="email"
              value={email}
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
