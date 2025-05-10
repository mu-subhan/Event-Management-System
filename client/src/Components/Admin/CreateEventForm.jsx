import axios from "axios";
import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserFriends,
  FaImage,
  FaClock,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const CreateEventForm = () => {
  // states
  const [eventData, setEventData] = useState({
    eventName: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    location: "",
    maxVolunteers: "",
    eventDescription: "",
    eventImage: null,
    eventType: "community",
    roles: null,
    testval: null,
  });

  const [eventRole, setEventRole] = useState({
    role_name: "",
    skills: [],
    description: "",
  });
  const [skill, setSkill] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setEventData({ ...eventData, [name]: files[0] });
    } else {
      setEventData({ ...eventData, [name]: value });
    }
  };

  const validateStep = () => {
    setShowError(true);
    
    if (currentStep === 1) {
      return eventData.eventName && eventData.startTime && eventData.endTime;
    }
    
    if (currentStep === 2) {
      return eventData.location && eventData.eventDescription;
    }
    
    if (currentStep === 3) {
      return eventData.roles?.length > 0;
    }
    
    return true;
  };

  const validateAndNextStep = () => {
    if (validateStep()) {
      setShowError(false);
      nextStep();
    } else {
      toast.error("Please fill all required fields");
    }
  };

  const handleAddRole = (e) => {
    e.preventDefault();
    try {
      if (
        !eventRole ||
        !eventRole.role_name ||
        !eventRole.description
      ) {
        toast.error("Please fill all required fields to add role");
        setShowError(true);
        return;
      }

      if (eventData?.roles?.some(role => role.role_name === eventRole.role_name)) {
        toast.error("Role already exists!");
        return;
      }

      setEventData((prev) => {
        const newRoles = prev?.roles ? [...prev.roles, eventRole] : [eventRole];
        return {
          ...prev,
          roles: newRoles,
        };
      });
      
      setEventRole({
        role_name: "",
        skills: [],
        description: "",
      });
      setSkill("");
    } catch (error) {
      toast.error("Error adding role");
      console.error("Error:", error);
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = [...eventRole.skills];
    updatedSkills.splice(index, 1);
    setEventRole({...eventRole, skills: updatedSkills});
  };

  const handleRemoveRole = (index) => {
    const updatedRoles = [...eventData?.roles];
    updatedRoles.splice(index, 1);
    setEventData({ ...eventData, roles: updatedRoles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep()) {
      toast.error("Please fill all required fields");
      return;
    }

    const payload = {
      title: eventData.eventName,
      description: eventData.eventDescription,
      startTime: eventData.startTime,
      endTime: eventData.endTime,
      location: eventData.location,
      role: eventData?.roles,
    };

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/event/create-event`,
        payload,
        { withCredentials: true }
      );
      
      if (data.success) {
        toast.success("Event created successfully!");
      } else {
        toast.error("Error creating event");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error creating event");
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleAddSkill = () => {
    if (!skill) {
      toast.error("Please enter a valid skill");
      return;
    }
    if (eventRole.skills.includes(skill)) {
      toast.error("Skill already added");
      return;
    }

    setEventRole((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
    setSkill("");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 items-center justify-center p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl"
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          {/* Form Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
            <h2 className="text-2xl font-bold text-gray-800">
              Create New Volunteer Event
            </h2>
            <p className="text-indigo-600 mt-1">
              Follow the steps to set up your event
            </p>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm font-medium text-indigo-600">
                  {currentStep === 1
                    ? "Basic Information"
                    : currentStep === 2
                    ? "Event Details"
                    : "Volunteer Roles"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Title<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="eventName"
                    value={eventData.eventName}
                    onChange={handleChange}
                    className={`w-full p-3 border ${
                      !eventData.eventName && showError ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                    placeholder="Enter event name"
                    required
                  />
                  {!eventData.eventName && showError && (
                    <p className="mt-1 text-sm text-red-600">Event title is required</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Time<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <FaCalendarAlt />
                      </div>
                      <input
                        type="datetime-local"
                        name="startTime"
                        value={eventData.startTime}
                        onChange={handleChange}
                        className={`w-full pl-10 p-3 border ${
                          !eventData.startTime && showError ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                        required
                      />
                      {!eventData.startTime && showError && (
                        <p className="mt-1 text-sm text-red-600">Start time is required</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Time<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <FaCalendarAlt />
                      </div>
                      <input
                        type="datetime-local"
                        name="endTime"
                        value={eventData.endTime}
                        onChange={handleChange}
                        className={`w-full pl-10 p-3 border ${
                          !eventData.endTime && showError ? 'border-red-500' : 'border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                        required
                      />
                      {!eventData.endTime && showError && (
                        <p className="mt-1 text-sm text-red-600">End time is required</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Event Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <FaMapMarkerAlt />
                    </div>
                    <input
                      type="text"
                      name="location"
                      value={eventData.location}
                      onChange={handleChange}
                      className={`w-full pl-10 p-3 border ${
                        !eventData.location && showError ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                      placeholder="Enter location"
                      required
                    />
                  </div>
                  {!eventData.location && showError && (
                    <p className="mt-1 text-sm text-red-600">Location is required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Volunteers
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <FaUserFriends />
                    </div>
                    <input
                      type="number"
                      name="maxVolunteers"
                      value={eventData.maxVolunteers}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      placeholder="Leave blank for unlimited"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="eventDescription"
                    value={eventData.eventDescription}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full p-3 border ${
                      !eventData.eventDescription && showError ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                    placeholder="Describe the event and volunteer expectations"
                    required
                  ></textarea>
                  {!eventData.eventDescription && showError && (
                    <p className="mt-1 text-sm text-red-600">Description is required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-400 transition-colors">
                    <div className="space-y-1 text-center">
                      <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label className="relative cursor-pointer bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-md text-sm font-medium text-indigo-600 transition-colors">
                          <span>Upload Image</span>
                          <input
                            type="file"
                            name="eventImage"
                            className="sr-only"
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                      {eventData.eventImage && (
                        <div className="mt-2">
                          <img
                            src={URL.createObjectURL(eventData.eventImage)}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg mx-auto"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Volunteer Roles */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={eventRole.role_name}
                    onChange={(e) => setEventRole({...eventRole, role_name: e.target.value})}
                    className={`w-full p-3 border ${
                      !eventRole.role_name && showError ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                    placeholder="e.g. Event Coordinator"
                    required
                  />
                  {!eventRole.role_name && showError && (
                    <p className="mt-1 text-sm text-red-600">Role name is required</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Skills
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      placeholder="Add required skills (press Enter to add)"
                    />
                    <motion.button
                      type="button"
                      onClick={handleAddSkill}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                    >
                      Add
                    </motion.button>
                  </div>
                  {eventRole.skills.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {eventRole.skills.map((skill, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="inline-flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="ml-2 text-indigo-600 hover:text-indigo-800"
                          >
                            &times;
                          </button>
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role Description<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={eventRole.description}
                    onChange={(e) => setEventRole({...eventRole, description: e.target.value})}
                    rows="3"
                    className={`w-full p-3 border ${
                      !eventRole.description && showError ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                    placeholder="Describe the role responsibilities"
                    required
                  ></textarea>
                  {!eventRole.description && showError && (
                    <p className="mt-1 text-sm text-red-600">Role description is required</p>
                  )}
                </div>

                <div className="flex justify-center">
                  <motion.button
                    type="button"
                    onClick={handleAddRole}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                  >
                    Add Role
                  </motion.button>
                </div>

                {eventData.roles?.length > 0 ? (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">
                      Added Roles ({eventData.roles.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {eventData.roles.map((role, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border border-gray-200 rounded-lg p-3 hover:border-indigo-300 transition-colors relative group bg-white shadow-sm"
                        >
                          <h4 className="font-medium text-indigo-700">{role.role_name}</h4>
                          {role.skills.length > 0 && (
                            <div className="mt-1 flex flex-wrap gap-1">
                              {role.skills.map((skill, i) => (
                                <span
                                  key={i}
                                  className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveRole(index)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <X size={16} />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : showError && (
                  <p className="text-sm text-red-600 text-center">Please add at least one role</p>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-5 border-t border-gray-200">
              {currentStep > 1 ? (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back
                </motion.button>
              ) : (
                <div></div>
              )}

              {currentStep < totalSteps ? (
                <motion.button
                  type="button"
                  onClick={validateAndNextStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                >
                  Continue
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                >
                  Create Event
                </motion.button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateEventForm;