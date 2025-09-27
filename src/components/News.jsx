import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const News = () => {
  const newsArticles = [
    {
      id: 1,
      title: "Kamsa Poultry Wins Regional Excellence Award",
      excerpt: "We are proud to announce that Kamsa Poultry has been recognized with the Regional Excellence Award for outstanding contribution to sustainable poultry farming.",
      image: "https://tse3.mm.bing.net/th/id/OIP.Lt8PkKo5T5Cb4MN_rpwn9QHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
      date: "2024-01-15",
      author: "John Kamsa",
      category: "Awards",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "New Organic Feed Program Launched",
      excerpt: "Introducing our new organic feed program designed to enhance the nutritional value of our poultry products while maintaining sustainable farming practices.",
      image: "https://i.pinimg.com/736x/97/ec/cc/97eccc1314c8eed9e95b85d8bc7a5a54.jpg",
      date: "2024-01-10",
      author: "Sarah Kamsa",
      category: "Innovation",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "Expansion of Farm Facilities Completed",
      excerpt: "Our state-of-the-art facility expansion is now complete, allowing us to increase production capacity while maintaining our high standards of animal welfare.",
      image: "https://i.pinimg.com/1200x/cb/57/4a/cb574a60d19a54677721df88df0574c2.jpg",
      date: "2024-01-05",
      author: "Operations Team",
      category: "Expansion",
      readTime: "5 min read"
    },
    {
      id: 4,
      title: "Community Outreach Program Success",
      excerpt: "Our recent community outreach program has successfully trained over 100 local farmers in modern poultry farming techniques and sustainable practices.",
      image: "https://i.pinimg.com/736x/a7/49/63/a74963e5dfc28d2beb86edff0deeb13d.jpg",
      date: "2023-12-28",
      author: "Community Team",
      category: "Community",
      readTime: "3 min read"
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
        </motion.div>
      </div>
    </section>
  );
};

export default News;