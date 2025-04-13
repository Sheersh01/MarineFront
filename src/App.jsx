import React from "react";
import "./App.css";
import HeroSection from "./components/HeroSection";
import CircularGallery from "./components/CircularGallery";
import Page2 from "./components/Page2";
const App = () => {
  return (
    <div className="bg-[#121A27] h-screen text-white ">
      <HeroSection />
     
<Page2 />
      <h1 className="font-bold text-[8vw] text-center pt-30 bg-[#121A27]">
        Our Problems
      </h1>

      <div
        className="w-full bg-[#121A27]"
        style={{ height: "600px", position: "relative" }}
      >
        <CircularGallery bend={1} textColor="#ffffff" borderRadius={0.05} />
      </div>

      <h1 className="font-bold text-[8vw] text-center pt-20 bg-[#121A27]">
        Analytics
      </h1>


    </div>
  );
};

export default App;
