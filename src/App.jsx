import React from "react";
import "./App.css";
import HeroSection from "./components/HeroSection";
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";
import Page4 from "./components/Page4";
import Page5 from "./components/Page5";
import Footer from "./components/Footer";
const App = () => {
  return (
    <div className="bg-[#121A27] h-screen text-white">
      <HeroSection />
      <Page2 />
      <Page3 />
      <Page4 /> 
      <Page5 />
    <Footer />
    </div>
  );
};

export default App;
