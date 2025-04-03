import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
  // static values
  const skillOptions = [
    "Frontend",
    "Backend",
    "DevOps",
    "UI/UX",
    "Cloud",
    "AI/ML",
  ];
  const interestOptions = ["Development", "cricket", "Outdoor", "Management"];
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [interest, setInterest] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experienceYears, setExperienceYears] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [file, setFile] = useState(null);
  const [description, setdescription] = useState(null);
  const [contactNumber, setcontactNumber] = useState(null);

  const handleAddSkill = (event) => {
    const selectedSkill = event.target.value;
    if (selectedSkill && !skills.includes(selectedSkill)) {
      setSkills([...skills, selectedSkill]);
    }
  };
  const handleAddInterest = (event) => {
    const selectedInterest = event.target.value;
    if (selectedInterest && !interest.includes(selectedInterest)) {
      setInterest([...interest, selectedInterest]);
    }
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFile(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation Check
    if (!fullName || !email || !password || !confirmPassword || !acceptTerms) {
      toast.error("Fill All Required Fields!");
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Creating FormData
    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("contactNumber", contactNumber); // You may need to add a field for this
    formData.append("skills", JSON.stringify(skills)); // Send as JSON string
    formData.append("interests", JSON.stringify(interest)); // Send as JSON string
    formData.append("experienceYears", experienceYears || 0);
    formData.append("description", description); // If applicable
    if (avatar) {
      formData.append("avatar", avatar); // File upload
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/user/create-user`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (data.success) {
        toast.success("Check You Email to Verify!");
        // Reset States after successful submission
        setFullName("");
        setFile(null);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAcceptTerms(false);
        setError("");
        setInterest([]);
        setSkills([]);
        setExperienceYears(null);
        setAvatar(null);
      } else {
        toast.error("Provide Valid Credentials to Create Account");
        setError("Plss Provide Valid Credentials TO create Account");
      }
    } catch (error) {
      toast.error(error.message);
      console.error("API Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Welcome Section */}
      <div className="w-1/3 bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-8 flex flex-col justify-center items-center">
        <h2 className="text-5xl font-extrabold mb-6 animate-slideIn">
          Join Us!
        </h2>
        <p className="text-lg mb-6 text-center">
          Create an account to start managing your events today. Stay organized,
          stay ahead!
        </p>
        <p className="text-center leading-relaxed tracking-wide">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-extrabold underline hover:text-purple-200 transition-colors duration-300"
          >
            Login
          </a>
        </p>
        <div className="w-full">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            className="w-50 h-50 mt-12  object-cover shadow-lg"
            alt="Event Management Illustration"
          />
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex justify-center items-center w-2/3 bg-gray-50">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-2xl p-12 transform transition-all duration-500 hover:shadow-3xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Sign Up
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                className="block text-lg font-medium text-gray-700 mb-2"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-lg font-medium text-gray-700 mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-lg font-medium text-gray-700 mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-lg font-medium text-gray-700 mb-2"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-lg font-medium text-gray-700 mb-2"
                htmlFor="experience-years"
              >
                Expereince in Years
              </label>
              <input
                type="number"
                id="experience-years"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="experience in years"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                min={0}
                max={100}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-lg font-medium text-gray-700 mb-2"
                htmlFor="contact-number"
              >
                Contact Number
              </label>
              <input
                type="number"
                id="experience-years"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="contact number with country code"
                value={contactNumber}
                onChange={(e) => setcontactNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-lg font-medium text-gray-700 mb-2"
                htmlFor="description"
              >
                description
              </label>
              <input
                type="text"
                id="description"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Write Description About YourSelf"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                required
              />
            </div>

            {/* skills set select drop down */}
            <div className="w-full max-w-md mx-auto mt-10">
              <label className="block text-lg font-semibold mb-2">
                Select Skills:
              </label>
              <div className="mt-4">
                {/* <label className="block text-lg font-semibold mb-2">
                  Selected Skills:
                </label> */}
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              {/* Dropdown */}
              <select
                onChange={handleAddSkill}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Choose a skill --</option>
                {skillOptions.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>

              {/* Selected Skills Display */}
            </div>
            {/* intereset drop down */}
            <div className="w-full max-w-md mx-auto mt-10">
              <label className="block text-lg font-semibold mb-2">
                Select ineterest:
              </label>
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {interest.map((interestopt, index) => (
                    <span
                      key={index}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      {interestopt}
                    </span>
                  ))}
                </div>
              </div>
              {/* Dropdown */}
              <select
                onChange={handleAddInterest}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Choose a Interest --</option>
                {interestOptions.map((interest) => (
                  <option key={interest} value={interest}>
                    {interest}
                  </option>
                ))}
              </select>

              {/* Selected Skills Display */}
            </div>
            {/* Avatar */}
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {file ? (
                    <img
                      src={file}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <User />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="file"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            <div className="mb-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-600">
                  I accept the{" "}
                  <a
                    href="/terms"
                    className="text-purple-600 hover:text-purple-700"
                  >
                    terms and conditions
                  </a>
                </span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-300"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
