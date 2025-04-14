import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InfiniteMenu from "./InfiniteMenu"; // ✅ make sure path is correct

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const shipRef = useRef(null);
  const containerRef = useRef(null);
  const headingsRef = useRef([]);
  const navbarItemsRef = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  const items = [
    {
      image: "https://picsum.photos/300/300?grayscale",
      link: "/",
      title: "Home",
      description: "Return to the main page",
    },
    {
      image: "https://picsum.photos/400/400?grayscale",
      link: "/oil-spills",
      title: "Oil Spills",
      description: "Learn about marine oil pollution impacts",
    },
    {
      image: "https://picsum.photos/500/500?grayscale",
      link: "/illegal-fishing",
      title: "Illegal Fishing",
      description: "Discover consequences of unreported fishing",
    },
    {
      image: "https://picsum.photos/600/600?grayscale",
      link: "/ocean-trafficking",
      title: "Ocean Trafficking",
      description: "Maritime routes used for illegal activities",
    },
  ];

  // Control body scrolling based on animation state
  useEffect(() => {
    // Disable scrolling when component mounts
    document.body.style.overflow = "hidden";

    // Enable scrolling when animation completes
    if (animationComplete) {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to ensure scrolling is restored when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [animationComplete]);

  if(window.innerWidth >= 1024) {

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setAnimationComplete(true), // Set animation complete when timeline finishes
      });

      // Step 1: Ship enters from left
      tl.fromTo(
        shipRef.current,
        {
          y: "-50%",
          x: "-100%",
          rotate: 0,
          opacity: 0,
          scale: 0.4,
        },
        {
          x: "-50%",
          scale: 0.4,
          opacity: 1,
          duration: 3.0,
          ease: "power4.out",
        },
        "shipEnter"
      );

      // Step 2: Navbar and text elements fade in together
      tl.from(
        navbarItemsRef.current,
        {
          opacity: 0,
          y: 0,
          scale: 1.2,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        },
        "fadeIn-=1" // Start before ship animation completes
      );

      // Fade in all headings at once (more efficient than separate animations)
      tl.from(
        headingsRef.current,
        {
          opacity: 0,
          scale: 1.2,
          duration: 1,
          ease: "power2.out",
        },
        "fadeIn-=1" // Same timing as navbar
      );

      // Step 3: Text elements move outwards
      tl.to(
        [headingsRef.current[0], headingsRef.current[2]], // 1st and 3rd texts move right
        {
          x: (i) => (i === 0 ? 450 : 150), // 450px for first, 150px for third
          duration: 1,
          ease: "power2.out",
        },
        "textMove+=0.5" // Start 1 second after fade in completes
      );

      tl.to(
        [headingsRef.current[1], headingsRef.current[3]], // 2nd and 4th texts move left
        {
          x: (i) => (i === 0 ? -600 : -400), // -600px for second, -400px for fourth
          duration: 1,
          ease: "power2.out",
        },
        "textMove+=0.5" // Same timing as right-moving texts
      );

      // Step 4: Ship rotates after text movement
      tl.to(
        shipRef.current,
        {
          y: "-50%",
          rotate: 50,
          scale: 0.4,
          duration: 1,
          ease: "power2.out",
        },
        "textMove+=0.5" // Small pause after text movement
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);
  }
  // Visual indicator for animation state - you can remove this if not needed
 // CSS for clip-path hover effect
 const navItemStyles = `
 .nav-item {
   position: relative;
   cursor: pointer;
   transition: color 0.3s ease;
   overflow: hidden;
 }
 
 .nav-item::before {
   content: "";
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: white;
   transform: translateX(-101%);
   transition: transform 0.4s cubic-bezier(0.7, 0, 0.3, 1);
   z-index: -1;
   clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
 }
 
 .nav-item:hover {
   color: #121A27;
 }
 
 .nav-item:hover::before {
   transform: translateX(0);
 }
`;
  return (
    <>
       <style>{navItemStyles}</style>
    <div className="h-full w-full bg-[#121A27] text-white font-[dw] relative overflow-hidden">
      {/* Navbar */}
      <nav className="flex items-center w-full z-50 bg-[#121A27] ">
          <div
            ref={(el) => (navbarItemsRef.current[0] = el)}
            className=" border-b-2 border-r-2 border-white w-[50%] md:py-6 py-4 pl-6 lg:text-[1vw] md:text-[1.2vw] text-[1.2vw]"
          >
            <h1>Logo</h1>
          </div>
          <div
            ref={(el) => (navbarItemsRef.current[1] = el)}
            className="nav-item border-b-2 border-r-2 border-white w-[20%] md:py-6 py-4 text-center lg:text-[1vw] md:text-[1.2vw] text-[1.2vw]"
          >
            <h1>Login to  Portal</h1>
          </div>
          <div
            ref={(el) => (navbarItemsRef.current[2] = el)}
            className="nav-item border-b-2 border-r-2 border-white w-[20%] md:py-6 py-4 text-center lg:text-[1vw] md:text-[1.2vw] text-[1.2vw]"
          >
            <h1>DashBoard Analytics</h1>
          </div>
          <div
            onClick={() => setMenuOpen((prev) => !prev)}
            ref={(el) => (navbarItemsRef.current[3] = el)}
            className="nav-item cursor-pointer border-b-2 border-white w-[10%] md:py-6 py-4 text-center lg:text-[1vw] md:text-[1.2vw] text-[1.2vw]"
          >
            Menu
          </div>
        </nav>

      {/* Hero Section */}
      <div ref={containerRef} className="relative h-screen">
        {/* Image */}
        <img
          ref={shipRef}
          className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-50 scale-[0.4] h-full w-full object-contain"
          src="./ship.png"
          alt=""
        />

        {/* Hero Headings (staggered on scroll) */}
        <div className="text-center">
          <h1
            ref={(el) => (headingsRef.current[0] = el)}
            className="uppercase tracking-tighter absolute top-[5%] left-1/2 -translate-x-1/2 font-bold text-[8vw] leading-none"
          >
            More
          </h1>
          <h1
            ref={(el) => (headingsRef.current[1] = el)}
            className="uppercase tracking-tighter absolute top-[25%] left-1/2 -translate-x-1/2 font-bold text-[8vw] leading-none"
          >
            Than
          </h1>
          <h1
            ref={(el) => (headingsRef.current[2] = el)}
            className="uppercase tracking-tighter absolute top-[45%] left-[50%] -translate-x-1/2 font-bold text-[8vw] leading-none text-nowrap"
          >
            Just a port
          </h1>
          <h1
            ref={(el) => (headingsRef.current[3] = el)}
            className="uppercase tracking-tighter absolute top-[65%] left-1/2 -translate-x-1/2 font-bold text-[8vw] leading-none"
          >
            agent
          </h1>
        </div>
      </div>

      {/* Infinite Menu Overlay */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#121A27] z-[999]">
          <InfiniteMenu items={items} />
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-5 right-5 text-white text-2xl z-[1000]"
          >
            ✕
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default HeroSection;
