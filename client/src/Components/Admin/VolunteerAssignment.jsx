import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown, FiUser, FiCheck, FiX } from "react-icons/fi";

const VolunteerAssignment = ({ role, volunteers, onAssign }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  // Filter volunteers based on search term and skills match
  const filteredVolunteers = volunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         volunteer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const hasMatchingSkills = role.skills.some(skill => 
      volunteer.skills.includes(skill)
    );
    
    return matchesSearch;
  }).sort((a, b) => {
    // Sort by number of matching skills (descending)
    const aMatches = a.skills.filter(s => role.skills.includes(s)).length;
    const bMatches = b.skills.filter(s => role.skills.includes(s)).length;
    return bMatches - aMatches;
  });

  const handleAssign = (volunteer) => {
    setSelectedVolunteer(volunteer);
    onAssign(volunteer.id);
    setIsOpen(false);
  };

  const handleRemove = () => {
    setSelectedVolunteer(null);
    onAssign(null);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-3 rounded-lg border ${
          selectedVolunteer 
            ? "border-green-500 bg-green-50" 
            : "border-gray-300 hover:border-gray-400"
        } transition-colors`}
      >
        <div className="flex items-center">
          {selectedVolunteer ? (
            <>
              <img 
                src={selectedVolunteer.profilePic} 
                alt={selectedVolunteer.name}
                className="w-8 h-8 rounded-full mr-3"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{selectedVolunteer.name}</p>
                <p className="text-xs text-gray-500">{selectedVolunteer.email}</p>
              </div>
            </>
          ) : (
            <span className="text-gray-500">Select Volunteer</span>
          )}
        </div>
        <FiChevronDown className={`transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
      </button>

      {selectedVolunteer && (
        <button
          onClick={handleRemove}
          className="absolute right-10 top-3 p-1 text-gray-500 hover:text-red-500"
        >
          <FiX />
        </button>
      )}

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto"
        >
          <div className="p-3 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search volunteers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {filteredVolunteers.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredVolunteers.map(volunteer => {
                const matchingSkills = volunteer.skills.filter(skill => 
                  role.skills.includes(skill)
                );
                const nonMatchingSkills = volunteer.skills.filter(skill => 
                  !role.skills.includes(skill)
                );

                return (
                  <li 
                    key={volunteer.id}
                    className={`p-3 hover:bg-gray-50 cursor-pointer ${
                      selectedVolunteer?.id === volunteer.id ? "bg-blue-50" : ""
                    }`}
                    onClick={() => handleAssign(volunteer)}
                  >
                    <div className="flex items-start">
                      <img 
                        src={volunteer.profilePic} 
                        alt={volunteer.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-gray-900">{volunteer.name}</h4>
                          {selectedVolunteer?.id === volunteer.id && (
                            <FiCheck className="text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{volunteer.email}</p>
                        
                        <div className="space-y-1">
                          {matchingSkills.length > 0 && (
                            <div>
                              <span className="text-xs font-medium text-green-700">Matching Skills:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {matchingSkills.map((skill, i) => (
                                  <span key={`match-${i}`} className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {nonMatchingSkills.length > 0 && (
                            <div>
                              <span className="text-xs font-medium text-gray-700">Other Skills:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {nonMatchingSkills.map((skill, i) => (
                                  <span key={`nonmatch-${i}`} className="px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded-full">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No volunteers found
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default VolunteerAssignment;