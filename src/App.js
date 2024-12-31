// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile'; 
import AdminLogin from './components/AdminLogin'; 
import DetailPage from './components/DetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Admin-login" element={<AdminLogin />} />
          <Route path="/:type" element={<DetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
