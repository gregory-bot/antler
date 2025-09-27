import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = [
    "https://i.postimg.cc/vTXZpyGy/amsa.jpg",
    "https://i.pinimg.com/736x/49/a6/6b/49a66be88d0d9b9c8dcccb1fee940e80.jpg"
  ];

  // Auto-transition images every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const scrollToCatalog = () => {
    const element = document.querySelector('#catalog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen bg-green-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Kamsa Poultry
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl lg:text-2xl font-semibold text-gray-600 mb-8 leading-relaxed"
            >
              Leading poultry farm providing premium quality chickens, eggs, and poultry products. 
              Committed to sustainable farming practices and exceptional customer service.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                onClick={scrollToCatalog}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 flex items-center justify-center mx-auto lg:mx-0"
              >
                Explore Our Portfolio
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-lg mx-auto">
              {heroImages.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`Kamsa Poultry ${index + 1}`}
                  className={`w-full h-96 object-cover rounded-2xl shadow-2xl transition-opacity duration-1000 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
                  }`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: index === currentImageIndex ? 1 : 0.8, 
                    opacity: index === currentImageIndex ? 1 : 0 
                  }}
                  transition={{ duration: 1 }}
                />
              ))}
              
              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;