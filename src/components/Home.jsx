import React from "react";
import HeroSection from "./HeroSection";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page5 from "./Page5";
import Footer from "./Footer";
const Home = () => {
  return (
    <div className="bg-[#121A27] min-h-screen text-white">
      <HeroSection />
      <Page2 />
      <Page3 />
      <Page4 /> 
      <Page5 />
    <Footer />
    </div>
  );
};

export default Home;
