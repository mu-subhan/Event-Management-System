import React from 'react';

const RoleSuggestionPanel = () => {
  const suggestions = [
    { id: 1, role: 'Event Organizer', volunteers: 5 },
    { id: 2, role: 'Cleanup Crew', volunteers: 8 },
    { id: 3, role: 'Food Distribution', volunteers: 4 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Role Suggestions</h2>
      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="p-4 border border-gray-200 rounded-md">
            <h3 className="text-lg font-semibold">{suggestion.role}</h3>
            <p className="text-gray-600">Suggested Volunteers: {suggestion.volunteers}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleSuggestionPanel;
