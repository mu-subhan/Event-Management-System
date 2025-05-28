import React from 'react';
import HeroSection from '../Components/Shared/HeroSection';
import HowItWorksSection from '../Components/Shared/HowItWorksSection';
import TestimonialsSection from '../Components/Shared/TestimonialsSection';
import FooterSection from '../Components/Shared/FooterSection';
import Navbar from '../Components/Shared/Navbar';
import ContactSection from '../Components/Shared/ContactSection';
import FeaturesSection from '../Components/Shared/FeaturesSection';

const LandingPage = () => {

  return (
<>
      <Navbar/>
      <HeroSection/>
      <FeaturesSection/>
      <HowItWorksSection/>
      <TestimonialsSection/>
      <ContactSection/>
      <FooterSection/>
</>    
  );
};

export default LandingPage;
