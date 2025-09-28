import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Picture Catalog', href: '#catalog' },
    { name: 'Profile', href: '#profile' },
    { name: 'News', href: '#news' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-green-600 flex items-center justify-center">
              <img 
                src="https://scontent-mba2-1.xx.fbcdn.net/v/t39.30808-6/301514564_525975076196672_717265853864619536_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeE4ulCmnxF75Ue5vrUjnn3iV-R4x_kOfEhX5HjH-Q58SOgh_1OL7AohLN1vQR4ylgMHM4GF_-6gQIij_hALIPzd&_nc_ohc=A28wB-CohVQQ7kNvwGFnFsf&_nc_oc=AdmIkpGHiqEouN8NcIOI9VUkO0LavEGJPXYIFNITvCfp4oQvaT-4G2T4k1naXMVBW_w&_nc_zt=23&_nc_ht=scontent-mba2-1.xx&_nc_gid=0znRqtd_yAope8kWDXpc8g&oh=00_AfZ7OGtEl3IZS-_CSSvaoqdUvSOXfSgWxBva0lyCF2itbg&oe=68DF22A2" 
                alt="Kamsa Poultry Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-2xl font-bold text-black">Kamsa Poultry</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button - Hidden on desktop */}
          <button className="lg:hidden p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;