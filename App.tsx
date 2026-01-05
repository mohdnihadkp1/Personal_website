import React, { useState, useEffect } from 'react';
import BentoGrid from './components/BentoGrid';
import AIChat from './components/AIChat';
import ContactForm from './components/ContactForm';
import { ArrowUp, Sun, Moon, X, Code, Sparkles, Cpu, Database, Layout, Terminal, Server, Globe } from 'lucide-react';
import { SKILLS, PROJECTS, PORTFOLIO_BIO, PORTFOLIO_OWNER, PORTFOLIO_ROLE } from './constants';
import ProjectCard from './components/ProjectCard';
import { Project, Skill } from './types';

// Typing Effect Component
const TypingEffect: React.FC = () => {
  const roles = ["AI Developer", "Freelancer", "Graphic Designer", "Full-Stack Developer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[currentRoleIndex];
      
      if (isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        setTypingSpeed(50);
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && displayedText === currentRole) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, roles, typingSpeed]);

  return (
    <span className="hidden sm:inline-block min-w-[150px] font-mono text-sm text-gray-500 dark:text-gray-400">
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Map skills to icons
const getSkillIcon = (category: string) => {
    switch(category) {
        case 'frontend': return <Layout size={14} />;
        case 'backend': return <Server size={14} />;
        case 'ai': return <Sparkles size={14} />;
        case 'tools': return <Terminal size={14} />;
        default: return <Code size={14} />;
    }
}

const App: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  // Default to true because HTML has class="dark"
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Modal States
  const [activeModal, setActiveModal] = useState<'work' | 'about' | 'contact' | null>(null);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    // Check initial system preference or class presence if we were persisting it
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNavClick = (e: React.MouseEvent, modal: 'work' | 'about' | 'contact') => {
    e.preventDefault();
    setActiveModal(modal);
  };

  return (
    <div className="min-h-screen w-full bg-background text-gray-900 dark:text-gray-100 selection:bg-secondary/30 selection:text-white transition-colors duration-300 flex flex-col">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <header className="fixed top-0 left-0 right-0 z-40 border-b border-black/5 dark:border-white/5 bg-background/80 backdrop-blur-md transition-colors duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
             <div className="text-xl font-bold tracking-tighter text-gray-900 dark:text-white transition-colors">
                mohdnihadkp
            </div>
            <div className="h-6 w-[1px] bg-gray-300 dark:bg-white/20 hidden sm:block"></div>
            <TypingEffect />
          </div>
         
          <div className="flex items-center gap-6">
            <nav className="hidden gap-6 md:flex text-sm font-medium text-gray-600 dark:text-gray-400">
               <a href="#" onClick={(e) => handleNavClick(e, 'work')} className="hover:text-primary transition-colors cursor-pointer">Work</a>
               <a href="#" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-primary transition-colors cursor-pointer">About</a>
               <a href="#" className="hover:text-primary transition-colors cursor-pointer">Notes</a>
               <a href="#" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-primary transition-colors cursor-pointer">Contact</a>
            </nav>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="rounded-full bg-surface/50 p-2 text-gray-600 hover:text-primary hover:bg-black/5 transition-colors dark:text-gray-400 dark:hover:bg-white/5 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-20 flex-grow">
        <BentoGrid onExpandProject={setExpandedImage} onSelectProject={setSelectedProject} />
      </main>

      <footer className="relative z-10 bg-black text-white border-t border-white/10 transition-colors">
         {/* Feature-rich Tech Stack Marquee */}
         <div className="overflow-hidden py-8 bg-[#0a0a0a] border-b border-white/5 relative">
             <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10"></div>
             <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10"></div>
             
             <div className="flex w-full items-center gap-8 animate-marquee whitespace-nowrap">
                {[...SKILLS, ...SKILLS, ...SKILLS].map((skill, i) => (
                    <div 
                        key={`${skill.name}-${i}`} 
                        className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group cursor-default backdrop-blur-sm"
                    >
                        <div className={`p-2 rounded-full ${skill.category === 'ai' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-primary/20 text-primary'}`}>
                            {getSkillIcon(skill.category)}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold tracking-wide text-gray-200 group-hover:text-white">{skill.name}</span>
                            <span className="text-[10px] uppercase tracking-wider text-gray-500 group-hover:text-primary/80">{skill.category}</span>
                        </div>
                    </div>
                ))}
            </div>
         </div>

        <div className="py-8 text-center text-sm text-gray-500 bg-black">
            <p>&copy; {new Date().getFullYear()} mohdnihadkp. Built with React, Tailwind & Gemini API.</p>
        </div>
      </footer>

      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 left-6 z-50 rounded-full bg-surface border border-black/10 dark:border-white/10 p-3 text-primary shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 cursor-pointer ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>

      <AIChat />

      {/* MODALS */}
      
      {/* Selected Project Details Modal */}
      {selectedProject && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in" onClick={() => setSelectedProject(null)}>
              <div 
                  className="bg-surface w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl relative shadow-2xl border border-white/10 flex flex-col md:flex-row overflow-hidden" 
                  onClick={e => e.stopPropagation()}
              >
                  <button 
                      onClick={() => setSelectedProject(null)} 
                      className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-md cursor-pointer"
                  >
                      <X size={20} />
                  </button>
                  
                  {/* Image Section */}
                  <div className="w-full md:w-1/2 h-64 md:h-auto relative group">
                      <img 
                          src={selectedProject.imageUrl} 
                          alt={selectedProject.title} 
                          className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:hidden"></div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="w-full md:w-1/2 p-8 flex flex-col">
                      <div className="mb-4">
                          <div className="flex flex-wrap gap-2 mb-4">
                              {selectedProject.tags.map(tag => (
                                  <span key={tag} className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full border border-primary/20">
                                      {tag}
                                  </span>
                              ))}
                          </div>
                          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{selectedProject.title}</h2>
                      </div>
                      
                      <div className="prose dark:prose-invert text-sm text-gray-600 dark:text-gray-300 mb-8 flex-grow">
                          <p>{selectedProject.description}</p>
                          <p className="mt-4">
                              Leveraging modern technologies to build scalable and efficient solutions. 
                              This project demonstrates proficiency in full-stack development and attention to UI/UX details.
                          </p>
                      </div>
                      
                      <div className="flex gap-4 mt-auto pt-6 border-t border-gray-200 dark:border-white/10">
                          {selectedProject.link && (
                              <a 
                                  href={selectedProject.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="flex-1 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl text-center font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                              >
                                  <Globe size={18} /> Visit Site
                              </a>
                          )}
                          {selectedProject.githubUrl && (
                              <a 
                                  href={selectedProject.githubUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="flex-1 py-3 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white rounded-xl text-center font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                              >
                                  <Code size={18} /> View Code
                              </a>
                          )}
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Work Modal */}
      {activeModal === 'work' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in" onClick={() => setActiveModal(null)}>
            <div className="bg-surface w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-8 relative shadow-2xl" onClick={e => e.stopPropagation()}>
                <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"><X /></button>
                <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Selected Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {PROJECTS.map(project => (
                        <div key={project.id} className="col-span-1">
                             <ProjectCard 
                                project={{...project, size: 'medium'}} 
                                onExpandImage={setExpandedImage} 
                                onSelect={setSelectedProject}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )}

      {/* About Modal */}
      {activeModal === 'about' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in" onClick={() => setActiveModal(null)}>
            <div className="bg-surface w-full max-w-2xl rounded-3xl p-8 relative shadow-2xl border border-white/10" onClick={e => e.stopPropagation()}>
                <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"><X /></button>
                <div className="flex flex-col items-center text-center">
                    <div className="relative h-32 w-32 mb-6 rounded-full overflow-hidden border-4 border-accent/20">
                         <img src="assets/profile_pic.png" alt="Profile" className="h-full w-full object-cover" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{PORTFOLIO_OWNER}</h2>
                    <p className="text-accent font-medium mb-6">{PORTFOLIO_ROLE}</p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        {PORTFOLIO_BIO}
                    </p>
                    <div className="grid grid-cols-3 gap-4 w-full">
                         <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5">
                             <div className="text-2xl font-bold text-primary">5+</div>
                             <div className="text-xs uppercase tracking-wider opacity-70">Years Exp</div>
                         </div>
                         <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5">
                             <div className="text-2xl font-bold text-primary">20+</div>
                             <div className="text-xs uppercase tracking-wider opacity-70">Projects</div>
                         </div>
                         <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5">
                             <div className="text-2xl font-bold text-primary">100%</div>
                             <div className="text-xs uppercase tracking-wider opacity-70">Committed</div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Contact Modal */}
      {activeModal === 'contact' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in" onClick={() => setActiveModal(null)}>
            <div className="bg-surface w-full max-w-2xl rounded-3xl overflow-hidden relative shadow-2xl border border-white/10 bg-white dark:bg-[#111]" onClick={e => e.stopPropagation()}>
                 <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"><X /></button>
                 <ContactForm />
            </div>
        </div>
      )}

    </div>
  );
};

export default App;