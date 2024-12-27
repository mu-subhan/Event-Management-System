import React from 'react';

const HowWork = () => {
  return (
    <>
    <div className="bg-gray-100 py-16 px-12 ">
        
      {/* Section Heading */}
      <h2 className="text-3xl  text-custom-blue font-bold text-center mb-8">
        How It Works
      </h2>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 justify-between">
        
        {/* Left Section (Text Description) */}
        <div className="w-full md:w-1/3 space-y-4">
          <h3 className="text-2xl font-semibold text-center md:text-left">
            For Admins:
          </h3>
          <p className="text-lg text-justify">
            As an admin, you can create and manage events effortlessly. 
            Our platform allows you to set up events with ease, from selecting event dates and locations to adding descriptions and required materials. You can track volunteer registrations, send reminders, and make updates to events as needed. 
            Whether it’s a small community event or a large conference, our system streamlines the process and ensures everything runs smoothly.
          </p>
          
          <h3 className="text-2xl font-semibold text-center md:text-left">
            For Volunteers:
          </h3>
          <p className="text-lg text-justify">
            As a volunteer, you can browse through various events and choose the ones you are passionate about. Whether you’re looking to participate in charity events, conferences, or educational workshops, you can easily sign up and contribute. 
            Stay updated on event details, and connect with other volunteers to make the most out of each experience. Your participation helps organizers run successful events and foster community engagement.
          </p>
        </div>

        {/* Right Section (Video/Visual) */}
        <div className="w-full md:w-1/2">
        <h1>vedio here </h1>
          <iframe
            width="100%"
            height="315"
            src=""
            title="How the Event Management System Works"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

      </div>
    </div>
    <hr style={{ border: 'solid gray', marginTop: '20px' }} />
    </>
  );
};

export default HowWork;
