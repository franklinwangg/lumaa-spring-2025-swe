import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation after registration
// import { register } from '../services/authService'; // Import your authService


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Redirect to login page after successful registration

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // const response = await register(username, password); // Call the register function from authService
      console.log("username : ", username);
      console.log("password : ", password);
      await fetch("http://localhost:3001/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Ensures the body is treated as JSON
        },
        body: JSON.stringify({ username: username, password: password })

      })
        .then((response) => {
          if (response.ok) {
            navigate('/login'); // Redirect to login page after successful registration
          }
          else {
            throw error("User unable to be registered");
          }
        })

    } catch (err) {
      setError('Registration failed. Please try again.', err);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
