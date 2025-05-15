import React, { useState } from 'react';
import { FaPencilAlt, FaMicrophone, FaHandsHelping, FaPlus, FaChartLine, FaLightbulb } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const iconOptions = {
  pencil: { icon: <FaPencilAlt />, color: 'bg-purple-100 text-purple-600' },
  mic: { icon: <FaMicrophone />, color: 'bg-blue-100 text-blue-600' },
  hands: { icon: <FaHandsHelping />, color: 'bg-green-100 text-green-600' },
  chart: { icon: <FaChartLine />, color: 'bg-yellow-100 text-yellow-600' },
  bulb: { icon: <FaLightbulb />, color: 'bg-orange-100 text-orange-600' }
};

const Skills = () => {
  const [skills, setSkills] = useState([
    { id: 1, name: "Event Planning", iconKey: "pencil", level: 85 },
    { id: 2, name: "Fundraising", iconKey: "hands", level: 70 },
    { id: 3, name: "Public Speaking", iconKey: "mic", level: 60 }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: "", level: "", iconKey: "pencil" });
  const [activeTab, setActiveTab] = useState('all');

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.name || !newSkill.level || isNaN(newSkill.level)) return;
    
    const newId = Math.max(...skills.map(s => s.id), 0) + 1;
    setSkills([
      ...skills,
      { 
        id: newId,
        name: newSkill.name, 
        level: parseInt(newSkill.level), 
        iconKey: newSkill.iconKey 
      }
    ]);
    setNewSkill({ name: "", level: "", iconKey: "pencil" });
    setShowForm(false);
  };

  const removeSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const filteredSkills = activeTab === 'all' 
    ? skills 
    : skills.filter(skill => 
        activeTab === 'advanced' ? skill.level >= 70 :
        activeTab === 'intermediate' ? skill.level >= 40 && skill.level < 70 :
        skill.level < 40
      );

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold">Your Skills Portfolio</h2>
                <p className="text-blue-100">Showcase and manage your volunteer skills</p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full font-medium transition-all"
              >
                <FaPlus /> {showForm ? 'Cancel' : 'Add Skill'}
              </motion.button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="px-6 pt-4">
            <div className="flex overflow-x-auto pb-2">
              {['all', 'advanced', 'intermediate', 'beginner'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 mr-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                    activeTab === tab 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab !== 'all' && (
                    <span className="ml-1 bg-white bg-opacity-50 px-1.5 py-0.5 rounded-full text-xs">
                      {skills.filter(s => 
                        tab === 'advanced' ? s.level >= 70 :
                        tab === 'intermediate' ? s.level >= 40 && s.level < 70 :
                        tab === 'beginner' ? s.level < 40 : false
                      ).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Add Skill Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 overflow-hidden"
              >
                <form onSubmit={handleAddSkill} className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Skill</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Graphic Design" 
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency Level</label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={newSkill.level}
                          onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                          className="w-full"
                        />
                        <span className="text-sm font-medium w-12 text-center">
                          {newSkill.level || 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Icon</label>
                    <div className="flex flex-wrap gap-3">
                      {Object.keys(iconOptions).map((key) => (
                        <button
                          type="button"
                          key={key}
                          onClick={() => setNewSkill({ ...newSkill, iconKey: key })}
                          className={`w-12 h-12 flex items-center justify-center rounded-full text-xl transition-all ${
                            iconOptions[key].color
                          } ${
                            newSkill.iconKey === key ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                          }`}
                        >
                          {iconOptions[key].icon}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                    >
                      Add Skill
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skills List */}
          <div className="px-6 pb-6">
            {filteredSkills.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full text-gray-400 mb-4">
                  <FaLightbulb size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">
                  {activeTab === 'all' ? 'No skills added yet' : `No ${activeTab} skills`}
                </h3>
                <p className="text-gray-500 mb-4">
                  {activeTab === 'all' 
                    ? 'Add your first skill to get started!' 
                    : `You don't have any ${activeTab} level skills yet`}
                </p>
                <button 
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Skill
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {filteredSkills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="group relative bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all"
                    >
                      <button 
                        onClick={() => removeSkill(skill.id)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        ×
                      </button>
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 flex items-center justify-center rounded-xl text-xl ${iconOptions[skill.iconKey].color}`}>
                          {iconOptions[skill.iconKey].icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{skill.name}</h3>
                          <div className="mt-2">
                            <div className="flex justify-between text-sm text-gray-500 mb-1">
                              <span>Proficiency</span>
                              <span>{skill.level}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  skill.level >= 70 ? 'bg-green-500' :
                                  skill.level >= 40 ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`}
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="border-t border-gray-200 px-6 py-5 bg-gray-50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="font-medium text-gray-900">Ready to put your skills to work?</h3>
                <p className="text-sm text-gray-600">Find volunteer opportunities that match your expertise</p>
              </div>
              {/* <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
              >
                Browse Opportunities
              </motion.button> */}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;