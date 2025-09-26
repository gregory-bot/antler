import React from 'react';
import { motion } from 'framer-motion';
import { Egg, Truck, Shield, Award, Users, Clock } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Egg className="w-12 h-12 text-green-600" />,
      title: "Fresh Eggs",
      description: "Premium quality fresh eggs delivered daily from our free-range chickens.",
      features: ["Free-range chickens", "Daily collection", "Quality assured"]
    },
    {
      icon: <Truck className="w-12 h-12 text-blue-600" />,
      title: "Live Chickens",
      description: "Healthy, well-bred chickens for meat production and breeding purposes.",
      features: ["Healthy breeding", "Various breeds", "Vaccination included"]
    },
    {
      icon: <Shield className="w-12 h-12 text-purple-600" />,
      title: "Poultry Consultation",
      description: "Expert advice on poultry farming, breeding, and disease management.",
      features: ["Expert guidance", "Disease prevention", "Breeding advice"]
    },
    {
      icon: <Award className="w-12 h-12 text-orange-600" />,
      title: "Premium Products",
      description: "High-quality poultry products including processed chicken and specialty items.",
      features: ["Premium quality", "Processed products", "Custom orders"]
    },
    {
      icon: <Users className="w-12 h-12 text-red-600" />,
      title: "Training Programs",
      description: "Comprehensive training programs for aspiring poultry farmers.",
      features: ["Hands-on training", "Expert instructors", "Certificate programs"]
    },
    {
      icon: <Clock className="w-12 h-12 text-indigo-600" />,
      title: "24/7 Support",
      description: "Round-the-clock support for all your poultry farming needs.",
      features: ["24/7 availability", "Emergency support", "Technical assistance"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive poultry solutions tailored to meet your farming and business needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gray-50 rounded-full">
                  {service.icon}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 text-center leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;