import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import InfiniteMenu from "./InfiniteMenu";
import DashboardAnalysis from "./DashboardAnalysis";
import { useNavigate } from 'react-router-dom';
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const shipRef = useRef(null);
  const containerRef = useRef(null);
  const headingsRef = useRef([]);
  const navbarItemsRef = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const items = [
    {
      image: "./Menu/ship.png",
      link: "/",
      title: "Home",
      description: "Return to the main page",
    },
    {
      image: "./Menu/2.jpg",
      link: "/oil-spills",
      title: "Oil Spills",
      description: "Learn about marine oil pollution impacts",
    },
    {
      image: "./Menu/3.jpg",
      link: "/illegal-fishing",
      title: "Illegal Fishing",
      description: "Discover consequences of unreported fishing",
    },
    {
      image: "./Menu/6.jpg",
      link: "/ocean-trafficking",
      title: "Ocean Trafficking",
      description: "Maritime routes used for illegal activities",
    },
  ];

  // Check login status on component mount and whenever the component is focused
  useEffect(() => {
    const checkLoginStatus = () => {
      // Use the same keys as in the Login component
      const userId = localStorage.getItem('userId');
      const storedUserName = localStorage.getItem('userName');
      
      if (userId && storedUserName) {
        setIsLoggedIn(true);
        setUserName(storedUserName);
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    };
    
    // Check initially
    checkLoginStatus();
    
    // Add event listener for when the window gets focus (user returns from login page)
    window.addEventListener('focus', checkLoginStatus);
    
    // Also check periodically
    const interval = setInterval(checkLoginStatus, 1000);
    
    // Cleanup
    return () => {
      window.removeEventListener('focus', checkLoginStatus);
      clearInterval(interval);
    };
  }, []);

  // Handle GSAP animations
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024 && !showDashboard) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => setAnimationComplete(true),
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

        // Fade in all headings at once
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
          [headingsRef.current[0], headingsRef.current[2]],
          {
            x: (i) => (i === 0 ? 450 : 150),
            duration: 1,
            ease: "power2.out",
          },
          "textMove+=0.5"
        );

        tl.to(
          [headingsRef.current[1], headingsRef.current[3]],
          {
            x: (i) => (i === 0 ? -600 : -400),
            duration: 1,
            ease: "power2.out",
          },
          "textMove+=0.5"
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
          "textMove+=0.5"
        );
      }, containerRef);

      return () => ctx.revert();
    }
  }, [showDashboard]);

  const handleDashboardClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard-analysis');
    } else {
      alert("Please login to access the dashboard.");
    }
  };

  // Updated login click handler
  const handleLoginClick = () => {
    if (isLoggedIn) {
      // If already logged in, log out
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      setIsLoggedIn(false);
      setUserName("");
      alert("You have been logged out successfully.");
    } else {
      // If not logged in, navigate to login page
      navigate('/login');
    }
  };

  // Navigation function to go back to home
  const handleBackToHome = () => {
    setShowDashboard(false);
    navigate("/");
  };

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

  .disabled-nav-item {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .disabled-nav-item:hover::before {
    transform: translateX(-101%);
  }
  
  .disabled-nav-item:hover {
    color: white;
  }
`;

  // Render Dashboard Analysis Component
  if (showDashboard) {
    return (
      <div className="h-full w-full bg-[#121A27] text-white">
        <nav className="flex items-center w-full z-50 bg-[#121A27]">
          <div  className="border-b-2 border-r-2 border-white md:w-[50%] w-[40%] md:py-6 py-2 pl-6 lg:text-[1vw] md:text-[1.2vw] text-[3vw]">
            <h1>DeepLens</h1>
          </div>
          <div 
            onClick={handleLoginClick}
            className="nav-item border-b-2 border-r-2 border-white w-[20%] md:py-6 py-4 text-center lg:text-[1vw] md:text-[1.2vw] text-[1.2vw]"
          >
            <h1>{isLoggedIn ? `Hello, ${userName}` : "Login to Portal"}</h1>
          </div>
        3<div className="border-b-2 border-r-2 border-white md:w-[20%] w-[30%] md:py-6 py-[6px] text-center lg:text-[1vw] md:text-[1.2vw] text-[2vw] nav-item">
            <h1>Dashboard Analytics</h1>
          </div>
          <div onClick={() => setMenuOpen((prev) => !prev)} className="nav-item cursor-pointer border-b-2 border-white w-[10%] md:py-6 py-3 text-center lg:text-[1vw] md:text-[1.2vw] text-[2vw]">
            <h1>Menu</h1>
          </div>
        </nav>

        {/* Use the DashboardAnalysis component and pass the handler for going back */}
        <DashboardAnalysis onBackToHome={handleBackToHome} />
        
        {/* Infinite Menu Overlay */}
        {menuOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-[#121A27] z-[999]">
            <InfiniteMenu items={items} />
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-16 text-white text-2xl z-[1000]"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <style>{navItemStyles}</style>
      <div className="h-full w-full bg-[#121A27] text-white font-[dw] relative overflow-hidden">
        {/* Navbar */}
        <nav className="flex items-center w-full z-50 bg-[#121A27]">
          <div
            ref={(el) => (navbarItemsRef.current[0] = el)}
            className="border-b-2 border-r-2 border-white md:w-[50%] w-[40%] md:py-6 py-2 pl-6 lg:text-[1vw] md:text-[1.2vw] text-[3vw]"
          >
            <h1>DeepLens</h1>
          </div>
          <div
            ref={(el) => (navbarItemsRef.current[1] = el)}
            onClick={handleLoginClick} 
            className="nav-item border-b-2 border-r-2 border-white w-[20%] md:py-6 py-3 text-center lg:text-[1vw] md:text-[1.2vw] text-[1.7vw] cursor-pointer"
          >
            <h1>{isLoggedIn ? `Hello, ${userName}` : "Login to Portal"}</h1>
          </div>
          <div
            ref={(el) => (navbarItemsRef.current[2] = el)}
            onClick={handleDashboardClick} 
            className={`${isLoggedIn ? 'nav-item' : 'nav-item disabled-nav-item'} border-b-2 border-r-2 border-white md:w-[20%] w-[30%] md:py-6 py-[6px] text-center lg:text-[1vw] md:text-[1.2vw] text-[2vw]`}
          >
            <h1>Dashboard Analytics</h1>
          </div>
          <div
            onClick={() => setMenuOpen((prev) => !prev)}
            ref={(el) => (navbarItemsRef.current[3] = el)}
            className="nav-item cursor-pointer border-b-2 border-white w-[10%] md:py-6 py-3 text-center lg:text-[1vw] md:text-[1.2vw] text-[2vw]"
          >
            Menu
          </div>
        </nav>

        {/* Hero Section */}
        <div ref={containerRef} className="relative h-screen">
          {/* Image */}
          <img
            loading="lazy" 
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
              className="absolute top-5 right-16 text-white text-2xl z-[1000]"
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