import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image from "../Assessts/files.png"

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    // Validate form
    if (!email || !password || !confirmPassword || !fullName) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!acceptTerms) {
      setError('You must accept the terms and conditions');
      return;
    }

    // Dummy sign-up logic (replace with real sign-up functionality)
    alert('Sign up successful');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen ">
      {/* Left Side Text */}
      <div className="w-1/3 bg-custom-blue text-white p-8 flex flex-col pt-48">
  <h2 className="text-5xl font-extrabold mb-6 animate-slideIn">Join Us!</h2>
  <p className="text-lg mb-6 text-justify leading-relaxed tracking-wide">
    Create an account to start managing your events today. Stay organized, stay ahead!
  </p>
  <p className="text-justify leading-relaxed tracking-wide">
    Already have an account? <a 
      href="/login" 
      className="font-extrabold text-white underline"
    >
       Login
    </a>
  </p>
  <img 
  src={image} 
  className="w-56 h-60 mt-12 rounded-lg rotate-animation "
/>



</div>



      {/* Right Side Signup Form */}
      <div className="flex justify-center items-center w-full bg-white rounded-lg">
        <div className="w-full max-w-xl border border-dashed p-12 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-600">I accept the terms and conditions</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-custom-blue text-white font-semibold rounded-lg hover:transition duration-200"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-custom-blue"
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
