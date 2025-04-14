import { useState, useEffect, useRef } from 'react';
import { Map as LeafletMap, ChevronDown, Info, AlertTriangle, Activity, Shield, Users } from 'lucide-react';

export default function IllegalFishingAwareness() {
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
      <NavLink active={activeSection === 'marine'} href="#marine">Marine Impact</NavLink>
      <NavLink active={activeSection === 'causes'} href="#causes">Root Causes</NavLink>
      <NavLink active={activeSection === 'tech'} href="#tech">Detection Tech</NavLink>
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
  <div
    className="absolute inset-0 bg-cover bg-center z-0"
    style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1668588607110-410a4bf83951?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
    }}
  ></div>
  <div className="container mx-auto px-4 z-20 max-w-3xl fade-element visible">
    <h1 className="text-4xl md:text-5xl font-bold mb-6">
      Silent Plunder: The Crisis of Illegal Fishing & Overfishing
    </h1>
    <p className="text-xl mb-8">
      Exploring the causes, consequences, and solutions to unsustainable fishing practices threatening our oceans.
    </p>
    <button
      onClick={() => scrollToSection('map')}
      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-md transition-all transform hover:-translate-y-1"
    >
      Learn More
    </button>
  </div>
</section>


{/* Interactive Map Section */}
{/* <section id="map" className="py-20 bg-primary text-white">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto mb-12 text-center fade-element visible">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Global Illegal Fishing & Overfishing Hotspots</h2>
      <p className="text-lg">Explore our interactive map highlighting critical illegal fishing and overfishing zones worldwide. Click on markers to learn about fishing intensity, species affected, and conservation status of each region.</p>
    </div>
    
    <div className="flex flex-wrap gap-3 mb-8 justify-center fade-element visible">
      <FilterButton 
        active={activeFilter === 'all'} 
        onClick={() => setActiveFilter('all')}
      >
        All Hotspots
      </FilterButton>
      <FilterButton 
        active={activeFilter === 'severe'} 
        onClick={() => setActiveFilter('severe')}
      >
        Critical Zones
      </FilterButton>
      <FilterButton 
        active={activeFilter === 'recent'} 
        onClick={() => setActiveFilter('recent')}
      >
        Recent Activity
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
          <p className="text-lg">Interactive Fishing Activity Map</p>
          <p className="text-sm opacity-70">Displaying {activeFilter === 'all' ? 'all hotspots' : activeFilter + ' hotspots'}</p>
        </div>
      </div>
    </div>
  </div>
</section> */}

     {/* Marine Life Section */}
