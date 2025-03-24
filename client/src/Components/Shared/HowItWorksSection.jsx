import React, { useEffect, useRef } from 'react';

// StepCard Component for individual step
const StepCard = ({ number, title, description, icon, isLast }) => {
  const stepRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log(`Step ${number} is in view!`); // Debugging
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
    <div className="flex flex-col md:flex-row items-center opacity-0 translate-y-10 transition-all duration-500" ref={stepRef}>
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-600 text-white text-2xl font-bold">
          {number}
        </div>
        {!isLast && (
          <div className="h-24 w-1 bg-purple-200 my-4 md:hidden"></div>
        )}
      </div>
      
      {!isLast && (
        <div className="hidden md:block h-1 w-12 bg-purple-200 mx-4"></div>
      )}
      
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8 flex-1">
        <div className="flex items-start mb-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mr-4 flex-shrink-0">
            {icon || 'Icon not loaded'} {/* Fallback text if the icon doesn't render */}
          </div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>

      {!isLast && (
        <div className="hidden md:block h-1 w-12 bg-purple-200 mx-4"></div>
      )}
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
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div 
        ref={sectionRef}
        className="container mx-auto px-4 md:px-6 opacity-0 transition-opacity duration-1000"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Get started in just a few simple steps</p>
        </div>
        
        <div className="max-w-4xl ">
          <div className="flex flex-col md:flex-row md:items-start space-y-12 md:space-y-0">
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
          <button className="px-8 py-3 text-base font-medium text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
