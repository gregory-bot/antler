import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Info, Briefcase, Camera, User, Newspaper } from 'lucide-react';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: Info },
    { name: 'Services', href: '#services', icon: Briefcase },
    { name: 'Picture Catalog', href: '#catalog', icon: Camera },
    { name: 'Profile', href: '#profile', icon: User },
    { name: 'News', href: '#news', icon: Newspaper },
  ];

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  // Close nav when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.mobile-nav') && !event.target.closest('.hamburger-btn')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button - Only visible on mobile */}
      <button
        className="hamburger-btn fixed top-4 right-4 z-[60] lg:hidden w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
        onClick={toggleNav}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.div>
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="mobile-nav fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 lg:hidden"
          >
            <div className="p-6">
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-8 pt-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-green-600 flex items-center justify-center">
                  <img 
                    src="https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg" 
                    alt="Kamsa Poultry Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xl font-bold text-gray-800">Kamsa Poultry</span>
              </div>

              {/* Navigation Items */}
              <nav className="space-y-2">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleLinkClick(item.href)}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;