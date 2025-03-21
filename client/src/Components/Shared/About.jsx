// import React from 'react';
// import subhanImage from "../../Assessts/subhanImage.png";
// import usamaImage from "../../Assessts/usama.jpeg";
// import rehmanImage from "../../Assessts/rehman.jpg";
// import ContactUs from "../Shared/ContactUs"

// const AboutUs = () => {
//   return (
//     <>
    
//       <section className="py-16 px-8 bg-gray-100">
      
//         {/* Heading for About Us */}
//         <h2 className="text-4xl font-bold text-custom-blue flex text-center justify-center md:text-left mb-8">
//           About Us
//         </h2>

//         {/* Left Section (About Us Description) */}
//         <div className="flex flex-col w-full space-y-8 px-4 md:px-20">
//           <h2 className="text-2xl font-bold text-center md:text-left">Provide Facilitations</h2>
//           <p className="text-lg leading-relaxed text-justify">
//             We believe that events bring people together, foster learning, and create opportunities for personal and professional growth. Our platform is built to make event management easier and more accessible. Event organizers (admins) can create and manage events effortlessly, while volunteers can browse through various events and choose to contribute. We aim to streamline event logistics, improve attendee engagement, and help organizers connect with passionate volunteers to make every event a success. We’re committed to ensuring that all events, big or small, run smoothly and efficiently.
//           </p>
//         </div>

//         {/* Team Members Section */}
//         <div className="w-full pt-10">
//           {/* Team Members Heading */}
//           <h3 className="text-3xl font-bold mb-8 text-center">Team Members</h3>

//           {/* Team Cards Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-8 md:px-20 lg:px-28 gap-8">

// {/* Card 1: Muhammad Subhan */}
// <div className="bg-white p-6 rounded-lg shadow-md text-justify flex flex-col justify-between transform transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-y-2 min-h-[420px]">
//   <img src={subhanImage} alt="Muhammad Subhan" className="w-32 h-32 rounded-full mx-auto mb-4"/>
//   <h3 className="text-2xl font-semibold text-center">Muhammad Subhan</h3>
//   <p className="text-gray-900 font-bold text-center pt-4">MERN Stack Developer, specializing in Front-End</p>
//   <p className="text-gray-700 mb-4 text-justify px-6">
//     Muhammad Subhan is a MERN Stack Developer with a strong focus on front-end development. He excels in creating dynamic and responsive user interfaces using modern technologies like React.js and MongoDB. His passion for clean code and attention to detail makes him a valuable contributor to any project.
//   </p>
//   <div className="text-center mt-2">
//     <a href="https://www.linkedin.com/in/muhammad-subhan-321821231/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline inline-block">
//       LinkedIn Profile
//     </a>
//   </div>
// </div>

// {/* Card 2: Muhammad Rehman */}
// <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-between transform transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-y-2 min-h-[420px]">
//   <img src={rehmanImage} alt="Muhammad Rehman" className="w-32 h-32 rounded-full mx-auto mb-4"/>
//   <h3 className="text-2xl font-semibold text-center">Muhammad Rehman</h3>
//   <p className="text-gray-900 font-bold pt-4">MERN Stack Developer, specializing in Backend</p>
//   <p className="text-gray-700  mb-4 text-justify  px-5">
//     Muhammad Rehman is a MERN Stack Developer, specializing in backend development. He has in-depth experience with Node.js, Express, and MongoDB, building scalable and efficient server-side applications. Rehman thrives in optimizing performance and ensuring robust data handling.
//   </p>
//   <div className="text-center mt-2">
//     <a href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAAED8eTcBrjHYAgWnLAetwSqupbQD2vcmMU4&keywords=muhammad%20rehman%20musharaf&origin=RICH_QUERY_SUGGESTION&position=3&searchId=02dff719-23d8-4dd1-9cb5-3ca4d7eba1ef&sid=Lgn&spellCorrectionEnabled=false" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline mt-2 inline-block">
//       LinkedIn Profile
//     </a>
//   </div>
// </div>

// {/* Card 3: Usama Razzaq */}
// <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-between transform transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-y-2 min-h-[420px]">
//   <img src={usamaImage} alt="Usama Razzaq" className="w-32 h-32 rounded-full mx-auto mb-4"/>
//   <h3 className="text-2xl font-semibold text-center">Usama Razzaq</h3>
//   <p className="text-gray-900 font-bold pt-4">MERN Stack Developer, specializing in Front-End</p>
//   <p className="text-gray-700  mb-4 text-justify px-5">
//     Usama Razzaq is a MERN Stack Developer with expertise in front-end technologies. He is skilled in crafting intuitive and visually appealing user interfaces with React.js, HTML, CSS, and JavaScript. Usama's goal is to create responsive web applications that are both functional and aesthetically pleasing.
//   </p>
//   <div className="text-center mt-2">
//     <a href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAADq15PIBL-09guhRJa39kFejHYxOvc1m3Nc&keywords=usama%20razzaq&origin=RICH_QUERY_SUGGESTION&position=0&searchId=753368eb-dab2-4a29-9549-20931b745ab9&sid=940&spellCorrectionEnabled=false" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline mt-2 inline-block">
//       LinkedIn Profile
//     </a>
//   </div>
// </div>

// </div>


//         </div>
//       </section>
      
//       <ContactUs/>
//     </>
//   );
// };

// export default AboutUs;




import React from "react";
import { FaUserPlus, FaSearch, FaCheckCircle, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";


export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white shadow-lg rounded-2xl p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`mt-2 text-gray-800 ${className}`}>{children}</div>;
}

const AboutUs = () => {
  const steps = [
    {
      icon: <FaUserPlus size={30} />,
      title: "Sign Up",
      desc: "Create an account either as a Volunteer or Organizer. It only takes a few minutes and gives you access to all our events."
    },
    {
      icon: <FaSearch size={30} />,
      title: "Browse Events",
      desc: "Explore upcoming events based on your interests, whether it’s volunteering opportunities or community events."
    },
    {
      icon: <FaCheckCircle size={30} />,
      title: "Join & Participate",
      desc: "Select the events you’d like to participate in, register for them, and stay updated with real-time notifications."
    },
    {
      icon: <FaChartLine size={30} />,
      title: "Track Impact",
      desc: "Keep track of your volunteer hours, contributions, and the impact you’re making with detailed statistics."
    }
  ];

  return (
    <>
      {/* How It Works Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-20 lg:py-24 text-white text-center">
        <h2 className="text-4xl font-bold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 items-center justify-center">
          {steps.map((step, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }}>
              <Card className="bg-white text-gray-800 p-6 rounded-2xl shadow-lg max-w-xs mx-auto h-[420px] flex flex-col items-center justify-between">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex items-center justify-center mt-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mt-6 text-center">{step.title}</h3>
                  <p className="text-sm mt-2 text-center">{step.desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-purple-600 py-16 text-center text-white">
        <h2 className="text-4xl font-bold mb-6">Join the Community Today!</h2>
        <p className="text-lg mb-6">Start Organizing & Volunteering Now! 1000+ Events Hosted.</p>
        <button className="bg-white text-purple-600 px-6 py-3 font-semibold rounded-full">Get Started</button>
      </div>
    </>
  );
};

export default AboutUs;
