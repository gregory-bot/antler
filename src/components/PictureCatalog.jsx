import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const PictureCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'chickens', name: 'Chickens' },
    { id: 'eggs', name: 'Eggs' },
    { id: 'farm', name: 'Farm' },
    { id: 'products', name: 'Products' }
  ];

  const images = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg",
      title: "Free Range Chickens",
      category: "chickens",
      description: "Healthy free-range chickens in natural environment"
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/1300551/pexels-photo-1300551.jpeg",
      title: "Fresh Farm Eggs",
      category: "eggs",
      description: "Premium quality fresh eggs from our farm"
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/1300552/pexels-photo-1300552.jpeg",
      title: "Modern Farm Facility",
      category: "farm",
      description: "State-of-the-art poultry farming facilities"
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/1300553/pexels-photo-1300553.jpeg",
      title: "Organic Feed",
      category: "products",
      description: "Premium organic feed for healthy chickens"
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/1300554/pexels-photo-1300554.jpeg",
      title: "Broiler Chickens",
      category: "chickens",
      description: "High-quality broiler chickens for meat production"
    },
    {
      id: 6,
      src: "https://images.pexels.com/photos/1300555/pexels-photo-1300555.jpeg",
      title: "Egg Collection",
      category: "eggs",
      description: "Daily egg collection process"
    }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  return (
    <section id="catalog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Picture Catalog
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive collection of poultry farm images showcasing our facilities, products, and processes.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => setSelectedImage(image)}
                    className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 p-3 rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-all duration-300"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {image.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {image.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl"
              >
                ×
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg"
              />
              <div className="bg-white p-6 rounded-b-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-600">
                  {selectedImage.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PictureCatalog;