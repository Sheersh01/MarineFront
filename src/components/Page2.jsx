import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ScrollVelocity from "./ScrollVelocity";

gsap.registerPlugin(ScrollTrigger);

const Page2 = () => {
  const paragraphRef = useRef(null);

  useEffect(() => {
    const split = new SplitType(paragraphRef.current, {
      types: "words",
    });

    gsap.set(split.words, {
      opacity: 0,
      y: () => gsap.utils.random(-60, 60),
      x: () => gsap.utils.random(-60, 60),
      rotate: () => gsap.utils.random(-20, 20),
    });

    gsap.to(split.words, {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: {
        each: 0.02,
      },
      scrollTrigger: {
        trigger: paragraphRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
        once: true, // Play only once (optional)
      },
    });

    return () => {
      split.revert();
    };
  }, []);

  return (
    <div className="h-full bg-[#121A27]">
      <div
        ref={paragraphRef}
        className="text-center w-full md:pt-30 pt-10 pb-10 font-[hel]"
      >
        <p className=" md:w-[80%] w-[90%] mx-auto lg:text-[2vw] md:text-[2vw] text-[2.6vw] leading-snug pb-20">
        We are a fast-growing ocean intelligence agency based in India, founded in 2014, focused on setting new standards in digital marine monitoring and data-driven protection. Our work spans across oceans and coasts, using publicly available data and AI to detect, predict, and act on threats to marine ecosystems.  


        </p>
      </div>

     <div className="overflow-x-hidden">
     <ScrollVelocity
        texts={["Ships repair ~ Protecting Agency ~ Ship's supply","Ship's supply ~ Full Port Agency","Protecting Agency ~ Ships repair"]}
        velocity={100}
        className="custom-scroll-text bg-[#121A27] font-[dw]"
      />
     </div>
    </div>
  );
};

export default Page2;
