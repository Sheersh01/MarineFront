import React, { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page5 from "./Page5";
import Footer from "./Footer";

const Home = () => {
  const [showPage3, setShowPage3] = useState(false);
  const [deviceType, setDeviceType] = useState("desktop");
  
  useEffect(() => {
    // Check device type based on screen width
    const checkDeviceType = () => {
      if (window.innerWidth <= 767) {
        setDeviceType("mobile");
      } else if (window.innerWidth <= 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };
    
    // Initial check
    checkDeviceType();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkDeviceType);
    
    // Set timer based on device type
    const timer = setTimeout(() => {
      setShowPage3(true);
    }, deviceType === "mobile" ? 1000 : 5000);
    
    // Clean up the timer and event listener when component unmounts
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkDeviceType);
    };
  }, [deviceType]);

  return (
    <div className="bg-[#121A27] min-h-screen text-white">
      <HeroSection />
      <Page2 />
      {showPage3 && <Page3 />}
      <Page4 /> 
      <Page5 />
      <Footer />
    </div>
  );
};

export default Home;