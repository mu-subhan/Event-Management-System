import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Community Clean-Up",
      date: "Mar 15, 2025",
      time: "9:00 AM - 12:00 PM",
      location: "Riverside Park",
      participants: 18,
      image: "https://images.unsplash.com/photo-1507679799987-7379421150e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
    },
    {
      id: 2,
      title: "Charity Fundraiser Gala",
      date: "Mar 22, 2025",
      time: "6:00 PM - 10:00 PM",
      location: "Community Center",
      participants: 35,
      image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 3,
      title: "Food Bank Volunteer Day",
      date: "Mar 29, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "Downtown Food Bank",
      participants: 12,
      image: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-2xl rounded-2xl p-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
            <p className="text-gray-600 mt-1">Find your next volunteering opportunity</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            View All <FaArrowRight className="ml-1" />
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {events.map(event => (
            <motion.div
              key={event.id}
              whileHover={{ y: -5 }}
              className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-xl text-gray-900 mb-2">{event.title}</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">{event.date}</p>
                      <p className="text-xs">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-blue-500" />
                    <p className="text-sm font-medium">{event.location}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaUsers className="text-blue-500" />
                    <p className="text-sm font-medium">{event.participants} participants</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full mt-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
                >
                  Request to Join 
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;