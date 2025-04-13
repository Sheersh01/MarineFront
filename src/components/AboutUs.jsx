import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Ship, Anchor, Award, TrendingUp, FileText, Users, Briefcase, Calendar, CheckCircle } from 'lucide-react';
import SplitType from 'split-type';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutCompany = () => {
  const headingRef = useRef(null);
  const statsRef = useRef(null);
  const timelineRef = useRef(null);
  
  useEffect(() => {
    // Animate main heading with split text
    if (headingRef.current) {
      const text = new SplitType(headingRef.current, { types: 'words, chars' });
      
      gsap.from(text.chars, {
        opacity: 0,
        y: 20,
        stagger: 0.02,
        duration: 0.8,
        ease: "power4.out",
        delay: 0.3
      });
    }
    
    // Animate stats with counting effect
    if (statsRef.current) {
      const statElements = statsRef.current.querySelectorAll('.stat-value');
      
      statElements.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-value'));
        
        gsap.fromTo(
          stat,
          { textContent: 0 },
          {
            duration: 2.5,
            textContent: target,
            ease: "power2.out",
            snap: { textContent: 1 },
            stagger: 0.25,
            scrollTrigger: {
              trigger: stat,
              start: "top 80%",
            },
          }
        );
      });
    }
    
    // Animate timeline
    if (timelineRef.current) {
      const years = timelineRef.current.querySelectorAll('.timeline-year');
      
      gsap.from(years, {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 75%",
        }
      });
    }
  }, []);

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };
  
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  return (
    <div className="bg-[#121A27] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-24 px-4">
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Anchor className="text-cyan-400 mb-6" size={48} />
          </motion.div>
          
          <h1 
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            Biggest Independent Ship Agency in Ukraine
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl text-cyan-100 max-w-3xl mx-auto mb-10"
          >
            Fast-growing Port Agency established in 2014, setting new standards of performance and providing unique information across all major Ukrainian sea and river ports.
          </motion.p>
        </div>
        
        {/* Background blur effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-cyan-500 opacity-10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Key Stats Section */}
      <div ref={statsRef} className="py-16 px-4 bg-[#1a2436] bg-opacity-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="stat-value text-4xl md:text-5xl font-bold text-cyan-400" data-value="400">0</div>
              <p className="text-sm md:text-base mt-2 text-gray-300">Port calls</p>
            </div>
            <div className="text-center">
              <div className="stat-value text-4xl md:text-5xl font-bold text-cyan-400" data-value="850">0</div>
              <p className="text-sm md:text-base mt-2 text-gray-300">Ships handled</p>
            </div>
            <div className="text-center">
              <div className="stat-value text-4xl md:text-5xl font-bold text-cyan-400" data-value="70">0</div>
              <p className="text-sm md:text-base mt-2 text-gray-300">Employees</p>
            </div>
            <div className="text-center">
              <div className="stat-value text-4xl md:text-5xl font-bold text-cyan-400" data-value="65">0</div>
              <p className="text-sm md:text-base mt-2 text-gray-300">Freight turnover, thousand tons</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Services Section */}
      <div className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
            variants={fadeInVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-cyan-200 max-w-2xl mx-auto">Comprehensive shipping and port agency services to meet all your maritime needs</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="col-span-1 md:col-span-2 lg:col-span-2"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Ship className="text-cyan-400 mr-2" size={24} />
                <span>Agency Services</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "FULL PORT AGENCY",
                  "PROTECTING AGENCY",
                  "SHIP'S SUPPLY",
                  "CREW CHANGE",
                  "CLEANING HOLDS/TANKS",
                  "SHIP'S REPAIR"
                ].map((service, index) => (
                  <motion.div
                    key={`service-${index}`}
                    variants={itemVariants}
                    className="bg-[#1a2436] bg-opacity-30 p-4 rounded-lg border border-[#2a3547] flex items-center"
                  >
                    <CheckCircle className="text-cyan-400 mr-3" size={20} />
                    <span>{service}</span>
                  </motion.div>
                ))}
              </div>
              
           
            </motion.div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <FileText className="text-cyan-400 mr-2" size={24} />
                <span>Research Division</span>
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  "LINE-UP",
                  "TERMINALS",
                  "ICE CAMPAIGN",
                  "PORT DUES",
                  "LOAD RATES",
                  "ANALYTICS"
                ].map((service, index) => (
                  <motion.div
                    key={`research-${index}`}
                    variants={itemVariants}
                    className="bg-[#1a2436] bg-opacity-30 p-4 rounded-lg border border-[#2a3547] flex items-center"
                  >
                    <CheckCircle className="text-cyan-400 mr-3" size={20} />
                    <span>{service}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* History Timeline Section */}
      <div className="py-20 px-4 bg-[#121A27] shadow-inner">
        <div className="container mx-auto">
          <motion.div
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
            variants={fadeInVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Dynamic History</h2>
            <p className="text-cyan-200 max-w-2xl mx-auto">Our journey of growth and excellence since 2014</p>
          </motion.div>
          
          <div ref={timelineRef} className="flex justify-between flex-wrap max-w-4xl mx-auto">
            {[2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021].map((year, index) => (
              <motion.div 
                key={`year-${year}`}
                className="timeline-year mb-10 px-4 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 rounded-full bg-[#1a2436] flex items-center justify-center mx-auto mb-3 border-2 border-cyan-700 shadow-md shadow-cyan-900/20">
                  <Calendar size={24} className="text-cyan-400" />
                </div>
                <div className="text-xl font-bold">{year}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Awards Section */}
      <div className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 max-w-3xl mx-auto"
            variants={containerVariants}
          >
            <div className="text-center mb-8">
              <Award className="inline-block text-cyan-400 mb-4" size={40} />
              <h2 className="text-3xl md:text-4xl font-bold">National Ratings and Awards</h2>
            </div>
            
            <div className="text-center mb-10">
              <motion.div 
                variants={itemVariants}
                className="mb-4 bg-[#1a2436] bg-opacity-30 rounded-lg py-3 px-6 inline-block mx-2"
              >
                №1 Port agent for agri-products
              </motion.div>
              <motion.div 
                variants={itemVariants}
                className="mb-4 bg-[#1a2436] bg-opacity-30 rounded-lg py-3 px-6 inline-block mx-2"
              >
                №1 Port agent for liquid cargoes
              </motion.div>
              <motion.div 
                variants={itemVariants}
                className="mb-4 bg-[#1a2436] bg-opacity-30 rounded-lg py-3 px-6 inline-block mx-2"
              >
                General agents for vessel owners
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-[#1a2436] bg-opacity-40 rounded-xl overflow-hidden border border-[#2a3547]"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#1a2436] bg-opacity-50">
                    <th className="py-4 px-6 font-semibold">Year</th>
                    <th className="py-4 px-6 font-semibold">Award</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { year: 2017, award: "National Maritime Rating" },
                    { year: 2018, award: "Ship agent 2018 in Ukraine" },
                    { year: 2019, award: "National Maritime Rating" },
                    { year: 2020, award: "Industry Leader 2020" },
                    { year: 2021, award: "Agent of the Year" }
                  ].map((item, index) => (
                    <motion.tr 
                      key={`award-${index}`}
                      variants={itemVariants}
                      className={index % 2 === 0 ? "bg-[#1a2436] bg-opacity-20" : ""}
                    >
                      <td className="py-4 px-6 border-t border-[#2a3547]">{item.year}</td>
                      <td className="py-4 px-6 border-t border-[#2a3547]">{item.award}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Business Highlights */}
      <div className="py-20 px-4 bg-[#121A27] bg-opacity-30 relative">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-[#121A27] to-transparent opacity-50"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        ></motion.div>
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <motion.h2 
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-md"
              >
                Our Business Highlights
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="text-cyan-100 mb-8 text-lg"
              >
                Since our establishment in 2014, Stark Shipping has grown to become the leading independent ship agency in Ukraine, with multiple offices across the country's sea and river ports.
              </motion.p>
              
              {[
                { icon: <Briefcase size={20} />, title: "8 Offices in Ukraine", subtitle: "Strategic presence in all major ports" },
                { icon: <Users size={20} />, title: "70+ Employees", subtitle: "Including 10+ dedicated IT specialists" },
                { icon: <TrendingUp size={20} />, title: "Market Leader", subtitle: "In providing analytics research and export/import statistics" }
              ].map((item, index) => (
                <motion.div 
                  key={`highlight-${index}`}
                  variants={itemVariants}
                  className="flex items-center mb-4 group"
                  whileHover={{ x: 8, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-[#1a2436] flex items-center justify-center mr-4 shadow-md shadow-cyan-900/10 border border-[#2a3547] group-hover:border-cyan-700/50 transition-all duration-300"
                    whileHover={{
                      boxShadow: "0 0 15px rgba(8, 145, 178, 0.3)",
                    }}
                  >
                    <motion.div 
                      className="text-cyan-400"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.div>
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-xl group-hover:text-cyan-300 transition-colors duration-300">{item.title}</h3>
                    <p className="text-cyan-200">{item.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              variants={itemVariants}
              className="bg-[#1a2436] bg-opacity-40 p-8 rounded-xl border border-[#2a3547] shadow-lg hover:shadow-cyan-900/20 transition-all duration-500"
              whileHover={{
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 182, 255, 0.15)",
                borderColor: "rgba(56, 189, 248, 0.2)"
              }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <motion.div
                  animate={{ 
                    y: [0, -4, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="text-cyan-400 mr-3"
                >
                  <Ship size={24} className="drop-shadow-lg" />
                </motion.div>
                <span>Long and Successful Cooperation</span>
              </h3>
              
              <p className="text-cyan-100 mb-6">
                Our commitment to excellence and unique approach to shipping services has earned us the trust of numerous international clients and partners.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                {[1, 2, 3, 4, 5, 6].map(item => (
                  <motion.div 
                    key={`client-${item}`}
                    className="bg-[#1a2436] bg-opacity-30 h-16 rounded flex items-center justify-center shadow-inner border border-transparent hover:border-cyan-800/30 transition-all duration-300"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(26, 36, 54, 0.5)",
                      boxShadow: "0 10px 15px -3px rgba(0, 182, 255, 0.1), 0 4px 6px -2px rgba(0, 182, 255, 0.05)"
                    }}
                  >
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1a3152] to-cyan-900 flex items-center justify-center shadow-md"
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 15px rgba(8, 145, 178, 0.4)"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Briefcase size={16} className="text-cyan-300" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-0.5 bg-gradient-to-r from-transparent via-cyan-700/30 to-transparent mt-8 rounded-full"
              ></motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-center mt-6"
              >
                <button className="bg-gradient-to-r from-cyan-800 to-cyan-900 hover:from-cyan-700 hover:to-cyan-800 text-cyan-100 px-6 py-2 rounded-lg shadow-lg hover:shadow-cyan-700/20 transition-all duration-300 border border-cyan-700/30 hover:border-cyan-600/50">
                  View All Partners
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
    
    </div>
  );
};

export default AboutCompany;