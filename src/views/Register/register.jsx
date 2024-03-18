import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css';
import { registerUser } from '../../api/register';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import TopNavBar from '../../components/topNavbar/topNavBar';

export default function Register() {
  const [name, setName] = useState('');
  const [email_id, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log('Registering with:', name, email_id, password);

    if (password !== confirmPassword) {
      console.error('Password and confirm password do not match.');
      return;
    }

    try {
      const { success, message, error } = await registerUser(name, email_id, password);
      if (success) {
        alert("Registered successfully!")
        window.location.href = '/';
      } else {
        window.location.href = '/';
        if (error && error.response && error.response.data && error.response.data.message === 'Email already in use') {
          alert('Email ID is already in use. Please use a different one.');
        } else {
          alert(message || 'Registration failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Internal server error. Please try again later.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <TopNavBar />
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email ID:</label>
            <input
              type="email"
              value={email_id}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="password-input">
            <label>Password:</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="password-toggle" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
            </div>
          </div>
          <div className="confirm-password">
            <label>Confirm Password:</label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
              </span>
            </div>
          </div>
          <button type="submit">Register</button>
        </form>
        <div>
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}

