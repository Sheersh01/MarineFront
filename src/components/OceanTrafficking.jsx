import { useState, useEffect, useRef } from 'react';
import { Map as LeafletMap, ChevronDown, Info, AlertTriangle, Activity, Shield, Users } from 'lucide-react';

export default function OceanTraffickingAwarenessPage() {
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
      <NavLink active={activeSection === 'victims'} href="#victims">Human Impact</NavLink>
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
  <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1599881783078-4933df53e3dc?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}></div>
  <div className="container mx-auto px-4 z-20 max-w-3xl fade-element visible">
    <h1 className="text-4xl md:text-5xl font-bold mb-6">Hidden Crisis: The Reality of Human Trafficking on Our Oceans</h1>
    <p className="text-xl mb-8">Exploring the causes, consequences, and solutions to oceanic human trafficking.</p>
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
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Major Human Trafficking Routes Worldwide</h2>
      <p className="text-lg">Explore our interactive map highlighting significant oceanic trafficking routes across the globe. Click on markers to learn more about each route, including origin points, destinations, estimated victims, and law enforcement efforts.</p>
    </div>
    
    <div className="flex flex-wrap gap-3 mb-8 justify-center fade-element visible">
      <FilterButton 
        active={activeFilter === 'all'} 
        onClick={() => setActiveFilter('all')}
      >
        All Routes
      </FilterButton>
      <FilterButton 
        active={activeFilter === 'major'} 
        onClick={() => setActiveFilter('major')}
      >
        Major Routes
      </FilterButton>
      <FilterButton 
        active={activeFilter === 'recent'} 
        onClick={() => setActiveFilter('recent')}
      >
        Recent Cases
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
          <p className="text-sm opacity-70">Displaying {activeFilter === 'all' ? 'all routes' : activeFilter + ' routes'}</p>
        </div>
      </div>
    </div>
  </div>
</section> */}

      {/* Human Impact Section */}
<section id="victims" className="py-20 bg-blue-50">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto mb-12 text-center fade-element visible">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Human Victims of Ocean Trafficking</h2>
      <p className="text-lg text-gray-700">Human trafficking via maritime routes affects countless individuals. Below are just a few of the many vulnerable populations targeted by these criminal networks.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <SpeciesCard 
        image="https://plus.unsplash.com/premium_photo-1683134519713-62a3ff300b34?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Migrant Workers"
        status="Vulnerable"
        statusColor="bg-orange-500"
      >
        Economic migrants seeking better opportunities are often deceived with false promises of legitimate work. Many are forced into debt bondage, working on fishing vessels under dangerous conditions with little to no pay. Physical abuse and isolation at sea prevent escape.
      </SpeciesCard>
      
      <SpeciesCard 
        image="https://plus.unsplash.com/premium_photo-1681841986668-117d7eaab200?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Refugees"
        status="Highly Vulnerable"
        statusColor="bg-red-500"
      >
        People fleeing conflict or persecution are particularly vulnerable to trafficking. Desperate to reach safety, they may entrust themselves to smugglers who later exploit them. Many refugees find themselves trapped in forced labor or sexual exploitation.
      </SpeciesCard>
      
      <SpeciesCard 
        image="https://images.unsplash.com/photo-1483193722442-5422d99849bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Children"
        status="Critical Risk"
        statusColor="bg-red-500"
      >
        Unaccompanied minors are prime targets for traffickers. Children are often transported via maritime routes for exploitation in forced labor, sexual services, or illegal adoption. Their vulnerability and lack of documentation make them easy to control.
      </SpeciesCard>
      
      <SpeciesCard 
        image="https://images.unsplash.com/photo-1611673982501-93cabee16c77?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Women"
        status="High Risk"
        statusColor="bg-red-500"
      >
        Women and girls face heightened risks during maritime transport. Many are trafficked specifically for sexual exploitation or forced marriage. Their movement across borders often involves complex networks operating through coastal areas and ports.
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
          <CauseItem title="Poverty and Economic Inequality">
            Extreme poverty and lack of economic opportunities drive vulnerable populations to seek work abroad, making them susceptible to deceptive recruitment practices.
          </CauseItem>
          
          <CauseItem title="Weak Maritime Governance">
            Inadequate regulation of vessels, corrupt officials, and limited inspection of ships create environments where trafficking can flourish undetected.
          </CauseItem>
          
          <CauseItem title="Demand for Cheap Labor">
            Industries such as fishing, seafood processing, and maritime shipping often seek inexpensive labor, creating markets for trafficked individuals.
          </CauseItem>
          
          <CauseItem title="Conflict and Displacement">
            War, political instability, and natural disasters create refugee populations who are particularly vulnerable to exploitation during maritime migration.
          </CauseItem>
          
          <CauseItem title="Organized Crime Networks">
            Sophisticated criminal organizations operate across borders, utilizing maritime routes for human trafficking due to limited oversight on open waters.
          </CauseItem>
        </ul>
      </div>
      
      <div className="fade-element visible">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <Activity className="mr-3" size={24} />
          Major Consequences
        </h3>
        
        <ul className="space-y-8">
          <ConsequenceItem title="Human Rights Violations">
            Victims suffer severe abuse, including physical violence, sexual assault, forced labor, and deprivation of basic needs.
          </ConsequenceItem>
          
          <ConsequenceItem title="Health Crises">
            Trafficking victims experience multiple health issues including malnutrition, disease, untreated injuries, and severe psychological trauma.
          </ConsequenceItem>
          
          <ConsequenceItem title="Market Distortion">
            Industries using trafficked labor create unfair competition that undermines legitimate businesses and depresses wages.
          </ConsequenceItem>
          
          <ConsequenceItem title="Community Destruction">
            Source communities lose productive members, creating cycles of poverty and vulnerability to further trafficking.
          </ConsequenceItem>
          
          <ConsequenceItem title="Transnational Crime">
            Human trafficking networks often engage in other criminal activities, including drug smuggling, weapons trafficking, and corruption.
          </ConsequenceItem>
        </ul>
      </div>
    </div>
  </div>
