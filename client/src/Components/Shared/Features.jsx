// Features.js
import React from 'react';

const featuresData = [
  {
    title: 'Event Creation and Management',
    description: 'Admins can easily create, edit, and manage events with details like title, date, time, and description.',
    icon: '📅',
  },
  {
    title: 'Role Suggestion for Events',
    description: 'Automated role suggestions based on event type, with options for predefined and custom roles.',
    icon: '💼',
  },
  {
    title: 'Volunteer Registration and Profiles',
    description: 'Volunteers can register and create profiles, highlighting their skills, interests, and availability.',
    icon: '👤',
  },
  {
    title: 'Machine Learning-Based Matching',
    description: 'Intelligent matching of volunteers to roles based on their skills, interests, and past activities.',
    icon: '🤖',
  },
  {
    title: 'Notifications and Alerts',
    description: 'Email and SMS notifications for event updates, role assignments, and important announcements.',
    icon: '🔔',
  },
  {
    title: 'Mobile-Responsive Design',
    description: 'Optimized for mobile and tablet devices, ensuring seamless use on any screen size.',
    icon: '📱',
  },
  {
    title: 'Secure and Scalable',
    description: 'Role-based access and scalable architecture for managing multiple events and users securely.',
    icon: '🔒',
  },
];

const Features = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Key Features</h2>
        <p className="text-gray-900 mb-12">
          Discover how our platform simplifies event management and volunteer matching.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 text-left hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
