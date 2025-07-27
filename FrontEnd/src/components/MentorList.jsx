import React, { useState } from 'react';
import mentors from '../data/mentors.json';

function MentorList() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMentors = mentors.filter((mentor) =>
    mentor.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleConnect = (mentorName) => {
    console.log(`Connecting with ${mentorName}`);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Find Mentors</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
        placeholder="Search by skill..."
      />
      <div className="flex flex-col gap-4">
        {filteredMentors.map((mentor) => (
          <div key={mentor.id} className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800">{mentor.name}</h2>
            <p className="text-sm text-gray-600">Skills: {mentor.skills.join(', ')}</p>
            <p className="text-sm text-gray-600">Language: {mentor.language}</p>
            <button
              onClick={() => handleConnect(mentor.name)}
              className="mt-3 w-full py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MentorList;