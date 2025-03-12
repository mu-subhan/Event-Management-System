import React from 'react';
import { FaPencilAlt, FaMicrophone, FaHandsHelping } from 'react-icons/fa';

const Skills = () => {
  const skills = [
    { name: "Event Planning", icon: <FaPencilAlt />, level: 85 },
    { name: "Fundraising", icon: <FaHandsHelping />, level: 70 },
    { name: "Public Speaking", icon: <FaMicrophone />, level: 60 }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 sm:text-lg md:text-xl">Your Skills</h2>
          <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full  font-medium hover:bg-blue-200 transition-colors sm:px-2 sm:py-1 text-xs">
            Add Skill
          </button>
        </div>
        
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div key={index} className="group shadow-md p-4 rounded-lg transition-all duration-300 hover:shadow-xl">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <span className="text-blue-500 mr-2 text-lg sm:text-base md:text-lg">{skill.icon}</span>
                  <span className="font-medium text-gray-700 text-base sm:text-sm md:text-base">{skill.name}</span>
                </div>
                <span className="text-sm text-gray-500 sm:text-xs md:text-sm">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full group-hover:bg-blue-500 transition-all duration-300"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 border-t border-gray-100 pt-5">
          <p className="text-gray-600 text-sm mb-4 sm:text-xs md:text-sm">Match your skills with volunteer opportunities that need your talents.</p>
          <button className="w-full py-2 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors sm:py-1.5 sm:text-sm md:py-2 md:text-base">
            Skills Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Skills;
