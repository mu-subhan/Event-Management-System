import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
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
      <div className="hidden lg:flex w-full lg:w-1/3 bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-8 flex-col justify-center items-center">
        <h2 className="text-4xl font-bold mb-4 animate-slideIn">
          Welcome Back!
        </h2>
        <p className="text-lg mb-6 text-center">
          Please log in to manage your events and make them unforgettable!
        </p>
        <p className="text-center leading-relaxed tracking-wide">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-extrabold underline hover:text-purple-200 transition-colors duration-300"
          >
            Sign Up
          </a>
        </p>
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          className="w-full h-64 mt-8 rounded-lg object-cover shadow-lg"
          alt="Event Management Illustration"
        />
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
