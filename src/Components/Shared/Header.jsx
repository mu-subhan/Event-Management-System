import React, { useState } from 'react';
import logo from "../../Assessts/logo.png"; // Ensure correct path for the logo
import event from "../../Assessts/event.jpg"
import AboutUs from './About';
import { Link } from 'react-router-dom';
import ContactUs from './ContactUs';
import HowWork from './HowWork';

const Header = () => {
  const [showOptions, setShowOptions] = useState(false);
  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <>
      <div className='flex justify-between items-center bg-[#dae8f8] px-8 py-4'>
        {/* Logo on the left */}
        <img src={logo} className='w-28 h-16' alt="Logo" />

        {/* Navbar links on the right */}
        <div className='flex items-center space-x-8'>
          {/* Navbar links */}
          <Link  to="event" element={<Event/>} className='text-black hover:text-custom-blue'>Event</Link>
          <Link to="about-us" element={<AboutUs/>} className='text-black hover:text-custom-blue'>About Us</Link>
          <Link to ="contact-us" element={<ContactUs/>} className='text-black hover:text-custom-blue'>Contact Us</Link>
          <Link to ="how-work" element={<HowWork/>} className='text-black hover:text-custom-blue'>How Work</Link>


          {/* Login as dropdown */}
          <div className='relative'>
            <button
              onClick={handleButtonClick}
              className='bg-custom-blue text-white px-4 py-2 rounded-md'>
              Login as
            </button>

            {/* Dropdown menu */}
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

      {/* event */}
      <section className="relative min-h-screen">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${event})`,  // Apply the background image
          }}
        >
          {/* Overlay with color and transparency */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Text and content */}
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
