import { useState, useEffect, useRef } from 'react';
import { Map as LeafletMap, ChevronDown, Info, AlertTriangle, Activity, Shield, Users } from 'lucide-react';

export default function OilSpillAwarenessPage() {
  const [activeSection, setActiveSection] = useState('hero');
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Scroll to section when Learn More button is clicked
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Handle scroll animation
  useEffect(() => {
    // Initial load - make all elements visible that are in the viewport
    const fadeElements = document.querySelectorAll('.fade-element');
    fadeElements.forEach(element => {
      // Make all elements initially visible to fix the issue
      element.classList.add('visible');
    });
    
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = '';
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      
      if (current !== activeSection) {
        setActiveSection(current);
      }
      
      // Animate elements when they come into view
      const fadeElements = document.querySelectorAll('.fade-element');
      fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < window.innerHeight - 100) {
          element.classList.add('visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Trigger initial scroll event to activate elements in view
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#141A1A] text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-xl font-bold">Home</a>
          <div className="hidden md:flex space-x-6">
            <NavLink active={activeSection === 'map'} href="#map">Interactive Map</NavLink>
            <NavLink active={activeSection === 'marine'} href="#marine">Marine Life</NavLink>
            <NavLink active={activeSection === 'causes'} href="#causes">Causes</NavLink>
            <NavLink active={activeSection === 'tech'} href="#tech">Technologies</NavLink>
            <NavLink active={activeSection === 'cases'} href="#cases">Case Studies</NavLink>
            <NavLink active={activeSection === 'prevention'} href="#prevention">Prevention</NavLink>
            <NavLink active={activeSection === 'involved'} href="#involved">Get Involved</NavLink>
          </div>
          <button className="md:hidden text-white">
            <ChevronDown size={24} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1667924684630-a3d702d97a38?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}></div>
        <div className="container mx-auto px-4 z-20 max-w-3xl fade-element visible">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Unseen Catastrophes: The Impact of Oil Spills on Our Oceans</h1>
          <p className="text-xl mb-8">Exploring the causes, consequences, and solutions to marine oil pollution.</p>
           
        </div>
      </section>

      {/* Interactive Map Section
      <section id="map" className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center fade-element visible">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Major Oil Spill Incidents Worldwide</h2>
            <p className="text-lg">Explore our interactive map highlighting significant oil spill incidents across the globe. Click on markers to learn more about each event, including the date, location, volume spilled, and the environmental impact.</p>
          </div>
          
          <div className="flex flex-wrap gap-3 mb-8 justify-center fade-element visible">
            <FilterButton 
              active={activeFilter === 'all'} 
              onClick={() => setActiveFilter('all')}
            >
              All Incidents
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'severe'} 
              onClick={() => setActiveFilter('severe')}
            >
              Severe Incidents
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'recent'} 
              onClick={() => setActiveFilter('recent')}
            >
              Recent Incidents
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'americas'} 
              onClick={() => setActiveFilter('americas')}
            >
              Americas
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'europe'} 
              onClick={() => setActiveFilter('europe')}
            >
              Europe
            </FilterButton>
            <FilterButton 
              active={activeFilter === 'asia'} 
              onClick={() => setActiveFilter('asia')}
            >
              Asia & Pacific
            </FilterButton>
          </div>
          
          <div className="h-96 md:h-[600px] rounded-lg overflow-hidden fade-element visible bg-blue-900 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <LeafletMap size={48} className="mx-auto mb-4" />
                <p className="text-lg">Interactive Map Visualization</p>
                <p className="text-sm opacity-70">Displaying {activeFilter === 'all' ? 'all incidents' : activeFilter + ' incidents'}</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Marine Life Section */}
      <section id="marine" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center fade-element visible">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Victims Beneath the Waves</h2>
            <p className="text-lg text-gray-700">Oil spills have devastating effects on marine ecosystems. Below are just a few of the many species affected by these environmental disasters.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SpeciesCard 
              image="https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              title="Sea Turtles"
              status="Endangered"
              statusColor="bg-red-500"
            >
              Oil can coat sea turtles, affecting their ability to swim and breathe. When they surface for air, they may inhale oil, causing respiratory problems. Ingestion of oil-contaminated food can lead to digestive issues and organ damage.
            </SpeciesCard>
            
            <SpeciesCard 
              image="https://plus.unsplash.com/premium_photo-1664303478026-d4030f79eda4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              title="Dolphins"
              status="Vulnerable"
              statusColor="bg-orange-500"
            >
              Dolphins may ingest oil directly or through contaminated prey. This can lead to immune system suppression, reproductive disorders, and lung disease. Oil exposure can also affect their ability to communicate and navigate.
            </SpeciesCard>
            
            <SpeciesCard 
              image="https://images.unsplash.com/photo-1621822602079-26c868d43ba2?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              title="Seabirds"
              status="Threatened"
              statusColor="bg-yellow-500"
            >
              Oil destroys the waterproofing and insulation provided by feathers, leading to hypothermia. Birds may also ingest oil while preening, causing internal damage. Many die from exposure, starvation, or drowning.
            </SpeciesCard>
            
            <SpeciesCard 
              image="https://plus.unsplash.com/premium_photo-1661841439995-1706237c83dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              title="Coral Reefs"
              status="Endangered"
              statusColor="bg-red-500"
            >
              Oil can smother coral reefs, blocking light and nutrients. Toxic components in oil can damage coral tissue and affect reproduction. Recovery can take decades, if it occurs at all.
            </SpeciesCard>
          </div>
        </div>
      </section>

      {/* Rest of sections... */}
      {/* Causes and Consequences Section */}
      <section id="causes" className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center fade-element visible">Causes and Consequences</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="fade-element visible">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <AlertTriangle className="mr-3" size={24} />
                Common Causes
              </h3>
              
              <ul className="space-y-8">
                <CauseItem title="Tanker Accidents">
                  Collisions, groundings, and structural failures of oil tankers can release massive amounts of oil into marine environments.
                </CauseItem>
                
                <CauseItem title="Pipeline Leaks">
                  Aging infrastructure, corrosion, and improper maintenance can lead to pipeline ruptures, often going undetected for extended periods.
                </CauseItem>
                
                <CauseItem title="Offshore Drilling Incidents">
                  Blowouts, equipment failures, and human error during offshore oil extraction can result in catastrophic spills.
                </CauseItem>
                
                <CauseItem title="Illegal Dumping">
                  Deliberate discharge of oil waste by vessels attempting to avoid proper disposal costs contributes to chronic pollution.
                </CauseItem>
                
                <CauseItem title="Natural Seeps">
                  Oil naturally leaks from underwater reservoirs, though at much slower rates than human-caused spills.
                </CauseItem>
              </ul>
            </div>
            
            <div className="fade-element visible">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Activity className="mr-3" size={24} />
                Major Consequences
              </h3>
              
              <ul className="space-y-8">
                <ConsequenceItem title="Ecosystem Disruption">
                  Oil spills destroy habitats and disrupt food chains, causing widespread ecological damage that can persist for decades.
                </ConsequenceItem>
                
                <ConsequenceItem title="Economic Losses">
                  Fishing and tourism industries suffer significant financial impacts, with communities losing livelihoods and economic stability.
                </ConsequenceItem>
                
                <ConsequenceItem title="Health Hazards">
                  Toxic compounds in oil pose health risks to cleanup workers, local residents, and consumers of contaminated seafood.
                </ConsequenceItem>
                
                <ConsequenceItem title="Long-term Contamination">
                  Oil can persist in sediments and continue to release toxins for years, creating chronic pollution issues.
                </ConsequenceItem>
                
                <ConsequenceItem title="Biodiversity Loss">
                  Vulnerable species may face local extinction, reducing genetic diversity and ecosystem resilience.
                </ConsequenceItem>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section
      <section id="tech" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center fade-element visible">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Eyes in the Sky: Monitoring Oil Spills</h2>
            <p className="text-lg text-gray-700">Advanced technologies have revolutionized how we detect, track, and respond to oil spills, enabling faster action and more effective containment.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <TechnologyCard 
              icon="satellite"
              title="Satellite Imaging"
            >
              Earth observation satellites equipped with Synthetic Aperture Radar (SAR) can detect oil slicks day or night, regardless of weather conditions. These systems analyze radar signal changes caused by oil's smoothing effect on water surfaces.
            </TechnologyCard>
            
            <TechnologyCard 
              icon="ai"
              title="AI and Machine Learning"
            >
              Artificial intelligence algorithms process vast amounts of satellite data to identify potential oil spills, distinguish them from natural phenomena, and predict their movement based on ocean currents and weather patterns.
            </TechnologyCard>
            
            <TechnologyCard 
              icon="ship"
              title="AIS Vessel Tracking"
            >
              Automatic Identification System (AIS) data allows for tracking of vessels and correlating their movements with detected oil slicks, helping to identify potential sources of illegal discharges or accidents.
            </TechnologyCard>
          </div>
          
          <div className="h-96 bg-white rounded-lg shadow-lg overflow-hidden fade-element visible">
            <div className="h-full flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-3">Oil Spill Detection Simulation</h3>
                <p className="text-gray-600 mb-6">Interactive visualization of satellite-based oil spill detection</p>
                <div className="w-16 h-16 mx-auto rounded-full bg-blue-500 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Case Studies Section
      <section id="cases" className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center fade-element visible">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Lessons from the Past</h2>
            <p className="text-lg">Examining major oil spill incidents provides valuable insights into prevention, response, and recovery strategies.</p>
          </div>
          
          <div className="space-y-12">
            <CaseStudy 
              title="Deepwater Horizon"
              location="Gulf of Mexico"
              date="April 20, 2010"
              image1="/api/placeholder/400/300"
              image2="/api/placeholder/400/300"
              alt1="Deepwater Horizon Burning"
              alt2="Gulf of Mexico Aftermath"
            >
              <p className="mb-6">The Deepwater Horizon disaster released approximately 4.9 million barrels of oil into the Gulf of Mexico, making it the largest accidental marine oil spill in history. The explosion and sinking of the Deepwater Horizon oil rig claimed 11 lives and injured 17 others.</p>
              
              <div className="border-l-2 border-red-500 pl-6 space-y-4">
                <TimelineItem date="April 20, 2010">
                  Explosion and fire on the Deepwater Horizon drilling rig.
                </TimelineItem>
                <TimelineItem date="April 22, 2010">
                  Deepwater Horizon sinks, leaving the well gushing oil at the seabed.
                </TimelineItem>
                <TimelineItem date="July 15, 2010">
                  Well capped after 87 days of continuous oil flow.
                </TimelineItem>
                <TimelineItem date="2012-2018">
                  BP pays over $65 billion in cleanup costs and legal settlements.
                </TimelineItem>
              </div>
            </CaseStudy>
            
            <CaseStudy 
              title="Exxon Valdez"
              location="Prince William Sound, Alaska"
              date="March 24, 1989"
              image1="/api/placeholder/400/300"
              image2="/api/placeholder/400/300"
              alt1="Exxon Valdez Ship"
              alt2="Oiled Shoreline Alaska"
            >
              <p className="mb-6">The Exxon Valdez oil tanker struck Bligh Reef, spilling approximately 11 million gallons of crude oil into Prince William Sound. The remote location, cold temperatures, and rocky shorelines made cleanup extremely challenging.</p>
              
              <div className="border-l-2 border-red-500 pl-6 space-y-4">
                <TimelineItem date="March 24, 1989">
                  Tanker runs aground on Bligh Reef.
                </TimelineItem>
                <TimelineItem date="March 25-30, 1989">
                  Delayed response allows oil to spread over 1,300 miles of shoreline.
                </TimelineItem>
                <TimelineItem date="Summer 1989">
                  More than 11,000 people participate in cleanup efforts.
                </TimelineItem>
                <TimelineItem date="1991">
                  Exxon agrees to pay $1 billion in civil and criminal penalties.
                </TimelineItem>
              </div>
            </CaseStudy>
          </div>
        </div>
      </section> */}

      {/* Prevention Section */}
      <section id="prevention" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center fade-element visible">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Preventing the Next Disaster</h2>
            <p className="text-lg text-gray-700">Comprehensive strategies and innovative technologies are being implemented worldwide to minimize the risk of future oil spills.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PreventionCard 
              title="Strengthened Regulations"
              icon={<Shield size={40} className="text-red-500" />}
            >
              International maritime laws and national regulations have been tightened, imposing stricter safety standards, inspection protocols, and liability provisions for oil transportation and extraction.
            </PreventionCard>
            
            <PreventionCard 
              title="Double-Hull Tankers"
              icon={<Shield size={40} className="text-red-500" />}
            >
              Modern oil tankers feature double-hull designs that provide an additional layer of protection, significantly reducing the risk of oil spillage in case of collisions or groundings.
            </PreventionCard>
            
            <PreventionCard 
              title="Advanced Monitoring Systems"
              icon={<Activity size={40} className="text-red-500" />}
            >
              Real-time monitoring of pipeline pressure, flow rates, and structural integrity allows for early detection of potential leaks or failures before they escalate into major spills.
            </PreventionCard>
            
            <PreventionCard 
              title="Improved Training"
              icon={<Users size={40} className="text-red-500" />}
            >
              Enhanced training programs for oil rig workers, tanker crews, and response teams focus on safety protocols, emergency procedures, and the use of advanced equipment.
            </PreventionCard>
            
            <PreventionCard 
              title="Response Readiness"
              icon={<AlertTriangle size={40} className="text-red-500" />}
            >
              Strategic positioning of containment equipment, dispersants, and trained personnel in high-risk areas ensures rapid response capabilities when incidents occur.
            </PreventionCard>
            
            <PreventionCard 
              title="Alternative Energy"
              icon={<Info size={40} className="text-red-500" />}
            >
              The transition to renewable energy sources is perhaps the most effective long-term solution, reducing dependency on fossil fuels and the associated risks of extraction and transportation.
            </PreventionCard>
          </div>
        </div>
      </section>

      {/* Get Involved Section
      <section id="involved" className="py-20 bg-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12 text-center fade-element visible">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Fight Against Oil Pollution</h2>
            <p className="text-lg">Everyone can contribute to preventing oil spills and protecting our marine ecosystems. Here's how you can make a difference.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <ActionCard icon="donate" title="Support Conservation Organizations">
              Donate to marine conservation groups working on oil spill prevention, response, and ecosystem restoration efforts worldwide.
            </ActionCard>
            
            <ActionCard icon="volunteer" title="Volunteer for Clean-up Efforts">
              Join local beach or shoreline clean-up initiatives that help remove oil residue and other pollutants from marine environments.
            </ActionCard>
            
            <ActionCard icon="education" title="Spread Awareness">
              Share information about oil spills and their impacts through social media, community events, and educational programs.
            </ActionCard>
            
            <ActionCard icon="reduce" title="Reduce Fossil Fuel Consumption">
              Minimize your carbon footprint by using public transportation, carpooling, or switching to renewable energy sources when possible.
            </ActionCard>
          </div>
          
          <div className="max-w-md mx-auto bg-white bg-opacity-10 p-8 rounded-lg fade-element visible">
            <h3 className="text-2xl font-bold mb-4 text-center">Stay Informed</h3>
            <p className="mb-6 text-center">Subscribe to our newsletter for updates on marine conservation efforts and opportunities to get involved.</p>
            
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 py-3 px-4 rounded-l-md text-gray-800 focus:outline-none"
              />
              <button className="bg-red-600 hover:bg-red-700 py-3 px-6 rounded-r-md font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-6">Oil Spill Awareness</h3>
              <p className="text-gray-400 mb-6">Dedicated to educating the public about the causes, consequences, and prevention of marine oil pollution.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Resources</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Latest News</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6">Partner Organizations</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white">Ocean Conservancy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Marine Conservation Institute</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">NOAA</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Smithsonian Ocean</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6">Contact Us</h3>
              <address className="not-italic text-gray-400">
                <p className="mb-2">123 Ocean Avenue</p>
                <p className="mb-2">Marine City, MC 10001</p>
                <p className="mb-2">info@oilspillaware.org</p>
                <p>(555) 123-4567</p>
              </address>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>&copy; 2025 Oil Spill Awareness Initiative. All rights reserved.</p>
            <p className="mt-2">Privacy Policy | Terms of Service | Disclaimer</p>
          </div>
        </div>
      </footer>

      {/* Styles */}
      <style jsx>{`
        :root {
          --primary: #121A27;
          --accent: #E63946;
        }
        
        .fade-element {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-element.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .bg-primary {
          background-color: var(--primary);
        }
      `}</style>
    </div>
  );
}

