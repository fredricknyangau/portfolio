
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const navItems = ['home', 'about', 'skills', 'projects', 'contact'];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'glass-effect border-b shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="text-2xl font-bold gradient-text">Portfolio</div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                  activeSection === item
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-foreground hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {item}
              </button>
            ))}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg glass-effect border hover:scale-105 transition-all duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden glass-effect rounded-2xl mb-6 p-6 border">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left py-4 px-6 rounded-xl transition-all duration-300 capitalize ${
                    activeSection === item
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
