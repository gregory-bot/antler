import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const News = () => {
  const newsArticles = [
    {
      id: 1,
      title: "Kamsa Poultry Wins Regional Excellence Award",
      excerpt: "We are proud to announce that Kamsa Poultry has been recognized with the Regional Excellence Award for outstanding contribution to sustainable poultry farming.",
      image: "https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg",
      date: "2024-01-15",
      author: "John Kamsa",
      category: "Awards",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "New Organic Feed Program Launched",
      excerpt: "Introducing our new organic feed program designed to enhance the nutritional value of our poultry products while maintaining sustainable farming practices.",
      image: "https://images.pexels.com/photos/1300551/pexels-photo-1300551.jpeg",
      date: "2024-01-10",
      author: "Sarah Kamsa",
      category: "Innovation",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "Expansion of Farm Facilities Completed",
      excerpt: "Our state-of-the-art facility expansion is now complete, allowing us to increase production capacity while maintaining our high standards of animal welfare.",
      image: "https://images.pexels.com/photos/1300552/pexels-photo-1300552.jpeg",
      date: "2024-01-05",
      author: "Operations Team",
      category: "Expansion",
      readTime: "5 min read"
    },
    {
      id: 4,
      title: "Community Outreach Program Success",
      excerpt: "Our recent community outreach program has successfully trained over 100 local farmers in modern poultry farming techniques and sustainable practices.",
      image: "https://images.pexels.com/photos/1300553/pexels-photo-1300553.jpeg",
      date: "2023-12-28",
      author: "Community Team",
      category: "Community",
      readTime: "3 min read"
    },
    {
      id: 5,
      title: "Partnership with Local Veterinary College",
      excerpt: "We've established a strategic partnership with the local veterinary college to enhance our animal health programs and provide internship opportunities.",
      image: "https://images.pexels.com/photos/1300554/pexels-photo-1300554.jpeg",
      date: "2023-12-20",
      author: "Dr. Michael Chen",
      category: "Partnership",
      readTime: "4 min read"
    },
    {
      id: 6,
      title: "Holiday Season Special Offers",
      excerpt: "Celebrate the holiday season with our special offers on premium poultry products. Fresh, quality guaranteed products for your festive celebrations.",
      image: "https://images.pexels.com/photos/1300555/pexels-photo-1300555.jpeg",
      date: "2023-12-15",
      author: "Marketing Team",
      category: "Promotions",
      readTime: "2 min read"
    }
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Latest News
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest news, achievements, and developments at Kamsa Poultry Farm.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(article.date)}
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {article.author}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                  {article.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center">
                    <Tag className="w-4 h-4 mr-1" />
                    {article.readTime}
                  </span>
                  
                  <button className="flex items-center text-green-600 hover:text-green-700 font-medium transition-colors duration-300">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
            Load More Articles
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default News;