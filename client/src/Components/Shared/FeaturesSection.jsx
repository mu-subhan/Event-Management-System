
        import React, { useEffect, useRef } from 'react';
        
        const FeatureCard = ({ icon, title, description, index }) => {
          const featureRef = useRef(null);
        
          useEffect(() => {
            const observer = new IntersectionObserver(
              ([entry]) => {
                if (entry.isIntersecting) {
                  setTimeout(() => {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                  }, index * 150);
                  observer.unobserve(entry.target);
                }
              },
              { threshold: 0.1 }
            );
        
            if (featureRef.current) {
              observer.observe(featureRef.current);
            }
        
            return () => {
              if (featureRef.current) {
                observer.unobserve(featureRef.current);
              }
            };
          }, [index]);
        
          return (
            <div 
              ref={featureRef}
              className="bg-white rounded-xl shadow-lg p-6 transition-all duration-500 opacity-0 translate-y-10 hover:shadow-xl hover:transform hover:scale-105 group"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                {icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          );
        };
        
        const FeaturesSection = () => {
          const features = [
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              ),
              title: "Find & Join Exciting Events",
              description: "Discover new opportunities that match your interests and skills. Search by category, location, or impact area."
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ),
              title: "Host & Manage Your Own Events",
              description: "Create and coordinate events easily with our intuitive planning tools. Manage registrations, communications, and more."
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              ),
              title: "Real-Time Updates & Notifications",
              description: "Stay informed with instant alerts about event changes, reminders, and important announcements."
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ),
              title: "Smart Volunteer Matching",
              description: "Our intelligent algorithm connects event organizers with the perfect volunteers based on skills and availability."
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
            <section id="features" className="py-20 bg-gray-50">
              <div 
                ref={sectionRef}
                className="container mx-auto px-4 md:px-6 opacity-0 transition-opacity duration-1000"
              >
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
                  <p className="text-xl text-gray-600">Everything you need to create, manage, and participate in meaningful events</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature, index) => (
                    <FeatureCard 
                      key={index}
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </section>
          );
        };
        
        export default FeaturesSection;