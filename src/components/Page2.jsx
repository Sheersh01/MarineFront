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
        className="text-center w-full pt-30 pb-10 font-[he']"
      >
        <p className="w-[60%] mx-auto text-[2vw] leading-snug pb-20">
          We come not for one year, we enjoy what we are doing, we are fully
          independent, handling all types of ships and we really want to bring
          to Ukraine — European standards of port call handling and we want our
          clients to feel that Ukraine — is changing, the service here — is
          changing and people here — are changing.
        </p>
      </div>

      <ScrollVelocity
        texts={["React Bits afap "]}
        velocity={100}
        className="custom-scroll-text bg-[#121A27]"
      />
    </div>
  );
};

export default Page2;
