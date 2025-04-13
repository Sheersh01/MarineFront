import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const ZoomParallax = () => {
  useEffect(() => {
    const lenis = new Lenis();
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    return () => {
      // Cleanup function
      lenis.destroy();
    };
  }, []);
  
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: container, 
    offset: ['start start', 'end end'] 
  });
  
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]); 
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]); 
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]); 
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]); 
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
  
  const pictures = [
    { src: "src/assets/1.jpeg", scale: scale4 },
    { src: "src/assets/2.jpeg", scale: scale5 },
    { src: "src/assets/3.jpg", scale: scale6 },
    { src: "src/assets/6.jpg", scale: scale5 },
    { src: "src/assets/4.jpg", scale: scale6 },
    { src: "src/assets/5.jpg", scale: scale8 },
    { src: "src/assets/7.jpeg", scale: scale9 }
  ];
  
  return (
    <>
      <div 
        ref={container} 
        className="relative h-[300vh] bg-[#121A27] "
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {pictures.map(({ src, scale }, index) => {
            return (
              <motion.div 
                key={index} 
                style={{ scale }} 
                className="w-full h-full absolute top-0 flex items-center justify-center"
              >
                <div className={`relative ${
                  index === 1 ? "top-[-30vh] left-[5vw] w-[35vw] h-[30vh]" :
                  index === 2 ? "top-[-10vh] left-[-25vw] w-[20vw] h-[45vh]" :
                  index === 3 ? "left-[27.5vw] w-[25vw] h-[25vh]" :
                  index === 4 ? "top-[27.5vh] left-[5vw] w-[20vw] h-[25vh]" :
                  index === 5 ? "top-[27.5vh] left-[-22.5vw] w-[30vw] h-[25vh]" :
                  index === 6 ? "top-[22.5vh] left-[25vw] w-[15vw] h-[15vh]" :
                  "w-[25vw] h-[25vh]"
                }`}>
                  <img 
                    src={src} 
                    alt={`parallax image ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ZoomParallax;