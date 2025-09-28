import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Catalog', href: '#catalog' },
    { name: 'News', href: '#news' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-green-600 flex items-center justify-center">
                <img 
                  src="https://scontent-mba2-1.xx.fbcdn.net/v/t39.30808-6/301514564_525975076196672_717265853864619536_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeE4ulCmnxF75Ue5vrUjnn3iV-R4x_kOfEhX5HjH-Q58SOgh_1OL7AohLN1vQR4ylgMHM4GF_-6gQIij_hALIPzd&_nc_ohc=A28wB-CohVQQ7kNvwGFnFsf&_nc_oc=AdmIkpGHiqEouN8NcIOI9VUkO0LavEGJPXYIFNITvCfp4oQvaT-4G2T4k1naXMVBW_w&_nc_zt=23&_nc_ht=scontent-mba2-1.xx&_nc_gid=0znRqtd_yAope8kWDXpc8g&oh=00_AfZ7OGtEl3IZS-_CSSvaoqdUvSOXfSgWxBva0lyCF2itbg&oe=68DF22A2" 
                  alt="Kamsa Poultry Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-bold">Kamsa Poultry</span>
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6">Our Services</h3>
            <ul className="space-y-3 text-gray-400">
              <li>Fresh Eggs</li>
              <li>Live Chickens</li>
              <li>Poultry Consultation</li>
              <li>Premium Products</li>
              <li>Training Programs</li>
              <li>24/7 Support</li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-600" />
                <span className="text-gray-400">+254 700 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-600" />
                <span className="text-gray-400">info@kamsapoultry.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-green-600" />
                <span className="text-gray-400">Nairobi, Kenya</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8 text-center"
        >
          <p className="text-gray-400">
            &copy; 2024 Kamsa Poultry Farm. All rights reserved. Built with care for sustainable farming.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;