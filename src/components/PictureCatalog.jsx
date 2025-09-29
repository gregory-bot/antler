import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, X, ChevronLeft, ChevronRight } from "lucide-react";

const PictureCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [
    { id: "all", name: "All Eggs" },
    { id: "fresh", name: "Fresh Eggs" },
    { id: "organic", name: "Organic Eggs" },
    { id: "free-range", name: "Free Range" },
    { id: "packaging", name: "Packaging" },
  ];

  const images = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg",
      title: "Fresh Farm Eggs",
      category: "fresh",
      description: "Daily collected fresh eggs from our healthy chickens",
    },
    {
      id: 2,
      src: "https://media.istockphoto.com/id/451505631/photo/two-eggs-isolated-on-white.jpg?b=1&s=612x612&w=0&k=20&c=1mYlwbxZN8SNrGiF8vHtdv8HQVKkKnjxqFc-4Uq4414=",
      title: "Organic Brown Eggs",
      category: "organic",
      description: "Premium organic brown eggs with rich nutritional value",
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/29051725/pexels-photo-29051725.jpeg",
      title: "Free Range Eggs",
      category: "free-range",
      description: "Eggs from free-range chickens with natural diet",
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/31424889/pexels-photo-31424889.jpeg",
      title: "Egg Packaging",
      category: "packaging",
      description: "Secure and hygienic egg packaging process",
    },
    {
      id: 5,
      src: "https://i.pinimg.com/736x/f9/51/26/f951260399774b33242b0a6c6498c74f.jpg",
      title: "Egg Quality Check",
      category: "fresh",
      description: "Rigorous quality control for every batch of eggs",
    },
    {
      id: 6,
      src: "https://i.pinimg.com/736x/56/a4/58/56a458568a6036ef69954cf2f0703c78.jpg",
      title: "Egg Cartons",
      category: "packaging",
      description: "Eco-friendly egg cartons for safe transportation",
    },
    {
      id: 7,
      src: "https://i.pinimg.com/736x/3d/bd/fd/3dbdfde20c5dac635f2a30feac7577b3.jpg",
      title: "White Eggs Collection",
      category: "fresh",
      description: "Premium white eggs with excellent shell quality",
    },
    {
      id: 8,
      src: "https://th.bing.com/th/id/R.08defb625bea0c20cbd0288f33dca583?rik=GEkfPVlQeK9F3g&pid=ImgRaw&r=0&sres=1&sresct=1",
      title: "Farm Fresh Delivery",
      category: "fresh",
      description: "Direct farm-to-table fresh egg delivery",
    },
  ];

  const filteredImages =
    selectedCategory === "all"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const openModal = (image) => {
    setSelectedImage(image);
    setCurrentImageIndex(filteredImages.findIndex(img => img.id === image.id));
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectedImage && event.target.classList.contains('modal-backdrop')) {
        closeModal();
      }
    };

    const handleEscape = (event) => {
      if (selectedImage && event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [selectedImage]);

  return (
    <section id="catalog" className="py-8 sm:py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Catalog
          </h2>
          <div className="w-20 h-1 bg-green-600 mx-auto mb-4"></div>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Explore our fresh, organic, and free-range eggs collection.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 border border-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => openModal(image)}
                    className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 p-2 rounded-full shadow-md transform scale-75 group-hover:scale-100 transition-all duration-300"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-base text-gray-900 mb-1">
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
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 modal-backdrop"
            >
              {/* Close Button - Fixed positioning */}
              <button
                onClick={closeModal}
                className="absolute top-16 right-6 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-all duration-200 z-50 shadow-lg"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full transition-all duration-200 z-50 shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full transition-all duration-200 z-50 shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-md lg:max-w-2xl bg-white rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image Container with Responsive Sizing */}
                <div className="max-h-[60vh] overflow-hidden flex items-center justify-center bg-gray-100 p-4">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                
                {/* Content Area */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {selectedImage.description}
                  </p>
                  
                  {/* Image Counter */}
                  <div className="flex justify-center">
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {currentImageIndex + 1} of {filteredImages.length}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Image Indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50">
                {filteredImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setSelectedImage(filteredImages[index]);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      currentImageIndex === index ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PictureCatalog;