</section>

{/* Technologies Section */}
{/* <section id="tech" className="py-20 bg-blue-50">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto mb-12 text-center fade-element visible">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Digital Guardians: Monitoring Maritime Trafficking</h2>
      <p className="text-lg text-gray-700">Advanced technologies have revolutionized how we detect, track, and respond to human trafficking at sea, enabling faster intervention and more effective prevention.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <TechnologyCard 
        icon="satellite"
        title="Satellite Monitoring"
      >
        Earth observation satellites track vessel movements in remote areas where trafficking often occurs. Unusual patterns, such as fishing boats remaining stationary for long periods or meeting with other vessels in open waters, can indicate potential trafficking activities.
      </TechnologyCard>
      
      <TechnologyCard 
        icon="ai"
        title="AI and Machine Learning"
      >
        Artificial intelligence algorithms analyze vessel behavior patterns to identify suspicious activities. Machine learning models can detect when vessels deviate from expected routes or when a ship's reported location doesn't match actual tracking data.
      </TechnologyCard>
      
      <TechnologyCard 
        icon="ship"
        title="AIS Anomaly Detection"
      >
        Automatic Identification System (AIS) data is monitored for suspicious behavior such as transponder deactivation ("going dark"), unusual patterns of rendezvous between vessels, or unauthorized entry into territorial waters.
      </TechnologyCard>
    </div>
    
    <div className="h-96 bg-white rounded-lg shadow-lg overflow-hidden fade-element visible">
      <div className="h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-3">Trafficking Vessel Detection Simulation</h3>
          <p className="text-gray-600 mb-6">Interactive visualization of satellite-based vessel monitoring</p>
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
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Notable Trafficking Cases</h2>
      <p className="text-lg">Examining major human trafficking incidents at sea provides valuable insights into detection, intervention, and prosecution strategies.</p>
    </div>
    
    <div className="space-y-12">
      <CaseStudy 
        title="Thai Fishing Industry Crisis"
        location="Southeast Asian Waters"
        date="2014-2016"
        image1="/api/placeholder/400/300"
        image2="/api/placeholder/400/300"
        alt1="Fishing Vessels in Thailand"
        alt2="Rescued Trafficking Victims"
      >
        <p className="mb-6">One of the largest maritime trafficking operations exposed in recent history involved thousands of migrants from Myanmar, Cambodia, and Laos being forced to work on Thai fishing vessels. Many were kept at sea for years without pay, subjected to physical abuse, and denied basic human rights.</p>
        
        <div className="border-l-2 border-red-500 pl-6 space-y-4">
          <TimelineItem date="2014">
            Media investigations reveal widespread trafficking in Thai fishing fleet.
          </TimelineItem>
          <TimelineItem date="April 2015">
            EU issues "yellow card" warning to Thailand over illegal fishing practices linked to labor abuses.
          </TimelineItem>
          <TimelineItem date="December 2015">
            Mass graves discovered in trafficking camps along Thai-Malaysia border.
          </TimelineItem>
          <TimelineItem date="2018-2019">
            Multiple prosecutions of trafficking networks and implementation of reforms in Thai fishing industry.
          </TimelineItem>
        </div>
      </CaseStudy>
      
      <CaseStudy 
        title="Operation Libertad"
        location="Caribbean and South America"
        date="April 2018"
        image1="/api/placeholder/400/300"
        image2="/api/placeholder/400/300"
        alt1="Coast Guard Vessel"
        alt2="Rescued Trafficking Victims"
      >
        <p className="mb-6">Interpol's Operation Libertad targeted human trafficking networks operating across 13 countries in Central and South America. The operation focused on maritime routes used for transporting victims and resulted in the rescue of nearly 350 victims and arrest of 22 suspected traffickers.</p>
        
        <div className="border-l-2 border-red-500 pl-6 space-y-4">
          <TimelineItem date="April 3-9, 2018">
            Coordinated raids across 13 countries targeting trafficking networks.
          </TimelineItem>
          <TimelineItem date="April 10, 2018">
            350 victims rescued from sexual and labor exploitation, including many transported via maritime routes.
          </TimelineItem>
          <TimelineItem date="April-May 2018">
            22 arrests made across multiple countries for human trafficking offenses.
          </TimelineItem>
          <TimelineItem date="2019">
            Enhanced regional cooperation established for monitoring maritime trafficking routes.
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
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Stopping Maritime Trafficking</h2>
      <p className="text-lg text-gray-700">Comprehensive strategies and innovative approaches are being implemented worldwide to combat human trafficking on our oceans.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <PreventionCard 
        title="International Cooperation"
        icon={<Shield size={40} className="text-red-500" />}
      >
        Enhanced coordination between maritime authorities, border agencies, and law enforcement across multiple countries increases the effectiveness of anti-trafficking operations on the high seas.
      </PreventionCard>
      
      <PreventionCard 
        title="Port Security Measures"
        icon={<Shield size={40} className="text-red-500" />}
      >
        Improved inspection protocols at ports help identify suspicious vessels and detect potential trafficking victims before they disappear into exploitation networks on land.
      </PreventionCard>
      
      <PreventionCard 
        title="Vessel Monitoring Systems"
        icon={<Activity size={40} className="text-red-500" />}
      >
        Mandatory tracking technology on fishing vessels and cargo ships increases transparency and accountability, making it harder for traffickers to operate undetected.
      </PreventionCard>
      
      <PreventionCard 
        title="Seafarer Training"
        icon={<Users size={40} className="text-red-500" />}
      >
        Education programs for maritime industry workers help them identify signs of trafficking and provide protocols for safely reporting suspicious activities or victim indicators.
      </PreventionCard>
      
      <PreventionCard 
        title="Supply Chain Transparency"
        icon={<AlertTriangle size={40} className="text-red-500" />}
      >
        Certification programs and supply chain audits pressure companies to ensure their seafood and maritime shipping partners are free from forced labor and trafficking.
      </PreventionCard>
      
      <PreventionCard 
        title="Economic Development"
        icon={<Info size={40} className="text-red-500" />}
      >
        Addressing poverty and lack of opportunity in source countries reduces vulnerability to trafficking recruitment and provides alternatives to risky migration.
      </PreventionCard>
    </div>
  </div>
</section>

{/* Get Involved Section */}
{/* <section id="involved" className="py-20 bg-blue-700 text-white">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto mb-12 text-center fade-element visible">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Fight Against Human Trafficking</h2>
      <p className="text-lg">Everyone can contribute to preventing trafficking and protecting vulnerable populations. Here's how you can make a difference.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <ActionCard icon="donate" title="Support Anti-Trafficking Organizations">
        Donate to organizations working to combat human trafficking through prevention, victim rescue, rehabilitation services, and advocacy for stronger policies.
      </ActionCard>
      
      <ActionCard icon="volunteer" title="Volunteer Your Skills">
        Offer your professional expertise in areas like legal services, healthcare, language translation, or counseling to organizations supporting trafficking survivors.
      </ActionCard>
      
      <ActionCard icon="education" title="Raise Awareness">
        Learn to recognize the signs of trafficking and educate others through community events, social media, and workplace training programs.
      </ActionCard>
      
      <ActionCard icon="reduce" title="Make Informed Consumer Choices">
        Research companies and choose products with transparent supply chains, particularly for seafood and imported goods that may involve maritime shipping.
      </ActionCard>
    </div>
    
    <div className="max-w-md mx-auto bg-white bg-opacity-10 p-8 rounded-lg fade-element visible">
      <h3 className="text-2xl font-bold mb-4 text-center">Stay Informed</h3>
      <p className="mb-6 text-center">Subscribe to our newsletter for updates on anti-trafficking efforts and opportunities to get involved.</p>
      
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
        <h3 className="text-xl font-bold mb-6">Ocean Trafficking Awareness</h3>
        <p className="text-gray-400 mb-6">Dedicated to educating the public about the causes, consequences, and prevention of human trafficking on our oceans.</p>
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
          <li><a href="#" className="text-gray-400 hover:text-white">International Justice Mission</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">UN Blue Heart Campaign</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Polaris Project</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Human Trafficking Foundation</a></li>
        </ul>
      </div>
      
      <div>
        <h3 className="text-lg font-bold mb-6">Contact Us</h3>
        <address className="not-italic text-gray-400">
          <p className="mb-2">123 Ocean Avenue</p>
          <p className="mb-2">Marine City, MC 10001</p>
          <p className="mb-2">info@oceantraffickingaware.org</p>
          <p>(555) 123-4567</p>
        </address>
      </div>
    </div>
    
    <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
      <p>&copy; 2025 Ocean Trafficking Awareness Initiative. All rights reserved.</p>
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