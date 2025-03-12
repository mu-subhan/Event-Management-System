// import React, { useState } from 'react';
// import logo from "../../Assessts/logo.png"; 
// import event from "../../Assessts/event.jpg";
// import { Link } from 'react-router-dom';


// const Header = () => {
//   const [showOptions, setShowOptions] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleButtonClick = () => {
//     setShowOptions(!showOptions);
//   };

//   const handleMobileMenuToggle = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const handleCloseSidebar = () => {
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <>
//       {/* Navbar Section */}
//       <div className='flex justify-between items-center bg-[#dae8f8] px-8 py-4'>
//         {/* Logo */}
//         {logo ? (
//           <img src={logo} className='w-28 h-16' alt="Logo" />
//         ) : (
//           <span className='text-black'>Logo</span> // Fallback text if logo is missing
//         )}

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-black"
//           onClick={handleMobileMenuToggle}
//         >
//           {/* Hamburger Icon */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             className="w-8 h-8"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </button>

//         {/* Desktop Navigation Links */}
//         <div className={`hidden md:flex items-center space-x-8`}>
//           <Link to="/event" className='text-black hover:text-custom-blue'>Event</Link>
//           <Link to="/about-us" className='text-black hover:text-custom-blue'>About Us</Link>
//           <Link to="/contact-us" className='text-black hover:text-custom-blue'>Contact Us</Link>
//           <Link to="/how-work" className='text-black hover:text-custom-blue'>Features</Link>
//           <Link to="/faq-section" className='text-black hover:text-custom-blue'>FAQ</Link>
//           {/* Login As Dropdown */}
//           <div className='relative'>
//             <button
//               onClick={handleButtonClick}
//               className='bg-custom-blue text-white px-4 py-2 rounded-md'>
//               Login as
//             </button>

//             {/* Dropdown Menu */}
//             {showOptions && (
//               <div className='absolute mt-2 bg-white shadow-lg rounded-lg p-2 z-50'>
//                 <Link
//                   to="/admin/login"
//                   className='block w-full text-left px-4 py-2 text-black hover:bg-gray-200 rounded-md'>
//                   Admin
//                 </Link>
//                 <Link
//                   to="/login"
//                   className='block w-full text-left px-4 py-2 text-black hover:bg-gray-200 rounded-md'>
//                   Volunteer
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Sidebar Menu */}
//       <div
//         className={`fixed top-0 left-0 w-64 h-full bg-[#dae8f8] z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
//       >
//         {/* Close Button (Cross Icon) */}
//         <button onClick={handleCloseSidebar} className="absolute top-4 right-4 text-2xl text-black">
//           &times;
//         </button>

//         <div className="flex flex-col items-start p-8">
//           {/* Logo */}
//           {logo ? (
//             <img src={logo} className='w-28 h-16 mb-4' alt="Logo" />
//           ) : (
//             <span className='text-black mb-4'>Logo</span> // Fallback text if logo is missing
//           )}

//           {/* Sidebar Links */}
//           <Link 
//             to="/event" 
//             className='text-black hover:text-custom-blue mb-4 py-2 border-b-2 border-transparent hover:border-custom-blue'
//             onClick={handleCloseSidebar}>
//             Event
//           </Link>
//           <Link 
//             to="/about-us" 
//             className='text-black hover:text-custom-blue mb-4 py-2 border-b-2 border-transparent hover:border-custom-blue'
//             onClick={handleCloseSidebar}>
//             About Us
//           </Link>
//           <Link 
//             to="/contact-us" 
//             className='text-black hover:text-custom-blue mb-4 py-2 border-b-2 border-transparent hover:border-custom-blue'
//             onClick={handleCloseSidebar}>
//             Contact Us
//           </Link>
//           <Link 
//             to="/features" 
//             className='text-black hover:text-custom-blue mb-4 py-2 border-b-2 border-transparent hover:border-custom-blue'
//             onClick={handleCloseSidebar}>
//             How Work
//           </Link>
//           <Link 
//           to='/faq-section' className='text-black hover:text-custom-blue mb-4 py-2 border-b-2 border-transparent hover:border-custom-blue'
//           onClick={handleCloseSidebar}>
//             FAQ
//           </Link>

//           {/* Login As Dropdown */}
//           <div className='relative mb-4'>
//             <button
//               onClick={handleButtonClick}
//               className='bg-custom-blue text-white px-4 py-2 rounded-md'>
//               Login as
//             </button>

