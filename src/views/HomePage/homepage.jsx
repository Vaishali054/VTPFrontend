import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Register/register.css';
import NavBar from '../../components/NavBar/NavBar';
import { handleLogin } from '../../api/loginauth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await handleLogin(email, password);
      if (response.message) {
        alert(response.message)
        document.cookie = `token=${response.token}; path=/`;
        window.location.href = '/StocksList';
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Internal server error. Please try again later.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <NavBar />
      <div className="login-container">
        <h2>Login</h2>
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
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
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
