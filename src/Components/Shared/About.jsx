import React from 'react';
import subhanImage from "../../Assessts/subhanImage.png";
import usamaImage from "../../Assessts/usama.jpeg";
import rehmanImage from "../../Assessts/rehman.jpg";
import HowWork from "../Shared/HowWork"
import ContactUs from "../Shared/ContactUs"

const AboutUs = () => {
  return (
    <>
    <HowWork/>
    <section className="py-16 px-8 bg-gray-100">
      
      {/* Heading for About Us */}
      <h2 className="text-4xl font-bold text-custom-blue flex text-center justify-center md:text-left mb-8">
        About Us
      </h2>

      {/* Left Section (About Us Description) */}
      <div className="flex flex-col w-full space-y-8 md:w- pt-8 px-80">
        <h2 className='text-2xl font-bold text-center md:text-left'>Provide Facilitations</h2>
        <p className="text-lg leading-relaxed text-justify">
          We believe that events bring people together, foster learning, and create opportunities for personal and professional growth. Our platform is built to make event management easier and more accessible. Event organizers (admins) can create and manage events effortlessly, while volunteers can browse through various events and choose to contribute. We aim to streamline event logistics, improve attendee engagement, and help organizers connect with passionate volunteers to make every event a success. We’re committed to ensuring that all events, big or small, run smoothly and efficiently.
        </p>
      </div>

      {/* Team Members Section */}
      <div className="w-full pt-10 px-80 ">
        {/* Team Members Heading */}
        <h3 className="text-3xl font-bold mb-8">Team Members</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full h-96">
          
          {/* Card 1: Muhammad Subhan */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center min-h-[320px] flex flex-col justify-between transform transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-y-2">
            <img src={subhanImage} alt="Muhammad Subhan" className="w-32 h-32 rounded-full mx-auto mb-4"/>
            <h3 className="text-xl font-semibold">Muhammad Subhan</h3>
            <p className="text-gray-600">Software Engineer, MERN Stack</p>
            <a href="https://www.linkedin.com/in/muhammad-subhan-321821231/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 inline-block">
              LinkedIn Profile
            </a>
          </div>

          {/* Card 2: Muhammad Rehman */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center min-h-[320px] flex flex-col justify-between transform transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-y-2">
            <img src={rehmanImage} alt="Muhammad Rehman" className="w-32 h-32 rounded-full mx-auto mb-4"/>
            <h3 className="text-xl font-semibold">Muhammad Rehman</h3>
            <p className="text-gray-600">Software Engineer, MERN Stack</p>
            <a href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAAED8eTcBrjHYAgWnLAetwSqupbQD2vcmMU4&keywords=muhammad%20rehman%20musharaf&origin=RICH_QUERY_SUGGESTION&position=3&searchId=02dff719-23d8-4dd1-9cb5-3ca4d7eba1ef&sid=Lgn&spellCorrectionEnabled=false" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 inline-block">
              LinkedIn Profile
            </a>
          </div>

          {/* Card 3: Usama Razzaq */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center min-h-[320px] flex flex-col justify-between transform transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-y-2">
            <img src={usamaImage} alt="Usama Razzaq" className="w-32 h-32 rounded-full mx-auto mb-4"/>
            <h3 className="text-xl font-semibold">Usama Razzaq</h3>
            <p className="text-gray-600">Software Engineer, MERN Stack</p>
            <a href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAADq15PIBL-09guhRJa39kFejHYxOvc1m3Nc&keywords=usama%20razzaq&origin=RICH_QUERY_SUGGESTION&position=0&searchId=753368eb-dab2-4a29-9549-20931b745ab9&sid=940&spellCorrectionEnabled=false" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 inline-block">
              LinkedIn Profile
            </a>
          </div>
        </div>
      </div>
    </section>
    <ContactUs/>
</>
  );
};

export default AboutUs;
