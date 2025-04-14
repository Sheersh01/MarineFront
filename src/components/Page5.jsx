import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutUs from "./AboutUs";

gsap.registerPlugin(ScrollTrigger);

const Page5 = () => {
  const paragraphRef = useRef(null);

  useEffect(() => {
    // Initialize SplitType to split the text into words
    const split = new SplitType(paragraphRef.current, {
      types: "words",
    });

    // Set initial scattered positions for all words
    gsap.set(split.words, {
      opacity: 0,
      y: () => gsap.utils.random(-60, 60), // Random vertical offset
      x: () => gsap.utils.random(-60, 60), // Random horizontal offset
      rotate: () => gsap.utils.random(-20, 20), // Random rotation
    });

    // Animate words back to their original positions when scrolled into view
    gsap.to(split.words, {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: {
        each: 0.02, // Slight delay between each word's animation
      },
      scrollTrigger: {
        trigger: paragraphRef.current,
        start: "top 80%", // Start animation when element is 80% in view
        toggleActions: "play none none reverse",
        once: true, // Play only once (optional)
      },
    });

    // Cleanup function to revert SplitType when component unmounts
    return () => {
      split.revert();
    };
  }, []);

  return (
    <div className="bg-[#121A27] pt-20 h-full text-white">
      <div
        ref={paragraphRef}
        className="text-center w-full pt-30 pb-10 font-[hel]"
      >
        <p className="md:w-[80%] mx-auto lg:text-[2vw] md:text-[2vw] text-[2.6vw] leading-snug pb-20">
  We are a fast-growing ocean intelligence agency based in India, focused on protecting marine ecosystems through data. Using public sources and AI, we deliver unique insights and threat detection to help researchers and policymakers take meaningful action.
</p>

      </div>
      <AboutUs />
    </div>
  );
};

export default Page5;