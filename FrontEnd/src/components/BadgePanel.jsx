import React from 'react';

function BadgePanel({ user }) {
  const streak = 3;
  const messageCount = 15;
  const badges = ['🏅 First Chat', '🏅 Active Learner'];

  return (
    <div className="w-full md:w-64 bg-white p-4 border-l border-gray-300">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Progress</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">Mentor</p>
          <p className="text-base font-medium text-gray-800">{user?.role === 'mentee' ? 'Dr. Patel' : 'N/A'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Daily Streak</p>
          <p className="text-base font-medium text-orange-500">🔥 {streak} days</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Messages Sent</p>
          <p className="text-base font-medium text-orange-500">{messageCount}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Badges</p>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BadgePanel;