<section id="marine" className="py-20 bg-blue-50">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto mb-12 text-center fade-element visible">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Victims of the Silent Crisis</h2>
      <p className="text-lg text-gray-700">Overfishing and illegal fishing have devastating impacts on marine ecosystems. Below are just a few of the many species threatened by these unsustainable practices.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <SpeciesCard 
        image="https://plus.unsplash.com/premium_photo-1708433273440-da1b1601212f?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Bluefin Tuna"
        status="Critically Endangered"
        statusColor="bg-red-600"
      >
        Prized for sushi and sashimi, this iconic species faces population collapse due to intensive commercial fishing. Despite international protections, illegal fishing continues to threaten their recovery, with some populations declining by over 97%.
      </SpeciesCard>
      
      <SpeciesCard 
        image="https://images.unsplash.com/photo-1694217076602-d2a58326f590?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Sharks"
        status="Vulnerable"
        statusColor="bg-orange-500"
      >
        Shark finning and bycatch have devastated shark populations worldwide. As apex predators, their decline disrupts entire marine ecosystems. Over 100 million sharks are killed annually, many through illegal, unreported fishing operations.
      </SpeciesCard>
      
      <SpeciesCard 
        image="https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Sea Turtles"
        status="Endangered"
        statusColor="bg-red-500"
      >
        Often caught as bycatch in commercial fishing operations, all sea turtle species face extinction threats. Illegal fishing in protected areas and use of banned fishing gear continues to impact their dwindling populations.
      </SpeciesCard>
      
      <SpeciesCard 
        image="https://plus.unsplash.com/premium_photo-1661841439995-1706237c83dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Coral Reefs"
        status="Threatened"
        statusColor="bg-yellow-500"
      >
        Destructive fishing practices like bottom trawling and blast fishing physically destroy coral reef habitats. Removing key species disrupts the delicate balance of these ecosystems, leading to cascading effects throughout marine food webs.
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
          Root Causes
        </h3>
        
        <ul className="space-y-8">
          <CauseItem title="Weak Governance">
            Inadequate monitoring, control, and surveillance systems in many coastal nations create opportunities for illegal operators to fish with impunity in protected waters.
          </CauseItem>
          
          <CauseItem title="Growing Global Demand">
            Increasing worldwide demand for seafood drives higher fishing quotas and incentivizes illegal fishing to meet market demands, particularly for high-value species.
          </CauseItem>
          
          <CauseItem title="Harmful Subsidies">
            Government subsidies that reduce operating costs artificially sustain unprofitable fleets, leading to excess fishing capacity and continued exploitation of depleted stocks.
          </CauseItem>
          
          <CauseItem title="Transnational Crime">
            Organized criminal networks exploit weak enforcement to engage in illegal fishing, often alongside other crimes like human trafficking, drug smuggling, and document fraud.
          </CauseItem>
          
          <CauseItem title="Climate Change">
            Shifting ocean conditions force fish populations to migrate, disrupting traditional management zones and creating new opportunities for unregulated fishing.
          </CauseItem>
        </ul>
      </div>
      
      <div className="fade-element visible">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Activity className="mr-3" size={24} />
          Major Consequences
        </h3>
        
        <ul className="space-y-8">
          <ConsequenceItem title="Ecosystem Collapse">
            Overfishing removes key species from marine food webs, triggering trophic cascades that can permanently alter ecosystem structure and function.
          </ConsequenceItem>
          
          <ConsequenceItem title="Economic Losses">
            Illegal fishing costs the global economy up to $23 billion annually, with coastal communities in developing nations bearing the heaviest burden through lost livelihoods.
          </ConsequenceItem>
          
          <ConsequenceItem title="Food Insecurity">
            Depleted fish stocks threaten the primary protein source for over 3 billion people worldwide, with particular impact on coastal developing nations.
          </ConsequenceItem>
          
          <ConsequenceItem title="Human Rights Abuses">
            Illegal fishing operations are frequently linked to forced labor, dangerous working conditions, and human trafficking on distant-water fishing vessels.
          </ConsequenceItem>
          
          <ConsequenceItem title="Biodiversity Loss">
            Unsustainable fishing practices contribute to marine biodiversity decline, reducing ecosystem resilience and evolutionary potential.
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
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Digital Watchdogs: Detecting Illegal Fishing</h2>
      <p className="text-lg text-gray-700">Advanced technologies have revolutionized how we monitor fishing activities across vast ocean areas, enabling authorities to identify illegal operations and enforce regulations.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <TechnologyCard 
        icon="satellite"
        title="Satellite Monitoring"
      >
        Earth observation satellites track vessel movements in remote waters, detecting dark vessels operating without AIS transponders. Radar and optical imagery can identify fishing activities even when vessels attempt to hide their operations.
      </TechnologyCard>
      
      <TechnologyCard 
        icon="ai"
        title="AI and Machine Learning"
      >
        Artificial intelligence algorithms analyze vessel movement patterns to identify suspicious behavior indicative of illegal fishing. These systems can process vast amounts of data to flag potential violations for further investigation.
      </TechnologyCard>
      
      <TechnologyCard 
        icon="ship"
        title="AIS & VMS Tracking"
      >
        Automatic Identification System (AIS) and Vessel Monitoring Systems (VMS) provide real-time tracking of fishing vessels, allowing authorities to verify compliance with closed areas, fishing seasons, and jurisdictional boundaries.
      </TechnologyCard>
    </div>
    
    <div className="h-96 bg-white rounded-lg shadow-lg overflow-hidden fade-element visible">
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-3">Fishing Activity Detection System</h3>
          <p className="text-gray-600 mb-6">Interactive visualization of AI-powered illegal fishing detection</p>
          <div className="w-16 h-16 mx-auto rounded-full bg-blue-500 animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
