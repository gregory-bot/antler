import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Calendar, MapPin, Phone, Mail } from 'lucide-react';

const Profile = () => {
  const stats = [
    { icon: Calendar, label: "Years in Business", value: "10+" },
    { icon: Users, label: "Happy Customers", value: "500+" },
    { icon: Award, label: "Awards Won", value: "15+" },
    { icon: MapPin, label: "Locations", value: "3" }
  ];

  const team = [
    {
      name: "John Kamsa",
      role: "Founder & CEO",
      image: "https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg",
      description: "With over 15 years of experience in poultry farming, John founded Kamsa Poultry with a vision to provide premium quality poultry products."
    },
    {
      name: "Sarah Kamsa",
      role: "Operations Manager",
      image: "https://images.pexels.com/photos/1300551/pexels-photo-1300551.jpeg",
      description: "Sarah oversees daily operations and ensures our high standards of quality and customer service are maintained across all departments."
    },
    {
      name: "Dr. Michael Chen",
      role: "Veterinary Consultant",
      image: "https://images.pexels.com/photos/1300552/pexels-photo-1300552.jpeg",
      description: "Dr. Chen provides expert veterinary care and ensures the health and welfare of all our poultry through regular health monitoring."
    }
  ];

  return (
    <section id="profile" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            About Kamsa Poultry
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn more about our journey, mission, and the dedicated team behind Kamsa Poultry Farm.
          </p>
        </motion.div>

        {/* Company Overview */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Founded in 2014, Kamsa Poultry Farm began as a small family business with a passion for 
              sustainable poultry farming. Over the years, we have grown into one of the region's most 
              trusted suppliers of premium poultry products.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our commitment to quality, animal welfare, and customer satisfaction has been the 
              cornerstone of our success. We employ modern farming techniques while maintaining 
              traditional values of care and dedication.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">+254 700 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">info@kamsapoultry.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Nairobi, Kenya</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg"
              alt="Kamsa Poultry Farm"
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-green-50 rounded-2xl p-8"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-green-600 text-white rounded-full">
                    <IconComponent className="w-8 h-8" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our dedicated team of professionals brings years of experience and passion to everything we do.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                {member.name}
              </h4>
              <p className="text-green-600 font-medium mb-4">
                {member.role}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profile;