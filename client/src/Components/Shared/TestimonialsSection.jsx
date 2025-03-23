// components/TestimonialsSection.jsx
import React, { useState, useEffect, useRef } from 'react';

const TestimonialCard = ({ name, role, image, content, rating }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105">
      <div className="flex items-center mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <h4 className="font-bold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
      
      <div className="mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">
            {i < rating ? "★" : "☆"}
          </span>
        ))}
      </div>
      
      <p className="text-gray-700 italic">{content}</p>
    </div>
  );
};

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Event Organizer",
      image: "/api/placeholder/100/100",
      content: "This platform has revolutionized how I manage community events. The volunteer matching feature saved me countless hours of coordination. Highly recommended!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Volunteer",
      image: "/api/placeholder/100/100",
      content: "I've been able to discover meaningful opportunities that align with my schedule and interests. The impact tracking feature gives me a sense of accomplishment.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Non-profit Director",
      image: "/api/placeholder/100/100",
      content: "Our organization has seen a 40% increase in volunteer participation since using this platform. The analytics and reporting tools are invaluable for our grants.",
      rating: 4
    },
    {
      name: "David Williams",
      role: "Community Leader",
      image: "/api/placeholder/100/100",
      content: "The ease of creating and promoting events has helped us build a stronger community. The mobile app makes managing events on-the-go incredibly simple.",
      rating: 5
    },
    {
      name: "Aisha Patel",
      role: "Regular Volunteer",
      image: "/api/placeholder/100/100",
      content: "I've participated in over 20 events found through this platform. The notification system ensures I never miss an opportunity that matches my interests.",
      rating: 4
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

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

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);

  const slideToIndex = (index) => {
    setActiveIndex(index);
  };

  return (
    <section id="testimonials" className="py-20 bg-purple-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600">Hear from our volunteers and organizers</p>
        </div>
        
        <div 
          ref={carouselRef}
          className="relative max-w-5xl mx-auto opacity-0 transition-opacity duration-1000"
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-24">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                onClick={() => slideToIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  activeIndex === index ? 'bg-purple-600' : 'bg-gray-300'
                } transition-all duration-300 hover:bg-purple-400`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={() => setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg text-gray-800 hover:text-purple-600 transition-colors duration-300 focus:outline-none hidden md:block"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={() => setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg text-gray-800 hover:text-purple-600 transition-colors duration-300 focus:outline-none hidden md:block"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

    </section>
  );
};

export default TestimonialsSection;