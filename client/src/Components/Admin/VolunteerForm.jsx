// import React, { useState, useEffect } from 'react';

// const VolunteerForm = ({ volunteer, onSave, onCancel }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     role: '',
//     hours: 0,
//     events: 0,
//     status: 'Active'
//   });

//   useEffect(() => {
//     if (volunteer) {
//       setFormData({
//         name: volunteer.name,
//         role: volunteer.role,
//         hours: volunteer.hours,
//         events: volunteer.events,
//         status: volunteer.status
//       });
//     }
//   }, [volunteer]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name === 'hours' || name === 'events' ? parseInt(value) || 0 : value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="px-6 py-4">
//       <div className="mb-4">
//         <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//           Name
//         </label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           required
//         />
//       </div>
      
//       <div className="mb-4">
//         <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
//           Role
//         </label>
//         <input
//           type="text"
//           id="role"
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           required
//         />
//       </div>
      
//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <div>
//           <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">
//             Hours
//           </label>
//           <input
//             type="number"
//             id="hours"
//             name="hours"
//             value={formData.hours}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             min="0"
//           />
//         </div>
        
//         <div>
//           <label htmlFor="events" className="block text-sm font-medium text-gray-700 mb-1">
//             Events
//           </label>
//           <input
//             type="number"
//             id="events"
//             name="events"
//             value={formData.events}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             min="0"
//           />
//         </div>
//       </div>
      
//       <div className="mb-6">
//         <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
//           Status
//         </label>
//         <select
//           id="status"
//           name="status"
//           value={formData.status}
//           onChange={handleChange}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//         >
//           <option value="Active">Active</option>
//           <option value="Inactive">Inactive</option>
//         </select>
//       </div>
      
//       <div className="flex justify-end space-x-3">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           Save
//         </button>
//       </div>
//     </form>
//   );
// };

// export default VolunteerForm;