</section> */}

      {/* Case Studies Section */}
      {/* <section id="cases" className="py-20 bg-primary text-white">
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
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Preventing the Next Crisis</h2>
      <p className="text-lg text-gray-700">Proactive enforcement and sustainable practices are key to preventing overfishing and protecting global fish stocks.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <PreventionCard 
        title="Stricter Maritime Laws"
        icon={<Shield size={40} className="text-red-500" />}
      >
        Governments are strengthening maritime laws and closing loopholes that allow vessels to fish illegally with limited repercussions.
      </PreventionCard>
      
      <PreventionCard 
        title="Catch Documentation Systems"
        icon={<Shield size={40} className="text-red-500" />}
      >
        Mandatory traceability systems track seafood from ocean to plate, reducing the entry of illegal fish into global markets.
      </PreventionCard>
      
      <PreventionCard 
        title="Real-time Surveillance"
        icon={<Activity size={40} className="text-red-500" />}
      >
        Satellite monitoring, drones, and AI-powered tools detect suspicious vessel behavior in restricted and overfished zones.
      </PreventionCard>
      
      <PreventionCard 
        title="Education for Fishers"
        icon={<Users size={40} className="text-red-500" />}
      >
        Training programs educate local fishers on sustainable practices, species protection, and long-term economic resilience.
      </PreventionCard>
      
      <PreventionCard 
        title="Rapid Enforcement Response"
        icon={<AlertTriangle size={40} className="text-red-500" />}
      >
        Coordinated efforts by coast guards and NGOs enable quick action when illegal fishing is detected, deterring repeat offenses.
      </PreventionCard>
      
      <PreventionCard 
        title="Aquaculture & Alternatives"
        icon={<Info size={40} className="text-red-500" />}
      >
        Sustainable aquaculture and plant-based seafood alternatives offer scalable solutions to reduce pressure on wild fish populations.
      </PreventionCard>
    </div>
  </div>
</section>

{/* Get Involved Section
<section id="involved" className="py-20 bg-blue-700 text-white">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto mb-12 text-center fade-element visible">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Fight Against Illegal Fishing</h2>
      <p className="text-lg">Everyone can contribute to safeguarding our oceans from overfishing and illegal practices. Here's how you can take action.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <ActionCard icon="donate" title="Support Marine Watchdogs">
        Donate to organizations that track, expose, and disrupt illegal fishing operations across international waters.
      </ActionCard>
      
      <ActionCard icon="volunteer" title="Volunteer for Coastal Monitoring">
        Participate in community-based patrols and data collection to help identify overfished areas and illegal activity.
      </ActionCard>
      
      <ActionCard icon="education" title="Spread Awareness">
        Share facts about overfishing and its consequences through social media, schools, and local forums to inspire collective action.
      </ActionCard>
      
      <ActionCard icon="reduce" title="Choose Sustainable Seafood">
        Opt for certified sustainable seafood, avoid threatened species, and use guides like Seafood Watch to make informed decisions.
      </ActionCard>
    </div>
    
    <div className="max-w-md mx-auto bg-white bg-opacity-10 p-8 rounded-lg fade-element visible">
      <h3 className="text-2xl font-bold mb-4 text-center">Stay Informed</h3>
      <p className="mb-6 text-center">Subscribe to our newsletter for updates on overfishing prevention efforts and opportunities to get involved.</p>
      
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
        <h3 className="text-xl font-bold mb-6">Combat Illegal Fishing</h3>
        <p className="text-gray-400 mb-6">Raising awareness about the devastating impacts of illegal, unreported, and unregulated (IUU) fishing and overexploitation of marine resources.</p>
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
          <li><a href="#" className="text-gray-400 hover:text-white">Fishing Impacts</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Latest Reports</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Get Involved</a></li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-6">Partner Organizations</h3>
        <ul className="space-y-3">
          <li><a href="#" className="text-gray-400 hover:text-white">Sea Shepherd</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Global Fishing Watch</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Oceana</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">WWF Oceans</a></li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-6">Contact Us</h3>
        <address className="not-italic text-gray-400">
          <p className="mb-2">456 Bluefin Blvd</p>
          <p className="mb-2">Harbor City, HC 20456</p>
          <p className="mb-2">info@stopoverfishing.org</p>
          <p>(555) 789-1234</p>
        </address>
      </div>
    </div>

    <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
      <p>&copy; 2025 Marine Protection Alliance. All rights reserved.</p>
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