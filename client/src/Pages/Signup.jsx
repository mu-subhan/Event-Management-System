import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const Signup = () => {
  // Static options for dropdowns
  const skillOptions = [
    "Frontend",
    "Backend",
    "DevOps",
    "UI/UX",
    "Cloud",
    "AI/ML",
    "Data Science",
    "Mobile Development",
    "Cybersecurity",
    "Blockchain",
    "Game Development",
    "Content Writing",
    "Digital Marketing",
    "Graphic Design",
    "SEO",
    "Project Management",
    "other"
  ];
  
  const interestOptions = [
    "Development", 
    "cricket", 
    "Outdoor", 
    "Management",
    "Design",
    "Music",
    "Art",
    "Sports",
    "other"
  ];

  // Get user data from Redux store
  const { user } = useSelector((state) => state.user);

  // Form state management
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    contactNumber: "",
    experienceYears: "",
    description: "",
    acceptTerms: false,
    skills: [],
    interest: [],
    avatar: null
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle navigation
  const navigate = useNavigate();

  /* ========== VALIDATION FUNCTIONS ========== */

  const validateFullName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    if (!name || !nameRegex.test(name)) {
      toast.error("Full Name should be 2-50 letters with no special characters.");
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const validatePassword = (password) => {
    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const validatePasswordMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const validateContactNumber = (number) => {
    // Pakistani mobile number pattern:
    // Accepts formats: +92XXXXXXXXXX, 92XXXXXXXXXX, 03XXXXXXXXX
    const numberRegex = /^(?:\+92|92|0)3[0-9]{9}$/;
  
    if (!numberRegex.test(number)) {
      toast.error("format of number 03XXXXXXXXX or +923XXXXXXXXX)");
      return false;
    }
  
    return true;
  };
  

  const validateExperienceYears = (years) => {
    const yearsNum = parseInt(years);
    if (isNaN(yearsNum)) {
      toast.error("Please enter a valid number for experience");
      return false;
    }
    if (yearsNum < 0 || yearsNum > 100) {
      toast.error("Experience must be between 0-100 years");
      return false;
    }
    return true;
  };

  const validateDescription = (description) => {
    if (!description || description.trim().length < 10) {
      toast.error("Description must be at least 10 characters");
      return false;
    }
    return true;
  };

  const validateSkills = (skills) => {
    if (skills.length === 0) {
      toast.error("Please select at least one skill");
      return false;
    }
    return true;
  };

  const validateInterests = (interests) => {
    if (interests.length === 0) {
      toast.error("Please select at least one interest");
      return false;
    }
    return true;
  };

  /* ========== FORM HANDLERS ========== */

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddSkill = (e) => {
    const selectedSkill = e.target.value;
    if (selectedSkill && !formData.skills.includes(selectedSkill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, selectedSkill],
      }));
    }
  };

  const handleAddInterest = (e) => {
    const selectedInterest = e.target.value;
    if (selectedInterest && !formData.interest.includes(selectedInterest)) {
      setFormData((prev) => ({
        ...prev,
        interest: [...prev.interest, selectedInterest],
      }));
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Basic file validation (optional)
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, or PNG files are allowed.");
      return;
    }
    
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB.");
      return;
    }
    
    setFormData(prev => ({ ...prev, avatar: file }));
    
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFile(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleRemoveInterest = (interestToRemove) => {
    setFormData(prev => ({
      ...prev,
      interest: prev.interest.filter(item => item !== interestToRemove)
    }));
  };

  /* ========== FORM SUBMISSION ========== */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
  
    // Validate all fields
    if (!validateFullName(formData.fullName)) {
      setIsSubmitting(false);
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setIsSubmitting(false);
      return;
    }
    
    if (!validatePassword(formData.password)) {
      setIsSubmitting(false);
      return;
    }
    
    if (!validatePasswordMatch(formData.password, formData.confirmPassword)) {
      setIsSubmitting(false);
      return;
    }
    
    if (!validateContactNumber(formData.contactNumber)) {
      setIsSubmitting(false);
      return;
    }
    
    if (!validateExperienceYears(formData.experienceYears)) {
      setIsSubmitting(false);
      return;
    }
    
    if (!validateDescription(formData.description)) {
      setIsSubmitting(false);
      return;
    }
    
    if (!validateSkills(formData.skills)) {
      setIsSubmitting(false);
      return;
    }
    
    if (!validateInterests(formData.interest)) {
      setIsSubmitting(false);
      return;
    }
    
    if (!formData.acceptTerms) {
      toast.error("Please accept the terms and conditions.");
      setIsSubmitting(false);
      return;
    }
  
    // Proceed with form submission
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("contactNumber", formData.contactNumber);
      formDataToSend.append("skills", JSON.stringify(formData.skills));
      formDataToSend.append("interests", JSON.stringify(formData.interest));
      formDataToSend.append("experienceYears", formData.experienceYears);
      formDataToSend.append("description", formData.description);
      
      // Only append avatar if it exists
      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar);
      }
  
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/user/create-user`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      if (data.success) {
        toast.success("Check your email to verify your account!");
        // Reset form
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          fullName: "",
          contactNumber: "",
          experienceYears: "",
          description: "",
          acceptTerms: false,
          skills: [],
          interest: [],
          avatar: null,
        });
        setFile(null);
        navigate('/login'); // Redirect to login after successful signup
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ========== RENDER COMPONENT ========== */

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
    
      {/* Left Panel (Visible on lg+) */}
<div className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:w-1/3 lg:fixed top-0 left-0 h-screen bg-gradient-to-br from-purple-700 to-indigo-800 text-white p-10 z-10 overflow-hidden">
  {/* Background pattern */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 w-full text-center">
    <div className="mb-8">
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      </div>
      <h2 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-white">
        Be the Change!
      </h2>
      <p className="text-lg text-purple-100 max-w-md mx-auto leading-relaxed">
        Join our growing community of passionate volunteers creating real impact.
      </p>
    </div>

    {/* Testimonials carousel */}
    <div className="my-8 px-6 py-4 bg-white/10 backdrop-blur-sm rounded-xl max-w-md mx-auto">
      
      <blockquote className="italic text-purple-50 text-sm">
        "Volunteering here changed my perspective on life. The community support is incredible!"
      </blockquote>
      <div className="flex justify-center mt-3">
        {[1, 2, 3].map((dot) => (
          <div key={dot} className={`w-2 h-2 mx-1 rounded-full ${dot === 1 ? 'bg-white' : 'bg-white/30'}`}></div>
        ))}
      </div>
    </div>
  </div>

  {/* Image with overlay */}
  <div className="relative z-10 w-full max-w-md mx-auto mt-8 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent"></div>
    <img
      src="https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      className="w-full h-auto object-cover"
      alt="Volunteers working together"
    />
    <div className="absolute bottom-0 left-0 p-6 text-white">
      <p className="text-sm font-medium">Together we can</p>
      <h3 className="text-xl font-bold">Make a difference</h3>
    </div>
  </div>

  {/* Footer */}
  <div className="relative z-10 mt-8 text-center">
    <p className="text-xs text-purple-200">
      Already part of our community?{' '}
      <a href="/login" className="font-semibold text-white hover:underline">
        Sign in here
      </a>
    </p>
  </div>
</div>

      {/* Right Panel */}
      <div className="w-full lg:ml-[33.3333%] flex justify-center items-center min-h-screen bg-gray-50 px-4 py-12">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-2xl p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Sign Up
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="mb-6">
              <label
                className="block text-lg font-medium text-gray-700 mb-2"
                htmlFor="fullName"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label
                className="block text-lg font-medium text-gray-700 mb-2"
                htmlFor="email"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                className="block text-lg font-medium text-gray-700 mb-2"
                htmlFor="password"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your password (min 6 characters)"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label
                className="block text-lg font-medium text-gray-700 mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Experience */}
            <div className="mb-6">
              <label
                className="block text-lg font-medium text-gray-700 mb-2"
                htmlFor="experienceYears"
              >
                Experience (Years) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="experienceYears"
                name="experienceYears"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Years of experience (0-100)"
                value={formData.experienceYears}
                onChange={handleInputChange}
                min="0"
                max="100"
                required
              />
            </div>

            {/* Contact Number */}
            <div className="mb-6">
              <label
                className="block text-lg font-medium text-gray-700 mb-2"
                htmlFor="contactNumber"
              >
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="10-15 digit phone number"
                value={formData.contactNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label
                className="block text-lg font-medium text-gray-700 mb-2"
                htmlFor="description"
              >
                About You <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Tell us about yourself (min 10 characters)"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                required
              ></textarea>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Skills <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm flex items-center"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <select
                onChange={handleAddSkill}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue=""
              >
                <option value="" disabled>-- Add a skill --</option>
                {skillOptions.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            {/* Interests */}
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Interests <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.interest.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm flex items-center"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(item)}
                      className="ml-2 text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <select
                onChange={handleAddInterest}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                defaultValue=""
              >
                <option value="" disabled>-- Add an interest --</option>
                {interestOptions.map((interest) => (
                  <option key={interest} value={interest}>
                    {interest}
                  </option>
                ))}
              </select>
            </div>

            {/* Avatar Upload - Now Optional */}
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Profile Picture
              </label>
              <div className="flex items-center">
                <div className="mr-4">
                  {file ? (
                    <img
                      src={file}
                      alt="Preview"
                      className="h-16 w-16 rounded-full object-cover border-2 border-gray-300"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="text-gray-500" />
                    </div>
                  )}
                </div>
                <label className="flex flex-col">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleFileInputChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-purple-50 file:text-purple-700
                      hover:file:bg-purple-100"
                  />
                  <span className="text-xs text-gray-500 mt-1">
                    JPEG or PNG (Max 2MB)
                  </span>
                </label>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  className="form-checkbox h-5 w-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  required
                />
                <span className="ml-2 text-sm text-gray-600">
                  I accept the{" "}
                  <a
                    href="/terms"
                    className="text-purple-600 hover:text-purple-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    terms and conditions
                  </a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full p-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-300"
              >
                Login Here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;