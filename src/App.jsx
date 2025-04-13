import React from "react";
import "./App.css";
import HeroSection from "./components/HeroSection";

import Page2 from "./components/Page2";
import Page3 from "./components/Page3";
const App = () => {
  return (
    <div className="bg-[#121A27] h-screen text-white ">
      <HeroSection />
     
      <Page2 />
      <Page3 />
      <h1 className="font-bold text-[8vw] text-center pt-20 bg-[#121A27]">
        Analytics
      </h1>


    </div>
  );
};

export default App;
