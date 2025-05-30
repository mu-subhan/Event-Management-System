import React, { useState, useEffect, useRef } from "react";
import profile from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
// custom packages
import {
  FaUserShield,
  FaHandsHelping,
  FaPeopleCarry,
  FaHandHoldingHeart,
  FaUsers,
  FaRegHandshake,
} from "react-icons/fa";
import { toast } from "react-toastify";

// redux
import { loaduser, logoutUser } from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const Navbar = ({ scroll = true }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate(); // For navigation
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);
  // Toggle dropdown menu visibility
  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(false); // Close the dropdown if clicked outside
      }
    };

    // Add event listener for outside click
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // Load User UseEffect
  useEffect(() => {
    if (user == null) dispatch(loaduser());
  }, []);
  // Add scroll event listener on component mount
  useEffect(() => {
    if (scroll) {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else setScrolled(true);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Redirect based on role
  const handleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin/login"); // Redirect to Admin Login
    } else if (role === "volunteer") {
      navigate("/login"); // Redirect to Volunteer Login
    }
  };
  // logout handler
  const logoutHandler = async () => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/api/user/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Logout SUccessfully!");
          dispatch(logoutUser());
        } else {
          toast.error("Error During Logout!");
        }
      })
      .catch((error) => {
        console.log("Something Went Wrong", error);
      });
  };

  // Function to get icon color based on scroll state
  const getIconColors = () => {
    return {
      primary: scrolled ? "text-purple-600" : "text-purple-400",
      secondary: scrolled ? "text-indigo-500" : "text-purple-300",
      highlight: scrolled ? "text-purple-700" : "text-white",
    };
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              {/* Option 1: Dual Icon Design */}
              {/* <div className="relative flex items-center">
                <FaHandsHelping 
                  className={`h-8 w-8 ${getIconColors().primary} transition-all duration-300 transform group-hover:scale-110`} 
                />
                <FaUsers 
                  className={`h-5 w-5 ${getIconColors().secondary} absolute -bottom-1 -right-1 transition-all duration-300`} 
                />
              </div> */}

              {/* Option 2: Single Elegant Icon */}
              <FaRegHandshake
                className={`h-9 w-9 ${
                  getIconColors().primary
                } transition-all duration-300 transform group-hover:rotate-12`}
              />

              {/* Option 3: Community Focus Icon */}
              {/* <div className="relative">
                <FaPeopleCarry 
                  className={`h-8 w-8 ${getIconColors().primary} transition-all duration-300 transform group-hover:translate-x-1`}
                />
                <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full ${scrolled ? 'bg-purple-500' : 'bg-purple-300'} transition-all duration-300`}></div>
              </div> */}

              <span
                className={`ml-3 text-xl font-bold transition-all duration-300 ${
                  scrolled ? "text-gray-800" : "text-white"
                } group-hover:text-purple-600`}
              >
                MatchVolunteers
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center">
            <div className="flex space-x-8">
              {location.pathname == "/" &&
                [
                  { name: "Home", link: false },
                  { name: "Features", link: false },
                  { name: "How It Works", link: false },
                  { name: "Testimonials", link: false },
                  { name: "Contact", link: false },
                ].map((item) => (
                  <>
                    {item.link ? (
                      <Link
                        key={item}
                        to={`${
                          "/" + item.name.toLowerCase().replace(/\s+/g, "-")
                        }`}
                        className={`link text-sm font-medium transition-colors duration-300 hover:text-purple-600 ${
                          scrolled ? "text-gray-700" : "text-white"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <a
                        key={item}
                        href={`${
                          "#" + item.name.toLowerCase().replace(/\s+/g, "-")
                        }`}
                        className={`text-sm font-medium transition-colors duration-300 hover:text-purple-600 ${
                          scrolled ? "text-gray-700" : "text-white"
                        }`}
                      >
                        {item.name}
                      </a>
                    )}
                  </>
                ))}
            </div>

            <div className="relative" ref={dropdownRef}>
              {isLoading ? (
                "Loading..."
              ) : user ? (
                <Link
                  to={
                    user.role === "Volunteer"
                      ? "/volunteer/dashboard"
                      : "/admin/dashboard"
                  }
                >
                  <img
                    src={user?.profileImage?.url || profile}
                    className={`ml-8 rounded-full transition-all duration-300 transform hover:scale-105 h-10 w-10 cursor-pointer ${user?.profileImage?.url}`}
                    alt="User Profile"
                  />
                </Link>
              ) : (
                <button
                  className={`ml-8 px-5 py-2 text-sm font-medium text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 ${
                    scrolled ? "bg-purple-600" : "bg-purple-500"
                  }`}
                  onClick={() => handleRedirect("volunteer")}
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className={`flex items-center px-3 py-2 border rounded ${
                scrolled
                  ? "border-gray-500 text-gray-700"
                  : "border-white text-white"
              }`}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pt-4 pb-2 transition-all duration-300">
            <div className="flex flex-col space-y-4">
              {[
                "Home",
                "Features",
                "How It Works",
                "Testimonials",
                "Contact",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`text-sm font-medium px-2 py-1 transition-colors duration-300 hover:text-purple-600 ${
                    scrolled
                      ? "text-gray-700"
                      : "text-white bg-gray-800 bg-opacity-50 rounded"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button className="w-full px-5 py-2 text-sm font-medium text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-all duration-300">
                Sign Up / Login
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
