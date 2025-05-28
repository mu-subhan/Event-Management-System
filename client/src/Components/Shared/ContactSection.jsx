import React, { useEffect, useRef } from 'react';
import usama from "../../assets/usama.jpeg";
import rehman from "../../assets/rehman.jpg";
import subhan from "../../assets/subhan.png";

const DeveloperCard = ({ name, role, image, socialLinks, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }, index * 200);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-xl shadow-lg p-6 transition-all duration-500 opacity-0 translate-y-10 hover:shadow-xl transform hover:scale-105"
    >
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-6">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-full transform rotate-6 scale-105 opacity-30 blur-lg animate-pulse"></div>
          <img
            src={image}
            alt={name}
            className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-purple-600 font-medium mb-4">{role}</p>
        <div className="flex space-x-4">
          {socialLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-purple-600 transition-colors duration-300"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactSection = () => {
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

  const developers = [
    {
      name: "Usama Razzaq",
      role: "Full Stack Developer",
      image: usama,
      socialLinks: [
        {
          url: "https://github.com/usamarazzaq90",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          ),
        },
        {
          url: "https://linkedin.com/in/usamarazzaq90",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.45 20.45h-3.554v-5.568c0-1.328-.472-2.236-1.65-2.236-.899 0-1.433.604-1.668 1.188-.086.209-.108.499-.108.791v5.825H9.909s.047-9.454 0-10.437h3.554v1.479c.472-.728 1.317-1.763 3.203-1.763 2.338 0 4.079 1.532 4.079 4.826v5.895zM5.337 7.433c-1.145 0-1.891.755-1.891 1.747 0 .972.724 1.746 1.847 1.746h.022c1.169 0 1.891-.774 1.891-1.746-.022-.992-.722-1.747-1.869-1.747zm-1.777 13.017h3.554V10.99H3.56v9.46zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          ),
        },
        {
          url: "mailto:usamarazzaq9014@gmail.com",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          ),
        },
      ],
    },
    {
      name: "Muhammad Rehman",
      role: "Full Stack Developer",
      image: rehman,
      socialLinks: [
        {
          url: "https://github.com/rehmanmuhammad123",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          ),
        },
        {
          url: "https://linkedin.com/in/hamzaali",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.45 20.45h-3.554v-5.568c0-1.328-.472-2.236-1.65-2.236-.899 0-1.433.604-1.668 1.188-.086.209-.108.499-.108.791v5.825H9.909s.047-9.454 0-10.437h3.554v1.479c.472-.728 1.317-1.763 3.203-1.763 2.338 0 4.079 1.532 4.079 4.826v5.895zM5.337 7.433c-1.145 0-1.891.755-1.891 1.747 0 .972.724 1.746 1.847 1.746h.022c1.169 0 1.891-.774 1.891-1.746-.022-.992-.722-1.747-1.869-1.747zm-1.777 13.017h3.554V10.99H3.56v9.46zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          ),
        },
        {
          url: "mailto:hamza@example.com",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          ),
        },
      ],
    },
    {
      name: "Muhammad Subhan",
      role: "Full Stack Developer",
      image: subhan,
      socialLinks: [
        {
          url: "https://github.com/sarahkhan",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          ),
        },
        {
          url: "https://linkedin.com/in/sarahkhan",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.45 20.45h-3.554v-5.568c0-1.328-.472-2.236-1.65-2.236-.899 0-1.433.604-1.668 1.188-.086.209-.108.499-.108.791v5.825H9.909s.047-9.454 0-10.437h3.554v1.479c.472-.728 1.317-1.763 3.203-1.763 2.338 0 4.079 1.532 4.079 4.826v5.895zM5.337 7.433c-1.145 0-1.891.755-1.891 1.747 0 .972.724 1.746 1.847 1.746h.022c1.169 0 1.891-.774 1.891-1.746-.022-.992-.722-1.747-1.869-1.747zm-1.777 13.017h3.554V10.99H3.56v9.46zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
            </svg>
          ),
        },
        {
          url: "mailto:sarah@example.com",
          icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div
        ref={sectionRef}
        className="container mx-auto px-4 md:px-6 opacity-0 transition-opacity duration-1000"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Team</span>
          </h2>
          <p className="text-xl text-gray-600">
            The passionate developers behind Match4Cause
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {developers.map((developer, index) => (
            <DeveloperCard key={index} {...developer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 