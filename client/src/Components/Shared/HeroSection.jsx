import React, { useEffect } from "react";
import { Link } from "react-router-dom";
const HeroSection = () => {
  useEffect(() => {
    // Animation effect on load
    const elements = document.querySelectorAll(".animate-on-load");
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("opacity-100", "translate-y-0");
      }, 200 * index);
    });
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-indigo-800 z-0">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay"></div>

        {/* Animated shapes */}
        <div className="hidden lg:block">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white bg-opacity-10 animate-float"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 15}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10 py-20">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-on-load opacity-0 translate-y-8 transition-all duration-700">
              Organize & Discover <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Meaningful Events
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-lg mx-auto lg:mx-0 animate-on-load opacity-0 translate-y-8 transition-all duration-700 delay-300">
              Your all-in-one platform to create, manage, and join community
              events that matter. Connect with like-minded individuals and make
              an impact together.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 animate-on-load opacity-0 translate-y-8 transition-all duration-700 delay-500">
              <button className="px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <Link to="/events">Explore Events</Link>
              </button>
              <button className="px-8 py-3 text-base font-medium text-gray-100 bg-transparent border-2 border-gray-300 rounded-full hover:bg-white hover:bg-opacity-10 transition-all duration-300 transform hover:scale-105">
                <Link to="/signup">Join Now</Link>
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 mt-16 lg:mt-0 animate-on-load opacity-0 translate-y-8 transition-all duration-700 delay-700">
            <div className="relative mx-auto w-full max-w-md lg:max-w-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-2xl transform -rotate-6 scale-105 opacity-30 blur-lg animate-pulse"></div>
              <div className="relative bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 rounded-2xl shadow-2xl p-6 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Event Dashboard Preview"
                  className="w-full rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
