import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// StepCard Component for individual step
const StepCard = ({ number, title, description, icon, isLast }) => {
  const stepRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }, number * 200);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => {
      if (stepRef.current) {
        observer.unobserve(stepRef.current);
      }
    };
  }, [number]);

  return (
    <div 
      className={`flex flex-col items-center opacity-0 translate-y-10 transition-all duration-500 ${
        !isLast ? 'mb-12 md:mb-0' : ''
      }`} 
      ref={stepRef}
    >
      {/* Step number with connecting line */}
      <div className="relative flex flex-col items-center">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white text-2xl font-bold shadow-lg z-10">
          {number}
        </div>
        {!isLast && (
          <div className="hidden md:block absolute top-16 left-1/2 h-full w-0.5 bg-gradient-to-b from-purple-300 to-purple-100 transform -translate-x-1/2"></div>
        )}
      </div>
      
      {/* Card content */}
      <div className="mt-6 bg-white rounded-xl shadow-lg p-6 w-full max-w-md border border-gray-100 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mb-4">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

// Main HowItWorksSection Component
const HowItWorksSection = () => {
  const steps = [
    {
      title: "Sign Up",
      description: "Create an account as a Volunteer or Organizer in just a few clicks. Fill in your profile and preferences to get personalized recommendations.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      title: "Browse Events",
      description: "Discover upcoming events based on your interests, skills, location, and availability. Filter and search to find the perfect match.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      title: "Join & Participate",
      description: "Register for events with a single click and receive real-time updates. Connect with organizers and other participants through our platform.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
    },
    {
      title: "Track Impact",
      description: "View your volunteer hours, contributions, and the overall impact of your participation. Share your achievements on social media.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    }
  ];

  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gradient-to-b from-white to-purple-50">
      <div 
        ref={sectionRef}
        className="container mx-auto px-4 md:px-6 opacity-0 transition-opacity duration-1000"
      >
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Works</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Join thousands of volunteers making a difference in just 4 simple steps
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
            {steps.map((step, index) => (
              <StepCard 
                key={index}
                number={index + 1}
                title={step.title}
                description={step.description}
                icon={step.icon}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <button className="px-8 py-3 md:px-10 md:py-4 text-base md:text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
          <Link to="/signup">Get Started Now</Link>
            <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;