import React from 'react';
import { Users, TrendingUp, AlertTriangle } from 'lucide-react';

const RoleSuggestionPanel = () => {
  const suggestions = [
    { id: 1, role: 'Event Organizer', volunteers: 5, urgency: 'Medium', assigned: 2 },
    { id: 2, role: 'Cleanup Crew', volunteers: 8, urgency: 'High', assigned: 3 },
    { id: 3, role: 'Food Distribution', volunteers: 4, urgency: 'Low', assigned: 4 },
  ];

  const getUrgencyIcon = (urgency) => {
    switch(urgency) {
      case 'High':
        return <AlertTriangle size={16} className="text-red-500" />;
      case 'Medium':
        return <TrendingUp size={16} className="text-yellow-500" />;
      case 'Low':
        return <Users size={16} className="text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {/* Main Content (Card) */}
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Role Suggestions</h2>
          <button className="text-indigo-600 hover:text-indigo-800 text-sm">View All</button>
        </div>
        
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div 
              key={suggestion.id} 
              className="p-4 border border-gray-200 rounded-md hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold text-gray-800">{suggestion.role}</h3>
                <div className="flex items-center">
                  {getUrgencyIcon(suggestion.urgency)}
                  <span className="ml-1 text-sm text-gray-500">{suggestion.urgency}</span>
                </div>
              </div>
              
              <div className="mt-2 flex justify-between items-center">
                <div className="text-gray-600">
                  <span className="font-medium">{suggestion.assigned}/{suggestion.volunteers}</span> volunteers assigned
                </div>
                
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full" 
                    style={{ width: `${(suggestion.assigned / suggestion.volunteers) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <button className="mt-3 w-full py-1 px-3 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition">
                Assign Volunteers
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSuggestionPanel;
