import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef(null);
  const headingsRef = useRef([]);
  const navbarItemsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar Animation (on load)
      gsap.from(navbarItemsRef.current, {
        y: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Headings Animation (on scroll)
      gsap.from(headingsRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="h-full w-full bg-[#121A27] text-white font-[dw]">
      {/* Navbar */}
      <nav className="flex items-center w-full z-50 bg-[#121A27]">
        <div
          ref={(el) => (navbarItemsRef.current[0] = el)}
          className="border-b-2 border-r-2 border-white w-[50%] py-6 "
        >
          Logo
        </div>
        <div
          ref={(el) => (navbarItemsRef.current[1] = el)}
          className="border-b-2 border-r-2 border-white w-[20%] py-6 text-center"
        >
          <h1>Login to Stark Portal</h1>
        </div>
        <div
          ref={(el) => (navbarItemsRef.current[2] = el)}
          className="border-b-2 border-r-2 border-white w-[20%] py-6 text-center"
        >
          <h1>Login to Stark Research</h1>
        </div>
        <h1
          ref={(el) => (navbarItemsRef.current[3] = el)}
          className="border-b-2 border-white w-[10%] py-6 text-center"
        >
          Menu
        </h1>
      </nav>

      {/* Add padding top to push content below fixed navbar */}
      <div ref={containerRef} className="relative h-screen ">
        {/* Image */}
        <img
          className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-50 scale-[0.4] h-full w-full object-contain"
          src="./ship.png"
          alt=""
        />

        {/* Hero Headings (staggered on scroll) */}
        <h1
          ref={(el) => (headingsRef.current[0] = el)}
          className="uppercase tracking-tighter absolute top-[5%] right-[2%] font-bold text-[8vw] leading-none"
        >
          More
        </h1>
        <h1
          ref={(el) => (headingsRef.current[1] = el)}
          className="uppercase tracking-tighter absolute top-[25%] left-[2%] font-bold text-[8vw] leading-none"
        >
          Than
        </h1>
        <h1
          ref={(el) => (headingsRef.current[2] = el)}
          className="uppercase tracking-tighter absolute top-[45%] right-[2%] font-bold text-[8vw] leading-none"
        >
          Just a port
        </h1>
        <h1
          ref={(el) => (headingsRef.current[3] = el)}
          className="uppercase tracking-tighter absolute top-[65%] left-[2%] font-bold text-[8vw] leading-none"
        >
          agent
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
