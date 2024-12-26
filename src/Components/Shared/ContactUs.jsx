import React, { useState } from 'react';
import Footer from "../Shared/Footer.jsx"
const ContactUs = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',    
    email: '',
    message: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can replace this with actual submission logic (e.g., sending the form data to an API)
    alert(`Message from ${formData.name} received!`);
    console.log(formData); // Log form data to the console
  };

  return (
    <>
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md my-10">
      <h2 className="text-3xl font-bold  text-custom-blue text-center mb-6">Contact Us</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded-md"
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full p-2 mt-1 border rounded-md"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-custom-blue text-white font-semibold rounded-md "
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default ContactUs;
