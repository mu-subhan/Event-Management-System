import axios from "axios";
import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUserFriends,
  FaImage,
  FaClock,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import ConfirmDeleteModal from "../Shared/ConfirmDeleteModal";
import "react-toastify/dist/ReactToastify.css";

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
    maxVolunteers: 1,
  });
  const [skill, setSkill] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [showError, setShowError] = useState(false);

  // const handleChange = (e) => {
  //   const { name, value, type, files } = e.target;
  //   if (type === "file") {
  //     setEventData({ ...eventData, [name]: files[0] });
  //   } else {
  //     setEventData({ ...eventData, [name]: value });
  //   }
  // };
  // ...existing code...

  const [eventImages, setEventImages] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log("New files selected:", files); // Log new files

    if (eventImages.length + files.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }

    console.log("Current eventImages before append:", eventImages); // Log current state

    setEventImages([...eventImages, ...files]);

    // Optional: Log the expected new state (React state updates are async)
    console.log("Expected new state:", [...eventImages, ...files]);
  };
  const handleDeleteClick = (index) => {
    setImageToDelete(index);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (imageToDelete !== null) {
      setEventImages((prev) => prev.filter((_, i) => i !== imageToDelete));
      setImageToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setImageToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const getGridCols = () => {
    const count = eventImages.length;
    if (count === 0) return "grid-cols-1";
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-1 sm:grid-cols-2";
    if (count === 3) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
    if (count === 4)
      return "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4";
    if (count >= 5)
      return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "startTime" || name === "endTime") {
      const currentTime = new Date();
      const newTime = new Date(value);

      // Prepare what the new start and end times would be after this change
      const updatedStart =
        name === "startTime" ? newTime : new Date(eventData.startTime);
      const updatedEnd =
        name === "endTime" ? newTime : new Date(eventData.endTime);

      // Only validate if both are set and valid
      if (
        updatedStart instanceof Date &&
        !isNaN(updatedStart) &&
        updatedEnd instanceof Date &&
        !isNaN(updatedEnd)
      ) {
        // Both times must be in the future
        if (updatedStart <= currentTime) {
          toast.error("Start time must be greater than the current time.");
          return;
        }
        if (updatedEnd <= currentTime) {
          toast.error("End time must be greater than the current time.");
          return;
        }
        // End time must be after start time
        if (updatedEnd <= updatedStart) {
          toast.error("End time must be after start time.");
          return;
        }
        // Difference must be at least 1 hour (3600000 ms)
        if (updatedEnd - updatedStart < 3600000) {
          toast.error("End time must be at least 1 hour after start time.");
          return;
        }
      }
    }

    // Handling file input separately
    if (type === "file") {
      setEventData({ ...eventData, [name]: files[0] });
    } else {
      setEventData({ ...eventData, [name]: value });
    }
  };
  // ...existing code...
  const validateStep = () => {
    console.log("current step: ", currentStep);
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
    console.log("validate next steo run !");
    if (validateStep()) {
      setShowError(false);
      setTimeout(() => {
        nextStep();
      }, 0);
    } else {
      setShowError(true);
      toast.error("Please fill all required fields");
    }
  };

  const handleAddRole = (e) => {
    e.preventDefault();
    try {
      if (
        !eventRole ||
        !eventRole.role_name ||
        !eventRole.description ||
        !eventRole.maxVolunteers
      ) {
        toast.error("Please fill all required fields to add role");
        setShowError(true);
        return;
      }

      if (
        eventData?.roles?.some((role) => role.role_name === eventRole.role_name)
      ) {
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
        maxVolunteers: 1,
      });
      setSkill("");

      setShowError(false);
      toast.success("Role added successfully!");
    } catch (error) {
      toast.error("Error adding role");
      console.error("Error:", error);
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = [...eventRole.skills];
    updatedSkills.splice(index, 1);
    setEventRole({ ...eventRole, skills: updatedSkills });
  };

  const handleRemoveRole = (index) => {
    const updatedRoles = [...eventData?.roles];
    updatedRoles.splice(index, 1);
    setEventData({ ...eventData, roles: updatedRoles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle Submit Run !");
    if (!validateStep()) {
      setShowError(true);
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
    console.log("payload is: ", payload);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/event/create-event`,
        payload,
        { withCredentials: true }
      );
      console.log("data of craete event is: ", data);
      if (data.success) {
        toast.success("Event created successfully!");
        setEventData({
          eventName: "",
          eventDate: "",
          startTime: "",
          endTime: "",
          location: "",
          maxVolunteers: "",
          eventDescription: "",
          eventImage: [],
          eventType: "community",
          roles: null,
          testval: null,
        });
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
    <div className="flex min-h-screen bg-gray-50 items-center justify-center p-2 sm:p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl mx-2 sm:mx-4"
      >
        <div className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg overflow-hidden border border-gray-100">
          {/* Form Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Create New Volunteer Event
            </h2>
            <p className="text-indigo-600 text-sm sm:text-base mt-1">
              Follow the steps to set up your event
            </p>

            {/* Progress Bar */}
            <div className="mt-4 sm:mt-6">
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <span className="text-xs sm:text-sm font-medium text-gray-600">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-xs sm:text-sm font-medium text-indigo-600">
                  {currentStep === 1
                    ? "Basic Information"
                    : currentStep === 2
                    ? "Event Details"
                    : "Volunteer Roles"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
                <div
                  className="bg-indigo-600 h-2 sm:h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Event Title<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="eventName"
                    value={eventData.eventName}
                    onChange={handleChange}
                    className={`w-full p-2 sm:p-3 border ${
                      !eventData.eventName && showError
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md sm:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                    placeholder="Enter event name"
                    required
                  />
                  {!eventData.eventName && showError && (
                    <p className="mt-1 text-xs sm:text-sm text-red-600">
                      Event title is required
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Start Time<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <FaCalendarAlt className="text-sm sm:text-base" />
                      </div>
                      <input
                        type="datetime-local"
                        name="startTime"
                        value={eventData.startTime}
                        onChange={handleChange}
                        className={`w-full pl-9 sm:pl-10 p-2 sm:p-3 border ${
                          !eventData.startTime && showError
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md sm:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                        required
                      />
                      {!eventData.startTime && showError && (
                        <p className="mt-1 text-xs sm:text-sm text-red-600">
                          Start time is required
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      End Time<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <FaCalendarAlt className="text-sm sm:text-base" />
                      </div>
                      <input
                        type="datetime-local"
                        name="endTime"
                        value={eventData.endTime}
                        onChange={handleChange}
                        className={`w-full pl-9 sm:pl-10 p-2 sm:p-3 border ${
                          !eventData.endTime && showError
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md sm:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                        required
                      />
                      {!eventData.endTime && showError && (
                        <p className="mt-1 text-xs sm:text-sm text-red-600">
                          End time is required
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Event Details */}
            {currentStep === 2 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Location<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <FaMapMarkerAlt className="text-sm sm:text-base" />
                    </div>
                    <input
                      type="text"
                      name="location"
                      value={eventData.location}
                      onChange={handleChange}
                      className={`w-full pl-9 sm:pl-10 p-2 sm:p-3 border ${
                        !eventData.location && showError
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md sm:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                      placeholder="Enter location"
                      required
                    />
                  </div>
                  {!eventData.location && showError && (
                    <p className="mt-1 text-xs sm:text-sm text-red-600">
                      Location is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Description<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="eventDescription"
                    value={eventData.eventDescription}
                    onChange={handleChange}
                    rows="3"
                    className={`w-full p-2 sm:p-3 border ${
                      !eventData.eventDescription && showError
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md sm:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                    placeholder="Describe the event and volunteer expectations"
                    required
                  ></textarea>
                  {!eventData.eventDescription && showError && (
                    <p className="mt-1 text-xs sm:text-sm text-red-600">
                      Description is required
                    </p>
                  )}
                </div>

                {/* image */}
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Event Images
                </label>

                <div className="mt-1 flex justify-center px-4 pt-4 pb-5 sm:px-6 sm:pt-5 sm:pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-400 transition-colors">
                  <div className="space-y-2 text-center">
                    <FaImage className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />

                    {eventImages.length < 5 && (
                      <label className="relative cursor-pointer bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm font-medium text-indigo-600 transition-colors inline-block">
                        <span>
                          {eventImages.length === 0
                            ? "Upload Image"
                            : "Add More Images"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          multiple={true}
                          onChange={handleImageChange}
                        />
                      </label>
                    )}

                    <div className={`grid ${getGridCols()} gap-4 mt-4 w-full`}>
                      {eventImages.map((image, index) => (
                        <div
                          key={index}
                          className="group aspect-[4/3] relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 animate-fadeIn"
                        >
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Event image ${index + 1}`}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                            style={{ height: "220px" }}
                          />

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteClick(index)}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600 transform hover:scale-110"
                            aria-label="Delete image"
                          >
                            <FaTrash />
                          </button>

                          {/* Image Index */}
                          <span className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
                            {index + 1}/{eventImages.length}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Confirm Delete Modal */}
                    <ConfirmDeleteModal
                      isOpen={isDeleteModalOpen}
                      onClose={cancelDelete}
                      onConfirm={confirmDelete}
                    />

                    {eventImages.length >= 5 && (
                      <p className="text-sm text-red-500">
                        Maximum 5 images allowed
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Volunteer Roles */}
            {currentStep === 3 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Role Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={eventRole.role_name}
                    onChange={(e) =>
                      setEventRole({ ...eventRole, role_name: e.target.value })
                    }
                    className={`w-full p-2 sm:p-3 border ${
                      !eventRole.role_name && showError
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md sm:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                    placeholder="e.g. Event Coordinator"
                  />
                  {!eventRole.role_name && showError && (
                    <p className="mt-1 text-xs sm:text-sm text-red-600">
                      Role name is required
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Max Volunteers
                    <span className="text-red-500">* (Minimum 1)</span>
                  </label>
                  <input
                    type="number"
                    name="role"
                    value={eventRole.maxVolunteers}
                    min={1}
                    onChange={(e) =>
                      setEventRole({
                        ...eventRole,
                        maxVolunteers: Number(e.target.value),
                      })
                    }
                    className={`w-full p-2 sm:p-3 border ${
                      !eventRole.maxVolunteers && showError
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md sm:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                    placeholder="e.g. Event Coordinator"
                  />
                  {!eventRole.maxVolunteers && showError && (
                    <p className="mt-1 text-xs sm:text-sm text-red-600">
                      Max Volunteer
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Required Skills
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                      className="flex-1 p-2 sm:p-3 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      placeholder="Add required skills (press Enter to add)"
                    />
                    <motion.button
                      type="button"
                      onClick={handleAddSkill}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-md sm:rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                    >
                      Add
                    </motion.button>
                  </div>
                  {eventRole.skills.length > 0 && (
                    <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-2">
                      {eventRole.skills.map((skill, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="inline-flex items-center bg-indigo-100 text-indigo-800 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="ml-1 sm:ml-2 text-indigo-600 hover:text-indigo-800"
                          >
                            &times;
                          </button>
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Role Description<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={eventRole.description}
                    onChange={(e) =>
                      setEventRole({
                        ...eventRole,
                        description: e.target.value,
                      })
                    }
                    rows="3"
                    className={`w-full p-2 sm:p-3 border ${
                      !eventRole.description && showError
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md sm:rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all`}
                    placeholder="Describe the role responsibilities"
                  ></textarea>
                  {!eventRole.description && showError && (
                    <p className="mt-1 text-xs sm:text-sm text-red-600">
                      Role description is required
                    </p>
                  )}
                </div>

                <div className="flex justify-center">
                  <motion.button
                    type="button"
                    onClick={handleAddRole}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 sm:px-6 sm:py-2 bg-indigo-600 text-white rounded-md sm:rounded-lg hover:bg-indigo-700 transition-colors shadow-md text-sm sm:text-base"
                  >
                    Add Role
                  </motion.button>
                </div>

                {eventData.roles?.length > 0 ? (
                  <div className="mt-4 sm:mt-6">
                    <h3 className="text-base sm:text-lg font-medium text-gray-800 mb-2 sm:mb-3">
                      Added Roles ({eventData.roles.length})
                    </h3>
                    <div className="grid grid-cols-1 gap-2 sm:gap-3 sm:grid-cols-2">
                      {eventData.roles.map((role, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border border-gray-200 rounded-md sm:rounded-lg p-2 sm:p-3 hover:border-indigo-300 transition-colors relative group bg-white shadow-sm"
                        >
                          <h4 className="font-medium text-indigo-700 text-sm sm:text-base">
                            {role.role_name}
                          </h4>
                          {role.skills.length > 0 && (
                            <div className="mt-1 flex flex-wrap gap-1">
                              {role.skills.map((skill, i) => (
                                <span
                                  key={i}
                                  className="text-xs bg-indigo-50 text-indigo-700 px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveRole(index)}
                            className="absolute top-1 right-1 sm:top-2 sm:right-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <X size={14} className="sm:size-[16px]" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  showError && (
                    <p className="text-xs sm:text-sm text-red-600 text-center">
                      Please add at least one role
                    </p>
                  )
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-gray-200">
              {currentStep > 1 ? (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 sm:px-5 sm:py-2.5 border border-gray-300 rounded-md sm:rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
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
                  className="px-4 py-2 sm:px-5 sm:py-2.5 bg-indigo-600 text-white rounded-md sm:rounded-lg hover:bg-indigo-700 transition-colors shadow-md text-sm sm:text-base"
                >
                  Continue
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 sm:px-5 sm:py-2.5 bg-indigo-600 text-white rounded-md sm:rounded-lg hover:bg-indigo-700 transition-colors shadow-md text-sm sm:text-base"
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
