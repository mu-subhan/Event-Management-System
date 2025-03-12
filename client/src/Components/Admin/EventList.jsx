import React from 'react';
import { Calendar, Clock, Check, AlertCircle } from 'lucide-react';

const EventList = () => {
  const events = [
    { id: 1, name: 'Community Cleanup', date: '2024-12-30', status: 'Ongoing', location: 'Central Park', volunteers: 12 },
    { id: 2, name: 'Food Bank Drive', date: '2024-12-31', status: 'Upcoming', location: 'Community Center', volunteers: 8 },
    { id: 3, name: 'Senior Home Visit', date: '2025-01-15', status: 'Upcoming', location: 'Sunshine Seniors', volunteers: 5 },
    { id: 4, name: 'Tree Planting Initiative', date: '2024-12-15', status: 'Completed', location: 'Riverside', volunteers: 20 },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Ongoing':
        return <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"><Clock size={12} className="mr-1" /> {status}</span>;
      case 'Upcoming':
        return <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800"><Calendar size={12} className="mr-1" /> {status}</span>;
      case 'Completed':
        return <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800"><Check size={12} className="mr-1" /> {status}</span>;
      default:
        return <span className="flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"><AlertCircle size={12} className="mr-1" /> {status}</span>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
    
      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Event Management</h2>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center">
              <span className="mr-2">+</span> Add Event
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volunteers</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{event.name}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-gray-600">{event.date}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-gray-600">{event.location}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-gray-600">{event.volunteers}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {getStatusBadge(event.status)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">Showing 4 of 4 events</div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border rounded bg-gray-50 text-gray-600">Previous</button>
              <button className="px-3 py-1 border rounded bg-indigo-600 text-white">1</button>
              <button className="px-3 py-1 border rounded bg-gray-50 text-gray-600">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
