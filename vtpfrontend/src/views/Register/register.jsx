import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email_id, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log('Registering with:', name, email_id, password);

    try {
      const response = await fetch('http://localhost:3080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email_id, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        window.location.href = '/'; 
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
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
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <div>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
