import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login'; // Login page that you created earlier
import Homepage from './pages/Homepage/Homepage'; // Login page that you created earlier
import TaskPage from './pages/TaskPage/TaskPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element = {<Homepage />} />
        <Route path="/taskpage" element = {<TaskPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
