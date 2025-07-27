const dummyRequests = [
  { id: 1, name: 'Mentee A', skill: 'React' },
  { id: 2, name: 'Mentee B', skill: 'Python' },
];

function Requests() {
  const handleAction = (id, accepted) => {
    console.log(`${accepted ? 'Accepted' : 'Rejected'} request from ID: ${id}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Connection Requests</h2>
      <div className="space-y-4">
        {dummyRequests.map((req) => (
          <div key={req.id} className="p-4 bg-white rounded shadow border border-gray-200">
            <h3 className="text-lg font-medium">{req.name}</h3>
            <p className="text-sm text-gray-600">Skill: {req.skill}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleAction(req.id, true)}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Accept
              </button>
              <button
                onClick={() => handleAction(req.id, false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Requests;