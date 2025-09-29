// components/News.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, RefreshCw } from 'lucide-react';
import geminiService from '../services/geminiService';

const News = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Updated default images with your custom images
  const defaultImages = {
    'Industry': 'https://i.pinimg.com/736x/b4/ee/83/b4ee8346940988b2257747f2da216e3b.jpg',
    'Innovation': 'https://i.pinimg.com/1200x/cf/33/74/cf3374df08b5b30c9cc9a7efda9c6fdf.jpg',
    'Community': 'https://i.pinimg.com/1200x/21/c1/de/21c1de92a5a4abb4ba2dfcf09ef98562.jpg',
    'Sustainability': 'https://i.pinimg.com/1200x/9d/a6/8d/9da68ddc8d573f8a63786a1c1a7be366.jpg',
    'Technology': 'https://i.pinimg.com/736x/71/a9/36/71a93619c880382220f3088911012686.jpg',
    'Awards': 'https://i.pinimg.com/1200x/cf/33/74/cf3374df08b5b30c9cc9a7efda9c6fdf.jpg',
    'default': 'https://i.pinimg.com/736x/b4/ee/83/b4ee8346940988b2257747f2da216e3b.jpg'
  };

  const fetchNewsFromGemini = async () => {
    try {
      setLoading(true);
      console.log('Fetching real-time news from Gemini service...');
      
      const newsData = await geminiService.fetchAllNews();
      console.log('Received news data:', newsData);
      
      if (newsData && newsData.articles && newsData.articles.length > 0) {
        // Process and validate articles
        const processedArticles = newsData.articles.map(article => {
          // Validate and set image URL
          let imageUrl = article.image;
          
          // Check if the image URL is valid and accessible
          if (!imageUrl || !isValidImageUrl(imageUrl)) {
            // Use category-based default image or fallback
            imageUrl = defaultImages[article.category] || defaultImages.default;
          }
          
          return {
            ...article,
            image: imageUrl,
            date: article.date || new Date().toISOString().split('T')[0],
            // Ensure all required fields exist
            id: article.id || `article-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: article.title || 'Untitled Article',
            excerpt: article.excerpt || 'No description available.',
            author: article.author || 'Industry Source',
            category: article.category || 'Industry',
            readTime: article.readTime || '2 min read',
          };
        });
        
        setNewsArticles(processedArticles);
        setLastUpdated(new Date());
        setError(null);
        console.log('Successfully set real-time articles:', processedArticles.length);
      } else {
        setNewsArticles([]);
        setError('No real-time news available at the moment.');
      }
    } catch (err) {
      console.error('Error in fetchNewsFromGemini:', err);
      setError('Failed to fetch real-time news. Please try again.');
      setNewsArticles([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to validate image URLs
  const isValidImageUrl = (url) => {
    if (!url) return false;
    
    // Check if it's a valid URL format
    try {
      const parsedUrl = new URL(url);
      // Check if it's from a trusted source or has image extension
      const validDomains = ['i.pinimg.com', 'unsplash.com', 'images.unsplash.com', 'picsum.photos', 'via.placeholder.com'];
      const hasValidDomain = validDomains.some(domain => parsedUrl.hostname.includes(domain));
      const hasImageExtension = /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(url);
      
      return hasValidDomain || hasImageExtension;
    } catch {
      return false;
    }
  };

  // Function to handle image loading errors
  const handleImageError = (e, category) => {
    console.log('Image failed to load, using default image for category:', category);
    e.target.src = defaultImages[category] || defaultImages.default;
    e.target.onerror = null; // Prevent infinite loop
  };

  useEffect(() => {
    fetchNewsFromGemini();
    
    // Refresh every 30 minutes for real-time updates
    const interval = setInterval(fetchNewsFromGemini, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      return new Date().toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <section id="news" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Fetching real-time news...</p>
            <p className="text-sm text-gray-500">Checking for latest updates</p>
          </div>
        </div>
      </section>
    );
  }

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
          <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
            <h2 className="text-4xl lg:text-3xl font-bold text-gray-900">
              Real-Time News
            </h2>
            <button
              onClick={fetchNewsFromGemini}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Checking...' : 'Check for News'}
            </button>
          </div>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Latest real-time updates from the poultry farming industry
          </p>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-2">
              Last checked: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </motion.div>

        {error && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-8 text-center">
            {error}
          </div>
        )}

        {newsArticles.length > 0 ? (
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
                    onError={(e) => handleImageError(e, article.category)}
                    loading="lazy"
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
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 flex items-center">
                      <Tag className="w-4 h-4 mr-1" />
                      {article.readTime}
                    </span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                      Live Update
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-12">
              <div className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-lg">
                <div className="text-6xl mb-4">📰</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No News Available</h3>
                <p className="text-gray-600 mb-4">
                  There are no real-time news updates at the moment. 
                  Check back later for the latest poultry farming news.
                </p>
                <button
                  onClick={fetchNewsFromGemini}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Check Again
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default News;