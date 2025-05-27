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

      <div className="container mx-auto px-4 md:px-2 z-10 py-20">
        <div className="flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fadeInUp opacity-0 translate-y-8">
    Transform Moments Into <br />
    <span className="relative inline-block">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 animate-gradient-shift bg-300%">
        Unforgettable Experiences
      </span>
      <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full animate-underline-expand origin-left"></span>
    </span>
  </h1>

  <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-lg mx-auto lg:mx-0 leading-relaxed animate-fadeInUp opacity-0 translate-y-8 delay-150">
    Where passion meets purpose. Our platform empowers you to create, discover, 
    and participate in events that inspire change and build lasting connections.
  </p>

  <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4 animate-fadeInUp opacity-0 translate-y-8 delay-300">
    <button className="relative group px-8 py-3.5 text-lg font-semibold text-white rounded-full overflow-hidden transition-all duration-500 shadow-2xl hover:shadow-purple-500/30">
      <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 group-hover:from-purple-600 group-hover:to-indigo-700 transition-all duration-500"></span>
      <span className="absolute inset-0.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      <span className="relative z-10 flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <Link to="/events">Discover Events</Link>
      </span>
    </button>
    
    <button className="relative group px-8 py-3.5 text-lg font-semibold text-white rounded-full border-2 border-gray-300 hover:border-transparent transition-all duration-300 hover:shadow-lg">
      <span className="absolute inset-0 bg-white/5 backdrop-blur-sm group-hover:bg-white/10 rounded-full transition-all duration-500"></span>
      <span className="relative z-10 flex items-center justify-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="8.5" cy="7" r="4"></circle>
          <line x1="20" y1="8" x2="20" y2="14"></line>
          <line x1="23" y1="11" x2="17" y2="11"></line>
        </svg>
        <Link to="/signup">Start Your Journey</Link>
      </span>
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
