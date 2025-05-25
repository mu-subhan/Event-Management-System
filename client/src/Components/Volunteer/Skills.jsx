import React, { useState } from 'react';
import { FaPencilAlt, FaMicrophone, FaHandsHelping, FaPlus, FaChartLine, FaLightbulb, FaTimes, FaCheck, FaStar, FaCog, FaCertificate, FaAward } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInformation } from '../../redux/actions/user';
import { toast } from 'react-toastify';

const iconOptions = {
  star: { icon: <FaStar />, color: 'bg-yellow-100 text-yellow-600' },
  check: { icon: <FaCheck />, color: 'bg-green-100 text-green-600' },
  lightbulb: { icon: <FaLightbulb />, color: 'bg-blue-100 text-blue-600' },
  cog: { icon: <FaCog />, color: 'bg-purple-100 text-purple-600' },
  certificate: { icon: <FaCertificate />, color: 'bg-orange-100 text-orange-600' },
  award: { icon: <FaAward />, color: 'bg-red-100 text-red-600' }
};

const Skills = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [showForm, setShowForm] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: "", iconKey: "pencil" });
  const skills = user?.skills || [];

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkill.name) return;

    try {
      // Create a new array with the new skill
      const updatedSkills = [...skills, newSkill.name];
      
      // Update user information with new skills
      const result = await dispatch(updateUserInformation({ skills: updatedSkills }));
      
      if (result.success) {
        toast.success('Skill added successfully!');
        setNewSkill({ name: "", iconKey: "pencil" });
        setShowForm(false);
      } else {
        toast.error('Failed to add skill');
      }
    } catch (error) {
      toast.error('Error adding skill');
      console.error('Error adding skill:', error);
    }
  };

  const removeSkill = async (skillToRemove) => {
    try {
      // Filter out the skill to remove
      const updatedSkills = skills.filter(skill => skill !== skillToRemove);
      
      // Update user information with filtered skills
      const result = await dispatch(updateUserInformation({ skills: updatedSkills }));
      
      if (result.success) {
        toast.success('Skill removed successfully!');
      } else {
        toast.error('Failed to remove skill');
      }
    } catch (error) {
      toast.error('Error removing skill');
      console.error('Error removing skill:', error);
    }
  };

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
                <h2 className="text-2xl font-bold">Your Skills</h2>
                <p className="text-blue-100">Manage your volunteer skills</p>
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
                <form onSubmit={handleAddSkill} className="bg-blue-50 p-4 rounded-lg my-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Event Planning" 
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
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
          <div className="p-6">
            {skills.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full text-gray-400 mb-4">
                  <FaLightbulb size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-1">No skills added yet</h3>
                <p className="text-gray-500 mb-4">Add your first skill to get started!</p>
                <button 
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Skill
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <AnimatePresence>
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="group relative bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                          iconOptions[Object.keys(iconOptions)[index % Object.keys(iconOptions).length]].color
                        }`}>
                          {iconOptions[Object.keys(iconOptions)[index % Object.keys(iconOptions).length]].icon}
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">{skill}</span>
                          <div className="text-sm text-gray-500">Added to your profile</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => removeSkill(skill)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1 flex items-center gap-1"
                        >
                          <span className="text-sm">Remove</span>
                          <FaTimes size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;