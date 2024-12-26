import React from 'react';

const EventList = () => {
  const events = [
    { id: 1, name: 'Community Cleanup', date: '2024-12-30', status: 'Ongoing' },
    { id: 2, name: 'Food Bank Drive', date: '2024-12-31', status: 'Upcoming' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Event List</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Event Name</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id} className="border-t">
              <td className="px-4 py-2">{event.name}</td>
              <td className="px-4 py-2">{event.date}</td>
              <td className="px-4 py-2">{event.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;
