import React, { useState } from 'react';
import logo from "../../Assessts/logo.png"; 
import event from "../../Assessts/event.jpg";
import AboutUs from './About';
import { Link } from 'react-router-dom';
import ContactUs from './ContactUs';
import HowWork from './HowWork';

const Header = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseSidebar = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navbar Section */}
      <div className='flex justify-between items-center bg-[#dae8f8] px-8 py-4'>
        {/* Logo */}
        {logo ? (
          <img src={logo} className='w-28 h-16' alt="Logo" />
        ) : (
          <span className='text-black'>Logo</span> // Fallback text if logo is missing
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black"
          onClick={handleMobileMenuToggle}
        >
          {/* Hamburger Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Navigation Links */}
        <div className={`hidden md:flex items-center space-x-8`}>
          <Link to="event" className='text-black hover:text-custom-blue'>Event</Link>
          <Link to="about-us" className='text-black hover:text-custom-blue'>About Us</Link>
          <Link to="contact-us" className='text-black hover:text-custom-blue'>Contact Us</Link>
          <Link to="how-work" className='text-black hover:text-custom-blue'>How Work</Link>

          {/* Login As Dropdown */}
          <div className='relative'>
            <button
              onClick={handleButtonClick}
              className='bg-custom-blue text-white px-4 py-2 rounded-md'>
              Login as
            </button>

            {/* Dropdown Menu */}
            {showOptions && (
              <div className='absolute mt-2 bg-white shadow-lg rounded-lg p-2 z-50'>
                <Link
                  to="/admin/login"
                  className='block w-full text-left px-4 py-2 text-black hover:bg-gray-200 rounded-md'>
                  Admin
                </Link>
                <Link
                  to="/login"
                  className='block w-full text-left px-4 py-2 text-black hover:bg-gray-200 rounded-md'>
                  Volunteer
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-[#dae8f8] z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
      >
        {/* Close Button (Cross Icon) */}
        <button onClick={handleCloseSidebar} className="absolute top-4 right-4 text-2xl text-black">
          &times;
        </button>

        <div className="flex flex-col items-start p-8">
          {/* Logo */}
          {logo ? (
            <img src={logo} className='w-28 h-16 mb-4' alt="Logo" />
          ) : (
            <span className='text-black mb-4'>Logo</span> // Fallback text if logo is missing
          )}

          {/* Sidebar Links */}
          <Link 
            to="event" 
            className='text-black hover:text-custom-blue mb-4 py-2 border-b-2 border-transparent hover:border-custom-blue'
            onClick={handleCloseSidebar}>
            Event
          </Link>
          <Link 
            to="about-us" 
            className='text-black hover:text-custom-blue mb-4 py-2 border-b-2 border-transparent hover:border-custom-blue'
            onClick={handleCloseSidebar}>
            About Us
          </Link>
          <Link 
            to="contact-us" 
            className='text-black hover:text-custom-blue mb-4 py-2 border-b-2 border-transparent hover:border-custom-blue'
            onClick={handleCloseSidebar}>
            Contact Us
          </Link>
          <Link 
            to="how-work" 
            className='text-black hover:text-custom-blue mb-4 py-2 border-b-2 border-transparent hover:border-custom-blue'
            onClick={handleCloseSidebar}>
            How Work
          </Link>

          {/* Login As Dropdown */}
          <div className='relative mb-4'>
            <button
              onClick={handleButtonClick}
              className='bg-custom-blue text-white px-4 py-2 rounded-md'>
              Login as
            </button>

            {/* Dropdown Menu */}
            {showOptions && (
              <div className='absolute mt-2 bg-white shadow-lg rounded-lg p-2 z-50'>
                <Link
                  to="../../Pages/Login.jsx"
                  className='block w-full text-left px-4 py-2 text-black hover:bg-gray-200 rounded-md'>
                  Admin
                </Link>
                <Link
                  to="../../Pages/Signup.jsx"
                  className='block w-full text-left px-4 py-2 text-black hover:bg-gray-200 rounded-md'>
                  Volunteer
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event Section */}
      <section className="relative min-h-screen">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: event ? `url(${event})` : 'none', // Only set background if event image exists
          }}
        >
          {/* Overlay with color and transparency */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Text and Content */}
        <div className="flex flex-col items-center justify-center px-8 py-20 relative z-10">
          <h2 className="text-4xl font-bold text-custom-blue text-center mb-8">
            Events
          </h2>
          <div className="flex flex-col items-center text-white max-w-3xl space-y-6">
            <p className="leading-10 text-2xl text-center tracking-wide pt-32">
              We’re here to assist you! Whether you’re an admin with questions about
              creating events or a volunteer seeking information about upcoming
              opportunities, feel free to get in touch. Our team is happy to help with
              event-related inquiries, technical support, or any other assistance you
              may need. Reach out via email, phone, or use our contact form, and we’ll
              make sure to respond promptly. We value your feedback and are always
              looking to improve your experience on our platform.
            </p>
          </div>
        </div>
      </section>

      <AboutUs />
    </>
  );
};

export default Header;
