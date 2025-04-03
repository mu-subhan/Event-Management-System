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
// icons
import { X } from "lucide-react";

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

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    console.log("name :", name, " value : ", value);
    if (type === "file") {
      setEventData({ ...eventData, [name]: files[0] });
    } else {
      setEventData({ ...eventData, [name]: value });
    }
  };

  const handleAddRole = (e) => {
    e.preventDefault();
    try {
      if (
        !eventRole ||
        !eventRole.role_name ||
        eventRole.skills.length === 0 ||
        !eventRole.description
      ) {
        toast.error("Pls Fill All Required Field TO Add Role");
        return;
      }

      // roles.forEach((value,index)=>{
      for (let i = 0; i < eventData?.roles?.length; i++) {
        if (eventData?.roles[i].role_name == eventRole?.role_name) {
          toast.error("Role Already Exist!");
          return;
        }
      }
      setEventData((prev) => {
        const newRoles = prev?.roles ? [...prev.roles, eventRole] : [eventRole];
        return {
          ...prev,
          roles: newRoles, // Update the roles array with the new role
        };
      });
      setEventRole({
        role_name: "",
        skills: [],
        description: "",
      });
    } catch (error) {
      toast.error("Event Role Not Contain valid Value!");
      console.log("error is :", error);
      return;
    }
  };

  const handleRoleChange = (index, field, value) => {
    const updatedRoles = [...eventData.requiredRoles];
    updatedRoles[index][field] = value;
    setEventData({ ...eventData, requiredRoles: updatedRoles });
  };

  const handleRemoveRole = (index) => {
    console.log("hanlde remove role run");
    const updatedRoles = [...eventData?.roles];
    updatedRoles.splice(index, 1);
    // console.log("")
    setEventData({ ...eventData, roles: updatedRoles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Event Created:", eventData);
    // start
    // Validate required fields
    if (
      !eventData.eventName ||
      !eventData.eventDescription ||
      !eventData.startTime ||
      !eventData.endTime ||
      !eventData.location
    ) {
      console.error("Please fill in all required fields.");
      return;
    }

    // Prepare the payload
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
      console.log("response is: ", data);
      if (data.success) {
        toast.success("Event Registered Successfully!");
        return;
      } else {
        toast.error("Error Registering An Event!");
        return;
      }
      // Handle success (e.g., clear form, show message, etc.)
    } catch (error) {
      console.error(
        "Error Creating Event:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data
          ? error.message
          : "Internal Problem During Registering an event"
      );
      // Handle error (e.g., show error message to user)
    }

    // end

    // Logic to save the event, maybe API call or state update
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  const handleAddSkill = async () => {
    console.log("handle add skilss run");
    if (!skill) {
      toast.error("Pls Add A Valid Skill");
      return;
    }
    if (eventRole.skills.includes(skill)) {
      toast.error("Skill Already Added pls Add Another One!");
      return;
    }

    setEventRole((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
  };
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content Area */}
      <div className="flex-1 ml-64 p-6">
        <div className="bg-white rounded-xl shadow-lg max-w-4xl mx-auto">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">
              Create New Event
            </h2>
            <p className="text-gray-600 mt-1">
              Fill out the form below to create a new volunteer event
            </p>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {currentStep === 1
                    ? "Basic Information"
                    : currentStep === 2
                    ? "Event Details"
                    : "Volunteer Roles"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title*
                  </label>
                  <input
                    type="text"
                    name="eventName"
                    value={eventData.eventName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter a descriptive name for your event"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Start Time*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCalendarAlt className="text-gray-400" />
                      </div>
                      <input
                        type="datetime-local"
                        name="startTime"
                        value={eventData.startTime}
                        onChange={handleChange}
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event End Time*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCalendarAlt className="text-gray-400" />
                      </div>
                      <input
                        type="datetime-local"
                        name="endTime"
                        value={eventData.endTime}
                        onChange={handleChange}
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaClock className="text-gray-400" />
                      </div>
                      <input
                        type="time"
                        name="startTime"
                        value={eventData.startTime}
                        onChange={handleChange}
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div> */}

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaClock className="text-gray-400" />
                      </div>
                      <input
                        type="time"
                        name="endTime"
                        value={eventData.endTime}
                        onChange={handleChange}
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div> */}
                </div>
              </div>
            )}

            {/* Step 2: Event Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="location"
                      value={eventData.location}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter the event location"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Volunteers
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUserFriends className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="maxVolunteers"
                      value={eventData.maxVolunteers}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Maximum number of volunteers needed"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Leave blank for unlimited volunteers
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Description*
                  </label>
                  <textarea
                    name="eventDescription"
                    value={eventData.eventDescription}
                    onChange={handleChange}
                    rows="5"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Provide details about the event, what volunteers should expect, and what impact they'll make"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    <div className="space-y-1 text-center">
                      <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="eventImage"
                          className="relative cursor-pointer bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg text-sm font-medium text-blue-600"
                        >
                          <span>Upload Image</span>
                          <input
                            id="eventImage"
                            name="eventImage"
                            type="file"
                            className="sr-only"
                            onChange={handleChange}
                          />
                        </label>
                      </div>
                      {eventData.eventImage && (
                        <div className="mt-2">
                          <img
                            src={URL.createObjectURL(eventData.eventImage)}
                            alt="Event"
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* step3: Add Roles */}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="text-gray-400" />
                    </div>
                    {/* <input
                      type="text"
                      name="role"
                      value={eventRole.role_name}
                      onChange={(e) => {
                        setEventRole({
                          ...eventRole,
                          role_name: e.target.value,
                        });
                        // console.log("eventRole: ", eventRole);
                      }}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter the Role Name e.g Software Engineer"
                      required
                    /> */}
                    <input
                      type="text"
                      name="role"
                      value={eventRole.role_name} // Make sure to set the controlled value
                      onChange={(e) => {
                        setEventRole((prev) => ({
                          ...prev,
                          role_name: e.target.value,
                        }));
                      }}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter the Role Name e.g Software Engineer"
                    />
                  </div>
                </div>

                <div className="mt-4 relative">
                  <label className="block text-lg font-semibold mb-2">
                    Selected Skills:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {eventRole.skills.map((value, index) => (
                      <span
                        key={index}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="w-full max-w-md mx-auto mt-10 relative">
                  <label className="block text-lg font-semibold mb-2">
                    Add SKills
                  </label>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <span
                      className=" text-3xl font-bold"
                      onClick={() => handleAddSkill()}
                    >
                      +
                    </span>
                  </div>
                  <input
                    type="text"
                    name="skill"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the Role Name e.g Software Engineer"
                  />

                  {/* Selected Skills Display */}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role Description*
                  </label>
                  <textarea
                    name="eventDescription"
                    value={eventRole.description}
                    onChange={(e) =>
                      setEventRole((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows="5"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Provide details about the event, what volunteers should expect, and what impact they'll make"
                  ></textarea>
                </div>

                <div className="flex w-full">
                  {eventData?.roles?.length > 0 &&
                    eventData?.roles.map((value, index) => {
                      return (
                        <span
                          className="bg-slate-300 rounded flex"
                          onClick={() => handleRemoveRole(index)}
                          key={index}
                        >
                          {value?.role_name}
                          <X />
                        </span>
                      );
                    })}
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    onClick={(e) => handleAddRole(e)}
                  >
                    Add Role
                  </button>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            </div>

            {/* Submit Button */}
            {currentStep === totalSteps && (
              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Create Event
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventForm;
