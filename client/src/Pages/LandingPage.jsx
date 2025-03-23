import React from 'react';
import HeroSection from '../Components/Shared/HeroSection';
import HowItWorksSection from '../Components/Shared/HowItWorksSection';
import TestimonialsSection from '../Components/Shared/TestimonialsSection';
import FooterSection from '../Components/Shared/FooterSection';
import Navbar from '../Components/Shared/Navbar';
import FeaturesSection from '../Components/Shared/FeaturesSection';

const LandingPage = () => {

  return (
<>
      <Navbar/>
      <HeroSection/>
      <FeaturesSection/>
      <HowItWorksSection/>
      <TestimonialsSection/>
      <FooterSection/>
</>    
  );
};

export default LandingPage;
