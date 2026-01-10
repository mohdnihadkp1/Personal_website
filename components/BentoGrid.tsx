import React, { useState, useRef, useEffect } from 'react';
import { PROJECTS, SOCIALS, PORTFOLIO_OWNER, PORTFOLIO_ROLE, PORTFOLIO_BIO, QUOTES } from '../constants';
import ProjectCard from './ProjectCard';
import ContactForm from './ContactForm';
import CVCard from './CVCard';
import { MapPin, Globe, Github, Linkedin, Mail, Sparkles, Instagram, X, Quote } from 'lucide-react';
import { Project } from '../types';

// Custom SVG Icons
const WhatsappIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382C17.153 14.202 15.586 13.386 15.293 13.294C15.001 13.2 14.788 13.202 14.575 13.52C14.362 13.838 13.751 14.654 13.565 14.886C13.379 15.118 13.193 15.146 12.874 14.966C12.555 14.786 11.527 14.414 10.309 13.256C9.364 12.358 8.727 11.248 8.541 10.908C8.355 10.568 8.521 10.372 8.681 10.202C8.825 10.048 9.001 9.802 9.161 9.602C9.321 9.402 9.375 9.256 9.481 9.042C9.587 8.828 9.533 8.642 9.453 8.482C9.373 8.322 8.735 6.634 8.469 5.962C8.216 5.334 7.962 5.418 7.776 5.418C7.603 5.418 7.403 5.418 7.203 5.418C7.003 5.418 6.671 5.498 6.392 5.83C6.113 6.162 5.328 6.948 5.328 8.548C5.328 10.148 6.419 11.696 6.579 11.936C6.739 12.176 8.72 15.484 11.899 16.924C14.653 18.17 15.225 17.93 15.823 17.85C16.488 17.76 17.869 16.966 18.161 16.082C18.453 15.198 18.453 14.432 18.373 14.288C18.293 14.144 18.08 14.054 17.761 13.874H17.472Z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M12.0001 0.000183105C5.37209 0.000183105 0 5.37227 0 12.0003C0 14.1163 0.555054 16.0883 1.50305 17.7943L0.00012207 24.0002L6.34709 22.3832C7.99409 23.3322 9.92309 23.8862 12.0001 23.8862C18.6271 23.8862 23.9991 18.5143 23.9991 11.8862C23.9991 5.25827 18.6271 -0.000816895 12.0001 -0.000816895V0.000183105ZM12.0001 21.8863C10.2031 21.8863 8.50809 21.4023 7.05109 20.5543L6.71109 20.3523L2.94612 21.3143L3.92909 17.6533L3.71409 17.2943C2.79309 15.7563 2.25709 13.9453 2.25709 11.9993C2.25709 6.62727 6.62709 2.25727 12.0001 2.25727C17.3731 2.25727 21.7431 6.62727 21.7431 11.9993C21.7431 17.3713 17.3731 21.8863 12.0001 21.8863Z" />
    </svg>
)

const PinterestIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.017 0C5.396 0 0.029 5.367 0.029 11.987C0.029 16.891 3.093 21.141 7.426 22.996C7.391 22.138 7.337 20.677 7.452 19.654C7.558 18.718 8.163 16.155 8.163 16.155C8.163 16.155 7.979 15.789 7.979 15.247C7.979 14.296 8.531 13.586 9.219 13.586C9.805 13.586 10.089 14.026 10.089 14.553C10.089 15.141 9.713 16.02 9.518 16.836C9.355 17.518 9.863 18.075 10.536 18.075C11.751 18.075 12.685 16.793 12.685 14.945C12.685 13.303 11.503 12.161 9.846 12.161C7.926 12.161 6.799 13.601 6.799 15.224C6.799 15.845 7.038 16.513 7.34 16.879C7.399 16.95 7.408 16.989 7.389 17.067C7.335 17.29 7.214 17.787 7.195 17.866C7.167 17.982 7.098 18.009 6.985 17.957C5.419 17.231 4.437 15.633 4.437 13.498C4.437 10.36 6.708 8.632 9.946 8.632C12.545 8.632 14.566 10.485 14.566 13.342C14.566 16.273 12.721 18.63 10.607 18.63C9.537 18.63 8.529 18.076 8.187 17.424L7.545 19.85C7.307 20.757 6.666 21.943 6.136 22.793C7.755 23.568 9.577 24 11.5 24C18.121 24 23.488 18.633 23.488 12.013C23.488 5.392 18.121 0 12.017 0Z" />
    </svg>
)

const SocialIcon = ({ name, className }: { name: string, className?: string }) => {
    switch(name) {
        case 'Github': return <Github className={className} />;
        case 'Twitter': case 'X': return <X className={className} />;
        case 'Linkedin': return <Linkedin className={className} />;
        case 'Mail': return <Mail className={className} />;
        case 'Instagram': return <Instagram className={className} />;
        case 'Whatsapp': return <WhatsappIcon className={className} />;
        case 'Pinterest': return <PinterestIcon className={className} />;
        default: return <Globe className={className} />;
    }
}

