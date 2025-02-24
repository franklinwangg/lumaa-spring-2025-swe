import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

const Homepage = () => {
  const navigate = useNavigate(); // useNavigate for navigation in React Router v6

  return (
    <div className="home-container">
      <h2>To-Do List App</h2>
      <div className="button-container">
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  );
};

export default Homepage;
