// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Mentee',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', form);
      alert('Registered successfully! You can now log in.');

      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-sm p-6 bg-white border border-gray-300 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required
            className="w-full p-2 border border-gray-300 rounded-md" />
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required
            className="w-full p-2 border border-gray-300 rounded-md" />
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required
            className="w-full p-2 border border-gray-300 rounded-md" />
          <select name="role" value={form.role} onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md">
            <option value="Mentee">Mentee</option>
            <option value="Mentor">Mentor</option>
          </select>
          <button type="submit"
            className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