//             {/* Dropdown Menu */}
//             {showOptions && (
//               <div className='absolute mt-2 bg-white shadow-lg rounded-lg p-2 z-50'>
//                 <Link
//                   to="../../Pages/Login.jsx"
//                   className='block w-full text-left px-4 py-2 text-black hover:bg-gray-200 rounded-md'>
//                   Admin
//                 </Link>
//                 <Link
//                   to="../../Pages/Signup.jsx"
//                   className='block w-full text-left px-4 py-2 text-black hover:bg-gray-200 rounded-md'>
//                   Volunteer
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Event Section */}
//       <section className="relative min-h-screen">
//         {/* Background Image */}
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage: event ? `url(${event})` : 'none', // Only set background if event image exists
//           }}
//         >
//           {/* Overlay with color and transparency */}
//           <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//         </div>

//         {/* Text and Content */}
//         <div className="flex flex-col items-center justify-center px-8 py-20 relative z-10">
//           <h2 className="text-4xl font-bold text-custom-blue text-center mb-8">
//             Events
//           </h2>
//           <div className="flex flex-col items-center text-white max-w-3xl space-y-6">
//             <p className="leading-10 text-2xl text-center tracking-wide pt-32">
//               We’re here to assist you! Whether you’re an admin with questions about
//               creating events or a volunteer seeking information about upcoming
//               opportunities, feel free to get in touch. Our team is happy to help with
//               event-related inquiries, technical support, or any other assistance you
//               may need. Reach out via email, phone, or use our contact form, and we’ll
//               make sure to respond promptly. We value your feedback and are always
//               looking to improve your experience on our platform.
//             </p>
//           </div>
//         </div>
//         </section>
//     </>
//   );
// }

// export default Header;

import React, { useState, useEffect } from 'react';
import logo from "../../Assessts/logo.png"; 
import event from "../../Assessts/event.jpg";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Header = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // To control animation visibility

  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseSidebar = () => {
    setIsMobileMenuOpen(false);
  };

  // UseEffect to delay the animation by 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true); // Trigger the animation after 3 seconds
    }, 1000);

    return () => clearTimeout(timer); // Clean up the timeout on component unmount
  }, []);

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
          <Link to="/event" className='text-black hover:text-custom-blue'>Event</Link>
          <Link to="/about-us" className='text-black hover:text-custom-blue'>About Us</Link>
          <Link to="/contact-us" className='text-black hover:text-custom-blue'>Contact Us</Link>
          <Link to="/how-work" className='text-black hover:text-custom-blue'>Features</Link>
          <Link to="/faq-section" className='text-black hover:text-custom-blue'>FAQ</Link>
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
            to="/event" 
            className='text-black hover:text-custom-blue mb-4 py-2 border-b-2 border-transparent hover:border-custom-blue'
            onClick={handleCloseSidebar}>
            Event
          </Link>
          <Link 
            to="/about-us" 
            className='text-black hover:text-custom-blue mb-4 py-2 border-b-2 border-transparent hover:border-custom-blue'
            onClick={handleCloseSidebar}>
            About Us
          </Link>
          <Link 
            to="/contact-us" 
            className='text-black hover:text-custom-blue mb-4 py-2 border-b-2 border-transparent hover:border-custom-blue'
            onClick={handleCloseSidebar}>
            Contact Us
          </Link>
          <Link 
            to="/features" 
            className='text-black hover:text-custom-blue mb-4 py-2 border-b-2 border-transparent hover:border-custom-blue'
            onClick={handleCloseSidebar}>
            How Work
          </Link>
          <Link 
          to='/faq-section' className='text-black hover:text-custom-blue mb-4 py-2 border-b-2 border-transparent hover:border-custom-blue'
          onClick={handleCloseSidebar}>
            FAQ
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
      <section className="relative h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }} // Animate after delay
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl px-6"
        >
          <h1 className="text-5xl font-extrabold sm:text-6xl drop-shadow-lg">
            Simplify Your Event Management
          </h1>
          <p className="mt-4 text-lg sm:text-xl drop-shadow-md">
            Create, manage, and match volunteers effortlessly with AI-driven automation.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-blue-100 font-bold px-6 py-3 rounded-lg shadow-lg">
              Get Started
            </button>
            <button className="border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg shadow-lg">
              Explore Events <ArrowRight className="ml-2" />
            </button>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Header;