interface BentoGridProps {
    onExpandProject?: (imageUrl: string) => void;
    onSelectProject?: (project: Project) => void;
    isProfileOpen: boolean;
    onToggleProfile: (isOpen: boolean) => void;
    onOpenCV: () => void;
}

const BentoGrid: React.FC<BentoGridProps> = ({ onExpandProject, onSelectProject, isProfileOpen, onToggleProfile, onOpenCV }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [locationActive, setLocationActive] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const profileImage = "assets/profile_pic.png"; 

  useEffect(() => {
    const interval = setInterval(() => {
        setQuoteIndex(prev => (prev + 1) % QUOTES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (modalRef.current) {
        const { left, top, width, height } = modalRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 15; 
        const y = (e.clientY - top - height / 2) / 15;
        setMousePosition({ x, y });
    }
  };
  
  const handleLocationClick = () => {
    setLocationActive(true);
    setTimeout(() => setLocationActive(false), 2000);
  };
  
  const closeProfile = (e: React.MouseEvent) => {
      e.stopPropagation();
      window.history.back();
  }

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        {/* Subtle, Continuously Animating Background Effect */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl opacity-20 pointer-events-none">
            {/* Slow Moving Gradients */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
            <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-secondary/20 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-purple-500/10 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000"></div>
            
            {/* Animated Grid Overlay */}
            <div 
                className="absolute inset-0 opacity-[0.1]" 
                style={{ 
                    backgroundImage: 'linear-gradient(to right, rgba(78, 159, 61, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(78, 159, 61, 0.3) 1px, transparent 1px)', 
                    backgroundSize: '40px 40px',
                    maskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black, transparent)'
                }}
            />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6 auto-rows-[minmax(180px,auto)]">
            
            {/* HERO SECTION */}
            <div className="glass-panel col-span-1 md:col-span-2 row-span-2 flex flex-col justify-between rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-primary/20 blur-[100px] animate-pulse-slow" />
            <div className="absolute bottom-0 left-0 -ml-10 -mb-10 h-40 w-40 rounded-full bg-secondary/20 blur-[80px] animate-blob" />
            
            <div className="relative z-10">
                <div className="mb-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-accent w-fit backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                    Available for work
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-gray-900 dark:text-white leading-[1.1] mb-2 transition-colors">
                <br/> {/* Hello , I am*/}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x inline-block pb-2 bg-[length:200%_auto]">
                    {PORTFOLIO_OWNER}
                </span>.
                </h1>
            </div>
            
            <div className="relative z-10 mt-6 md:mt-8">
                <p className="max-w-lg text-lg text-gray-700 dark:text-gray-300/90 md:text-xl font-light leading-relaxed tracking-wide transition-colors">
                {PORTFOLIO_ROLE}. <br/>
                A developer who thinks in components and dreams in neon.
                </p>
            </div>
            </div>

            {/* COMBINED ABOUT ME & SOCIALS */}
            <div className="glass-panel col-span-1 md:col-span-2 row-span-2 relative overflow-hidden rounded-3xl p-6 md:p-8 group flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <div 
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
                    style={{ 
                        backgroundImage: 'linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)', 
                        backgroundSize: '20px 20px' 
                    }} 
                />

                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
                        <div 
                            className="relative shrink-0 cursor-pointer animate-fade-in-up"
                            onClick={() => onToggleProfile(true)}
                        >
                            <div className="absolute inset-[-4px] rounded-full border border-dashed border-gray-400/50 dark:border-white/20 animate-spin-slow" />
                            <div className="absolute inset-[-8px] rounded-full border border-primary/20 border-t-primary/60 animate-spin-reverse-slow" />
                            
                            <div className="relative h-28 w-28 md:h-32 md:w-32 overflow-hidden rounded-full border-2 border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                                <img 
                                    src={profileImage} 
                                    alt="Profile" 
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent top-[-100%] group-hover:animate-scan" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <span className="font-mono text-xs text-primary font-bold tracking-widest">[EXPAND]</span>
                                </div>
                            </div>
                            
                            <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-black flex items-center justify-center border border-white/10">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="mb-2 flex items-center justify-center md:justify-start gap-2">
                                <span className="font-mono text-xs text-primary tracking-wider uppercase bg-primary/10 px-2 py-0.5 rounded">
                                    Identity: Verified
                                </span>
                                <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-300/50 to-transparent dark:from-white/20" />
                            </div>
                            
                            <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
                                About Me
                                <Sparkles size={18} className="text-accent animate-pulse" />
                            </h3>
                            
                            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 md:text-base mb-4 font-light">
                                {PORTFOLIO_BIO}
                            </p>
                        </div>
                    </div>

                    <div className="relative bg-black/5 dark:bg-white/5 rounded-xl p-4 md:p-6 mb-6 border border-black/5 dark:border-white/5 backdrop-blur-sm min-h-[120px] flex flex-col justify-center transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/10">
                        <Quote className="absolute top-2 left-2 text-primary/20 h-6 w-6 md:h-8 md:w-8 transform -scale-x-100" />
                        <div key={quoteIndex} className="animate-in fade-in slide-in-from-bottom-2 duration-700">
                            <p className="text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-300 italic text-center px-4 font-medium leading-relaxed">
                                "{QUOTES[quoteIndex].text}"
                            </p>
                            <p className="text-[10px] md:text-xs text-right text-primary font-bold mt-2 tracking-wider uppercase">
                                — {QUOTES[quoteIndex].author}
                            </p>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <div className="grid grid-cols-3 gap-2 border-t border-b border-gray-200 dark:border-white/5 py-4 mb-4">
                            <div className="flex flex-col text-center md:text-left">
                                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Exp</span>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">1+ Years</span>
                            </div>
                            <div className="flex flex-col text-center md:text-left">
                                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Projects</span>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">5+ Ship</span>
                            </div>
                            <div className="flex flex-col text-center md:text-left">
                                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">System</span>
                                <span className="text-sm font-semibold text-green-500">Online</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Connect</h4>
                            <div className="flex gap-2 sm:gap-3 flex-wrap justify-end">
                                {SOCIALS.map((social) => (
                                    <a 
                                        key={social.platform} 
                                        href={social.url} 
                                        target="_blank"
                                        rel="noreferrer"
                                        className="relative group/icon flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-xl bg-gradient-to-br from-black/5 to-black/10 dark:from-white/5 dark:to-white/10 text-gray-600 dark:text-gray-400 transition-all hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20 border border-transparent hover:border-primary/30"
                                        title={social.platform}
                                    >
                                        <div className="absolute inset-0 rounded-xl bg-primary/20 blur opacity-0 group-hover/icon:opacity-100 transition-opacity" />
                                        <div className="relative z-10 group-hover/icon:text-primary transition-colors">
                                            <SocialIcon name={social.icon} className="h-4 w-4" /> 
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {PROJECTS.map((project) => (
                <ProjectCard key={project.id} project={project} onExpandImage={onExpandProject} onSelect={onSelectProject} />
            ))}

            <ContactForm />

            <div 
                className={`glass-panel col-span-1 row-span-1 flex flex-col items-center justify-center rounded-3xl p-6 text-center group cursor-pointer relative overflow-hidden transition-all duration-300 ${locationActive ? 'border-primary shadow-lg shadow-primary/20 scale-[1.02]' : 'hover:border-accent/50'}`}
                onClick={handleLocationClick}
            >
                <div className={`absolute inset-0 bg-primary/10 rounded-3xl transition-opacity duration-500 ${locationActive ? 'opacity-100' : 'opacity-0'}`} />
                <div className={`absolute h-full w-full border-4 border-primary/30 rounded-full animate-ping opacity-0 ${locationActive ? 'opacity-50' : ''}`} />

                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 dark:text-blue-400 group-hover:bg-blue-500/20 transition-all duration-300 ${locationActive ? 'bg-primary/20 text-primary scale-110' : ''}`}>
                    <MapPin size={28} className={locationActive ? 'animate-bounce' : ''} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white transition-colors">Chaliyam, Calicut</h3>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors mt-1">Kerala, India</p>
                <div className={`mt-4 h-1 rounded-full bg-gray-400 dark:bg-gray-700 transition-all duration-300 group-hover:w-20 ${locationActive ? 'w-24 bg-primary' : 'w-12 group-hover:bg-accent'}`} />
            </div>

            <CVCard onOpen={onOpenCV} />
            
        </div>
        
        {/* Profile Modal */}
        {isProfileOpen && (
            <div 
                className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-xl transition-all duration-300 animate-in fade-in"
                onClick={closeProfile}
                onMouseMove={handleMouseMove}
            >
                <div 
                    ref={modalRef}
                    className="relative max-w-md w-full mx-4 overflow-hidden rounded-3xl border border-white/20 bg-surface/10 shadow-2xl transition-all duration-100 ease-out p-1 backdrop-blur-3xl"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${-mousePosition.x}deg)`,
                    }}
                >
                    <div className="relative overflow-hidden rounded-[20px] aspect-square group">
                        <img 
                            src={profileImage} 
                            alt="Profile Large" 
                            className="h-full w-full object-cover transition-transform duration-100 ease-out scale-110"
                            style={{
                                transform: `scale(1.15) translate(${-mousePosition.x}px, ${-mousePosition.y}px)`
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                        
                        <div 
                            className="absolute top-10 right-10 p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
                            style={{ transform: `translate(${mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)` }}
                        >
                            <Sparkles className="text-accent" size={24} />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <h2 
                                className="text-4xl font-black text-white mb-2 tracking-tight"
                                style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
                            >
                                {PORTFOLIO_OWNER}
                            </h2>
                            <p 
                                className="text-lg text-gray-300 flex items-center gap-2 font-light"
                                style={{ transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)` }}
                            >
                                <div className="h-1 w-8 bg-accent rounded-full"></div>
                                {PORTFOLIO_ROLE}
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={closeProfile}
                        className="absolute top-4 right-4 rounded-full bg-black/40 p-2 text-white hover:bg-white hover:text-black transition-all border border-white/10 backdrop-blur-md z-10 cursor-pointer hover:rotate-90 duration-300"
                    >
                        <X size={24} />
                    </button>
                </div>
            </div>
        )}
    </div>
  );
};

export default BentoGrid;
