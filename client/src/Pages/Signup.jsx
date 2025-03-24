import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="flex min-h-screen">
      {/* Left Side - Welcome Section */}
      <div className="w-1/3 bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-8 flex flex-col justify-center items-center">
        <h2 className="text-5xl font-extrabold mb-6 animate-slideIn">Join Us!</h2>
        <p className="text-lg mb-6 text-center">
          Create an account to start managing your events today. Stay organized, stay ahead!
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
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign Up</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSignUp}>
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="fullName">
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
              <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="email">
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
              <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="password">
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
              <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="confirm-password">
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
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-600">
                  I accept the{" "}
                  <a href="/terms" className="text-purple-600 hover:text-purple-700">
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