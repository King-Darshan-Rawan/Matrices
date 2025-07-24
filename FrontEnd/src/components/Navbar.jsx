import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 shadow-sm flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">VoiceBridge</h1>
      <button
        onClick={() => navigate('/mentors')}
        className="py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600"
      >
        Find Mentors
      </button>
    </div>
  );
}

export default Navbar;