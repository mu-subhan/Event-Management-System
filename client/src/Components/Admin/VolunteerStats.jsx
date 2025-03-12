import React from 'react';
import { UserCheck, UserPlus, Clock, Award } from 'lucide-react';

const VolunteerStats = () => {
  const volunteers = [
    { id: 1, name: 'Sarah Johnson', role: 'Event Organizer', hours: 24, events: 5, status: 'Active' },
    { id: 2, name: 'Michael Chen', role: 'Cleanup Crew', hours: 18, events: 4, status: 'Active' },
    { id: 3, name: 'Jessica Williams', role: 'Food Distribution', hours: 12, events: 3, status: 'Active' },
    { id: 4, name: 'David Rodriguez', role: 'Event Organizer', hours: 8, events: 2, status: 'Inactive' },
    { id: 5, name: 'Emma Thompson', role: 'Cleanup Crew', hours: 16, events: 3, status: 'Active' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Main Content */}
      <div className="flex-1 ml-64 p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100">
                  <UserCheck size={24} className="text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Active Volunteers</p>
                  <p className="text-2xl font-bold">86</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100">
                  <UserPlus size={24} className="text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">New This Month</p>
                  <p className="text-2xl font-bold">15</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100">
                  <Clock size={24} className="text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Total Hours</p>
                  <p className="text-2xl font-bold">1,456</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100">
                  <Award size={24} className="text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Avg. Events</p>
                  <p className="text-2xl font-bold">3.2</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Top Volunteers</h2>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md">
                Add Volunteer
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volunteer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Events</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {volunteers.map((volunteer) => (
                    <tr key={volunteer.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{volunteer.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{volunteer.role}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{volunteer.hours}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{volunteer.events}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            volunteer.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {volunteer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-500">Showing 5 of 86 volunteers</div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 border rounded bg-gray-50 text-gray-600">Previous</button>
                <button className="px-3 py-1 border rounded bg-indigo-600 text-white">1</button>
                <button className="px-3 py-1 border rounded bg-gray-50 text-gray-600">2</button>
                <button className="px-3 py-1 border rounded bg-gray-50 text-gray-600">3</button>
                <button className="px-3 py-1 border rounded bg-gray-50 text-gray-600">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerStats;
