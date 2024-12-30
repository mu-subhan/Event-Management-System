import React from 'react';

const Skills = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Your Skills</h2>
      <div className="space-y-4">
        <p className="text-lg">Event Planning</p>
        <p className="text-lg">Fundraising</p>
        <p className="text-lg">Public Speaking</p>
        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add Skill</button>
      </div>
    </div>
  );
};

export default Skills;
