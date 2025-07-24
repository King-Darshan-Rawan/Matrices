import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MentorList from './pages/MentorList';
import Navbar from './components/Navbar';
import './App.css'; 
function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen bg-white font-sans">
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/mentors" element={<MentorList user={user} />} />
      </Routes>
    </div>
  );
}

export default App;