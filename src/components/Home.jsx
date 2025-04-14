import React, { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page5 from "./Page5";
import Footer from "./Footer";

const Home = () => {
  const [showPage3, setShowPage3] = useState(false);
  
  useEffect(() => {
    // Set a timer to show Page3 after 2 seconds (adjust as needed)
    const timer = setTimeout(() => {
      setShowPage3(true);
    }, 5000);
    
    // Clean up the timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

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