// Helper Components remain unchanged
function NavLink({ href, active, children }) {
  return (
    <a 
      href={href} 
      className={`font-medium transition-colors ${active ? 'text-red-500' : 'text-white hover:text-gray-300'}`}
    >
      {children}
    </a>
  );
}

function FilterButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded text-sm font-medium transition-colors ${
        active 
          ? 'bg-red-600 text-white' 
          : 'bg-blue-800 text-white hover:bg-blue-700'
      }`}
    >
      {children}
    </button>
  );
}

function SpeciesCard({ image, title, status, statusColor, children }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-2 fade-element visible">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-700 mb-4">{children}</p>
        <span className={`inline-block py-1 px-3 rounded-full text-xs font-semibold text-white ${statusColor}`}>
          {status}
        </span>
      </div>
    </div>
  );
}

function CauseItem({ title, children }) {
  return (
    <li>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-300">{children}</p>
    </li>
  );
}

function ConsequenceItem({ title, children }) {
  return (
    <li>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-300">{children}</p>
    </li>
  );
}
function TechnologyCard({ icon, title, children }) {
  const iconElement = () => {
    switch(icon) {
      case 'satellite':
        return <div className="text-blue-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>;
      case 'ai':
        return <div className="text-blue-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>;
      case 'ship':
        return <div className="text-blue-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 16v3M19 9V6M14 4h6m0 0v12m-5-2h5-5zm0 0H7m7 0l-3 3m0 0l-3-3m3 3V4" />
          </svg>
        </div>;
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg fade-element visible">
      {iconElement()}
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-700">{children}</p>
    </div>
  );
}

function CaseStudy({ title, location, date, image1, image2, alt1, alt2, children }) {
  return (
    <div className="bg-white bg-opacity-10 rounded-lg p-8 fade-element visible">
      <div className="lg:flex">
        <div className="lg:w-2/3 lg:pr-12 mb-8 lg:mb-0">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <div className="flex items-center text-gray-300 mb-6">
            <span className="mr-4">{location}</span>
            <span>{date}</span>
          </div>
          
          {children}
        </div>
        
        <div className="lg:w-1/3 space-y-4">
          <img src={image1} alt={alt1} className="w-full h-48 rounded-lg object-cover" />
          <img src={image2} alt={alt2} className="w-full h-48 rounded-lg object-cover" />
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ date, children }) {
  return (
    <div>
      <h4 className="text-lg font-semibold">{date}</h4>
      <p className="text-gray-300">{children}</p>
    </div>
  );
}

function PreventionCard({ title, icon, children }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md fade-element visible">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-700">{children}</p>
    </div>
  );
}

function ActionCard({ icon, title, children }) {
  const iconElement = () => {
    switch(icon) {
      case 'donate':
        return <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>;
      case 'volunteer':
        return <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>;
      case 'education':
        return <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>;
      case 'reduce':
        return <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>;
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white bg-opacity-10 p-8 rounded-lg text-center fade-element visible">
      <div className="flex justify-center">
        {iconElement()}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p>{children}</p>
    </div>
  );
}