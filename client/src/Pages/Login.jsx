import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loaduser } from "../redux/actions/user";
const Login = () => {
  const dispatch = useDispatch();

  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        setError("Please fill all fields");
        return;
      }
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/user/login-user`,
        { email, password },
        { withCredentials: true }
      );
      if (data.success === true) {
        await dispatch(loaduser());
        if (data?.user?.role === "Admin") {
          navigate("/admin/dashboard");
        } else if (data?.user?.role === "Volunteer") {
          navigate("/volunteer/dashboard");
        }
        console.log("  :", data);
        toast.success("Login Successfully!");
      } else {
        toast.error("Invalid Credentials!");
      }
    } catch (error) {
      const message = error?.response?.data?.message;
      toast.error(message || "Internal Server Failure");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
     {/* Left Side - Visible only on large screens */}
<div className="hidden lg:flex lg:w-1/3 flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-purple-700 to-indigo-800 text-white p-12">
  {/* Decorative elements */}
  <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-purple-500/20"></div>
  <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-indigo-500/20"></div>
  
  {/* Content container */}
  <div className="relative z-10 w-full max-w-md text-center space-y-6">
    {/* Animated welcome text */}
    <div className="space-y-4 animate-fadeIn">
      <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>
      <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-white">
        Welcome Back!
      </h2>
      <p className="text-lg text-purple-100/90">
        Sign in to access your personalized event dashboard and create memorable experiences.
      </p>
    </div>

    {/* Features list */}
    {/* <div className="py-6 px-8 bg-white/5 backdrop-blur-sm rounded-xl text-left space-y-3 border border-white/10">
      <div className="flex items-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-300">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span className="text-purple-50">Manage all your events in one place</span>
      </div>
      <div className="flex items-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-300">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span className="text-purple-50">Track attendee engagement</span>
      </div>
      <div className="flex items-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-300">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span className="text-purple-50">Get real-time notifications</span>
      </div>
    </div> */}

    {/* Sign up prompt */}
    <div className="pt-4">
      <p className="text-purple-100">
        Don't have an account?{' '}
        <a href="/signup" className="font-semibold text-white hover:text-purple-200 transition-colors duration-200 underline underline-offset-4">
          Join our community
        </a>
      </p>
    </div>

    {/* Image at bottom */}
    <div className="mt-8 w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      <img
        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        className="w-full h-48 object-cover"
        alt="Event attendees enjoying"
      />
      <div className="bg-gradient-to-r from-purple-600/80 to-indigo-700/80 p-4 text-center">
        <p className="text-sm font-medium text-white/90">"The best events start with great planning"</p>
      </div>
    </div>
  </div>
</div>

      {/* Right Side - Login Form */}
      <div className="flex w-full lg:w-2/3 bg-gray-50 min-h-screen items-center justify-center">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-2xl p-8 sm:p-12 transform transition-all duration-500 hover:shadow-3xl">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Login
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleLogin} className="my-8">
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-300"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
