import React from 'react';
import { Users, TrendingUp, AlertTriangle, ChevronRight, Plus } from 'lucide-react';

const RoleSuggestionPanel = () => {
  const suggestions = [
    { id: 1, role: 'Event Organizer', volunteers: 5, urgency: 'Medium', assigned: 2 },
    { id: 2, role: 'Cleanup Crew', volunteers: 8, urgency: 'High', assigned: 3 },
    { id: 3, role: 'Food Distribution', volunteers: 4, urgency: 'Low', assigned: 4 },
  ];

  const getUrgencyStyles = (urgency) => {
    switch(urgency) {
      case 'High':
        return { icon: <AlertTriangle size={14} />, color: 'bg-red-100 text-red-600' };
      case 'Medium':
        return { icon: <TrendingUp size={14} />, color: 'bg-amber-100 text-amber-600' };
      case 'Low':
        return { icon: <Users size={14} />, color: 'bg-emerald-100 text-emerald-600' };
      default:
        return { icon: null, color: '' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
      {/* Main Card */}
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
        {/* Card Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Role Suggestions</h2>
            <p className="text-sm text-gray-500 mt-1">Based on your event requirements</p>
          </div>
          <button className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
            View all <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
        
        {/* Suggestions List */}
        <div className="divide-y divide-gray-100">
          {suggestions.map((suggestion) => {
            const urgency = getUrgencyStyles(suggestion.urgency);
            const progressPercentage = Math.min(100, (suggestion.assigned / suggestion.volunteers) * 100);
            
            return (
              <div 
                key={suggestion.id} 
                className="p-5 hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{suggestion.role}</h3>
                    <div className="flex items-center mt-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${urgency.color}`}>
                        {urgency.icon}
                        <span className="ml-1">{suggestion.urgency}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-500">
                      {suggestion.assigned}/{suggestion.volunteers}
                    </span>
                    <span className="block text-xs text-gray-400 mt-1">volunteers</span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 transition-all duration-500 ease-out" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="mt-4 flex space-x-3">
                  <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all">
                    <Plus size={16} className="mr-2" />
                    Assign Volunteers
                  </button>
                  <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all">
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Card Footer */}
        <div className="px-6 py-4 bg-gray-50 text-center border-t border-gray-100">
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
            + Add Custom Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSuggestionPanel;