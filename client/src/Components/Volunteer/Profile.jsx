import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaClock, FaFileAlt, FaSave, FaTimes, FaTools } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInformation, loaduser } from '../../redux/actions/user';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    experienceYears: 0,
    description: "",
    skills: []
  });

  const [editData, setEditData] = useState({ ...profile });

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return "Name is required";
    if (name.length < 2) return "Name must be at least 2 characters long";
    if (name.length > 50) return "Name must be less than 50 characters";
    if (!/^[a-zA-Z\s]*$/.test(name)) return "Name can only contain letters and spaces";
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format";
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) return "Phone number is required";
    const phoneRegex = /^(\+92[-\s]?|0)3\d{2}[-\s]?\d{7}$/;
    if (!phoneRegex.test(phone)) return "Invalid phone number format. Accepted formats: 03001234567, 0300 1234567, 0300-1234567, +92 3001234567, +92-3001234567, +923001234567";
    return "";
  };

  const validateExperienceYears = (years) => {
    const numYears = parseInt(years);
    if (isNaN(numYears)) return "Experience years must be a number";
    if (numYears < 0) return "Experience years cannot be negative";
    if (numYears > 50) return "Experience years seems too high";
    return "";
  };

  const validateDescription = (description) => {
    if (description.length > 500) return "Description must be less than 500 characters";
    return "";
  };

  const validateSkills = (skills) => {
    if (skills.length === 0) return "At least one skill is required";
    if (skills.some(skill => !skill.trim())) return "Skills cannot be empty";
    if (skills.some(skill => skill.length > 30)) return "Skill name too long";
    return "";
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {
      name: validateName(editData.name),
      email: validateEmail(editData.email),
      phone: validatePhone(editData.phone),
      experienceYears: validateExperienceYears(editData.experienceYears),
      description: validateDescription(editData.description),
      skills: validateSkills(editData.skills)
    };

    // Filter out empty error messages
    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, value]) => value !== "")
    );

    setErrors(filteredErrors);
    return Object.keys(filteredErrors).length === 0;
  };

  // Load user data when component mounts
  useEffect(() => {
    dispatch(loaduser());
  }, [dispatch]);

  // Update profile state when user data changes
  useEffect(() => {
    if (user) {
      const newProfile = {
        name: user.name || "",
        email: user.email || "",
        phone: user.contactNumber || "",
        experienceYears: user.experienceYears || 0,
        description: user.description || "",
        skills: user.skills || ["Web Development", "Project Management", "Communication"]
      };
      setProfile(newProfile);
      setEditData(newProfile);
    }
  }, [user]);

  const handleEdit = () => {
    setEditData({ ...profile });
    setErrors({});
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // Validate form before saving
      if (!validateForm()) {
        toast.error('Please fix the validation errors');
        return;
      }

      // Transform the data to match the backend schema
      const updateData = {
        name: editData.name,
        email: editData.email,
        contactNumber: editData.phone,
        skills: editData.skills.filter(skill => skill.trim() !== ""),
        experienceYears: parseInt(editData.experienceYears) || 0,
        description: editData.description || "",
        interests: user?.interests || []
      };

      console.log("Sending update data:", updateData);
      
      // Dispatch the update action
      const result = await dispatch(updateUserInformation(updateData));
      
      if (result?.error) {
        throw new Error(result.error);
      }
      
      // Update local state
      setProfile({ ...editData });
      setIsEditing(false);
      setErrors({});
      
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error?.message || 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    setEditData({ ...profile });
    setErrors({});
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...editData.skills];
    newSkills[index] = value;
    setEditData(prev => ({
      ...prev,
      skills: newSkills
    }));

    // Clear skills error when user modifies skills
    if (errors.skills) {
      setErrors(prev => ({
        ...prev,
        skills: ""
      }));
    }
  };

  const addSkill = () => {
    setEditData(prev => ({
      ...prev,
      skills: [...prev.skills, ""]
    }));
  };

  const removeSkill = (index) => {
    setEditData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  // Error message component
  const ErrorMessage = ({ error }) => {
    return error ? (
      <p className="text-red-500 text-xs mt-1">{error}</p>
    ) : null;
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      {isLoading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading profile...</p>
        </div>
      ) : (
        <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-2xl transition-all duration-300 hover:shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Your Profile</h2>
            {!isEditing ? (
              <button 
                onClick={handleEdit}
                className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
              >
                Edit
              </button>
            ) : (
              <div className="flex space-x-2">
                <button 
                  onClick={handleSave}
                  className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium hover:bg-green-200 transition-colors flex items-center"
                >
                  <FaSave className="mr-1" /> Save
                </button>
                <button 
                  onClick={handleCancel}
                  className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium hover:bg-red-200 transition-colors flex items-center"
                >
                  <FaTimes className="mr-1" /> Cancel
                </button>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-6 mb-6 shadow-xl p-4 rounded-lg">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold overflow-hidden border-4 border-white shadow-md">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`font-bold text-xl text-gray-800 w-full p-1 border-b ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:outline-none`}
                  />
                  <ErrorMessage error={errors.name} />
                </div>
              ) : (
                <>
                  <h3 className="font-bold text-xl text-gray-800">{profile.name}</h3>
                  <p className="text-blue-600 font-medium">Volunteer since {new Date(user?.createdAt).getFullYear()}</p>
                  <div className="mt-2 flex items-center">
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">Available</span>
                    <span className="ml-2 bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">5★ Rating</span>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="space-y-4 text-gray-600 mt-6">
            <div className="flex items-center shadow-md p-4 rounded-lg">
              <FaEnvelope className="w-5 h-5 mr-3 text-blue-500" />
              <div className="flex-1">
                <span>{profile.email}</span>
                {isEditing && <ErrorMessage error={errors.email} />}
              </div>
            </div>
            
            <div className="flex items-center shadow-md p-4 rounded-lg">
              <FaPhone className="w-5 h-5 mr-3 text-blue-500" />
              <div className="flex-1">
                {isEditing ? (
                  <>
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={`w-full p-1 border-b ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:outline-none`}
                      placeholder="Enter phone number"
                    />
                    <ErrorMessage error={errors.phone} />
                  </>
                ) : (
                  <span>{profile.phone}</span>
                )}
              </div>
            </div>

            <div className="flex items-center shadow-md p-4 rounded-lg">
              <FaClock className="w-5 h-5 mr-3 text-blue-500" />
              <div className="flex-1">
                {isEditing ? (
                  <>
                    <input
                      type="number"
                      min="0"
                      value={editData.experienceYears}
                      onChange={(e) => handleChange('experienceYears', e.target.value)}
                      className={`w-full p-1 border-b ${errors.experienceYears ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:outline-none`}
                      placeholder="Years of experience"
                    />
                    <ErrorMessage error={errors.experienceYears} />
                  </>
                ) : (
                  <span>{profile.experienceYears} {profile.experienceYears === 1 ? 'year' : 'years'} of experience</span>
                )}
              </div>
            </div>

            <div className="flex shadow-md p-4 rounded-lg">
              <FaFileAlt className="w-5 h-5 mr-3 text-blue-500 mt-1" />
              <div className="flex-1">
                {isEditing ? (
                  <>
                    <textarea
                      value={editData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      className={`w-full p-2 border rounded-lg ${errors.description ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:outline-none min-h-[100px]`}
                      placeholder="Tell us about yourself..."
                    />
                    <div className="flex justify-between items-center mt-1">
                      <ErrorMessage error={errors.description} />
                      <span className="text-xs text-gray-500">
                        {editData.description.length}/500 characters
                      </span>
                    </div>
                  </>
                ) : (
                  <p className="whitespace-pre-wrap">{profile.description || "No description provided."}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center mb-4">
              <FaTools className="w-5 h-5 mr-2 text-blue-500" />
              <h4 className="font-medium text-gray-700">Skills</h4>
            </div>
            {isEditing ? (
              <div className="space-y-2">
                {editData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleSkillChange(index, e.target.value)}
                      className={`flex-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm ${errors.skills ? 'border-red-500' : 'border-blue-200'} border focus:outline-none focus:border-blue-500`}
                      placeholder="Enter a skill..."
                    />
                    <button 
                      onClick={() => removeSkill(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Remove skill"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <ErrorMessage error={errors.skills} />
                <button 
                  onClick={addSkill}
                  className="mt-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors flex items-center gap-1"
                >
                  <FaTools className="w-3 h-3" /> Add Skill
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {skill}
                  </span>
                ))}
                {profile.skills.length === 0 && (
                  <p className="text-gray-500 italic">No skills added yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;