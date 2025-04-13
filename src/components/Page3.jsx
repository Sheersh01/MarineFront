import React from 'react'
import CircularGallery from "./CircularGallery";
const Page3 = () => {
  return (
    <div>
         <h1 className="font-bold text-[8vw] text-center pt-30 bg-[#121A27]">
        Our Problems
      </h1>

      <div
        className=" bg-[#121A27]"
        style={{ height: "600px", position: "relative" }}
      >
        <CircularGallery bend={1} textColor="#ffffff" borderRadius={0.05} />
      </div>
    </div>
  )
}

export default Page3