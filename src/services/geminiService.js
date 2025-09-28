// services/geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiService {
  constructor() {
    const apiKey = "AIzaSyAYFJN7ZsknXGJ8IB4IwN8VouNj9jwQhtg";
    
    if (!apiKey) {
      console.error('Gemini API key not found.');
      this.genAI = null;
      this.model = null;
      return;
    }
    
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    });
    
    // Chat-specific model for conversations
    this.chatModel = this.genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    });
    
    console.log('Gemini service initialized with gemini-2.5-flash model');
  }

  // Chat method for conversational responses
  async chat(message) {
    if (!this.chatModel) {
      console.error('Gemini API not initialized.');
      return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
    }

    try {
      const prompt = `
        You are Kamsa Poultry Assistant, a helpful assistant for Kamsa Poultry Farm in Kisumu.
        
        About Kamsa Poultry:
        - Poultry farm based in Kenya
        - Offers fresh eggs, poultry consultation
        - Provides premium poultry products and training programs
        - Focuses on sustainable farming practices
        - Located in Sinyolo, Kisumu
        - Contact: +254725 164189, email: kamsapoultryfarm@gmail.com
        
        Your role:
        - Provide helpful information about poultry farming
        - Answer questions about Kamsa Poultry's products and services
        - Offer advice on poultry care, feeding, and management
        - Discuss industry trends in Kenya
        - Be friendly, professional, and knowledgeable
        - Keep responses concise but informative
        - If you don't know something, admit it and suggest contacting the farm directly
        
        Current user question: "${message}"
        
        Please provide a helpful response that addresses the user's question specifically.
      `;

      console.log('Sending chat message to Gemini:', message);
      const result = await this.chatModel.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('Gemini chat response:', text);
      return text;
    } catch (error) {
      console.error('Gemini Chat API Error:', error);
      return "I apologize, but I'm having trouble processing your request right now. Please try again in a moment or contact Kamsa Poultry directly at +254725 164189.";
    }
  }

  // News method with custom images
  async fetchAllNews() {
    if (!this.model) {
      console.error('Gemini API not initialized.');
      return { articles: [] };
    }

    try {
      const prompt = `
        You are a news aggregation agent for Kamsa Poultry Farm in Kenya. 
        Generate 4-6 CURRENT and REAL-TIME news articles about poultry farming in Kenya for September 2024.
        
        Focus on recent developments in:
        - Poultry farming industry trends
        - Agriculture innovations in Kenya
        - Sustainable farming practices
        - Farm achievements and awards
        - Community programs and outreach
        - Market trends and prices
        - Technology adoption in poultry farming
        - Government policies affecting poultry farmers
        
        IMPORTANT: Return ONLY valid JSON format, no additional text or explanations.
        
        Use this exact JSON structure:
        {
          "articles": [
            {
              "id": "1",
              "title": "News title here",
              "excerpt": "Brief summary of the news development",
              "image": "https://i.pinimg.com/736x/b4/ee/83/b4ee8346940988b2257747f2da216e3b.jpg",
              "date": "2024-09-15",
              "author": "Agricultural News Kenya",
              "category": "Industry",
              "readTime": "2 min read",
              "source": "Poultry Times"
            }
          ]
        }
        
        Available image URLs by category:
        - Industry: https://i.pinimg.com/736x/b4/ee/83/b4ee8346940988b2257747f2da216e3b.jpg
        - Innovation: https://i.pinimg.com/1200x/cf/33/74/cf3374df08b5b30c9cc9a7efda9c6fdf.jpg
        - Community: https://i.pinimg.com/1200x/21/c1/de/21c1de92a5a4abb4ba2dfcf09ef98562.jpg
        - Sustainability: https://i.pinimg.com/1200x/9d/a6/8d/9da68ddc8d573f8a63786a1c1a7be366.jpg
        - Technology: https://i.pinimg.com/736x/71/a9/36/71a93619c880382220f3088911012686.jpg
        
        Generate 4-6 different articles with varied categories and make them realistic for Kenyan poultry farming context.
      `;

      console.log('Fetching real-time news from Gemini API...');
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('Gemini raw response:', text);
      
      // Clean the response text
      const cleanedText = this.cleanResponse(text);
      console.log('Cleaned response:', cleanedText);
      
      const parsedData = this.parseGeminiResponse(cleanedText);
      
      if (parsedData.articles && parsedData.articles.length > 0) {
        console.log('Real-time articles fetched:', parsedData.articles.length);
        return parsedData;
      } else {
        console.log('No valid articles found');
        return { articles: [] };
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      return { articles: [] };
    }
  }

  // Clean the response text
  cleanResponse(text) {
    if (!text) return '';
    
    // Remove markdown code blocks
    let cleaned = text.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    
    // Remove any leading/trailing whitespace
    cleaned = cleaned.trim();
    
    return cleaned;
  }

  parseGeminiResponse(text) {
    if (!text || text.trim() === '') {
      console.log('Empty response from Gemini');
      return { articles: [] };
    }

    try {
      // Try direct JSON parse first
      return JSON.parse(text);
    } catch (firstError) {
      console.log('First JSON parse failed, trying to extract JSON...');
      
      try {
        // Try to find JSON object in the text
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const jsonString = jsonMatch[0];
          const fixedJson = this.fixJsonString(jsonString);
          return JSON.parse(fixedJson);
        }
      } catch (secondError) {
        console.log('JSON extraction failed:', secondError);
      }
      
      // Try manual extraction as last resort
      console.log('Attempting manual article extraction...');
      const manualArticles = this.extractArticlesManually(text);
      if (manualArticles.length > 0) {
        console.log('Manually extracted articles:', manualArticles.length);
        return { articles: manualArticles };
      }
      
      return { articles: [] };
    }
  }

  fixJsonString(jsonString) {
    let fixed = jsonString;
    
    // Fix common JSON formatting issues
    fixed = fixed.replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":'); // Add quotes to keys
    fixed = fixed.replace(/'/g, '"'); // Replace single quotes with double quotes
    
    // Fix trailing commas
    fixed = fixed.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
    
    return fixed;
  }

  extractArticlesManually(text) {
    const articles = [];
    const lines = text.split('\n');
    
    let currentArticle = null;
    let inArticle = false;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.includes('"id":') || trimmedLine.includes('id:')) {
        if (currentArticle) articles.push(currentArticle);
        currentArticle = {
          id: `manual-${articles.length + 1}`,
          title: 'Latest Poultry News',
          excerpt: 'Recent development in the poultry farming industry.',
          image: this.getDefaultImageForCategory('Industry'),
          date: new Date().toISOString().split('T')[0],
          author: "Industry Source",
          category: "Industry",
          readTime: "2 min read",
          source: "Gemini AI"
        };
        inArticle = true;
      }
      
      if (currentArticle && inArticle) {
        if ((trimmedLine.includes('"title":') || trimmedLine.includes('title:')) && !trimmedLine.includes('"id":')) {
          const match = trimmedLine.match(/(?:"title"|title)\s*:\s*"([^"]+)"/) || 
                       trimmedLine.match(/(?:"title"|title)\s*:\s*'([^']+)'/);
          if (match) currentArticle.title = match[1];
        }
        if ((trimmedLine.includes('"excerpt":') || trimmedLine.includes('excerpt:')) && !trimmedLine.includes('"title":')) {
          const match = trimmedLine.match(/(?:"excerpt"|excerpt)\s*:\s*"([^"]+)"/) || 
                       trimmedLine.match(/(?:"excerpt"|excerpt)\s*:\s*'([^']+)'/);
          if (match) currentArticle.excerpt = match[1];
        }
        if ((trimmedLine.includes('"category":') || trimmedLine.includes('category:')) && !trimmedLine.includes('"excerpt":')) {
          const match = trimmedLine.match(/(?:"category"|category)\s*:\s*"([^"]+)"/) || 
                       trimmedLine.match(/(?:"category"|category)\s*:\s*'([^']+)'/);
          if (match) currentArticle.category = match[1];
        }
        if (trimmedLine.includes('}') && !trimmedLine.includes('{')) {
          inArticle = false;
        }
      }
    }
    
    if (currentArticle) articles.push(currentArticle);
    return articles.slice(0, 6);
  }

  // Default images for different categories - using your custom images
  getDefaultImageForCategory(category) {
    const imageMap = {
      'Industry': 'https://i.pinimg.com/736x/b4/ee/83/b4ee8346940988b2257747f2da216e3b.jpg',
      'Innovation': 'https://i.pinimg.com/1200x/cf/33/74/cf3374df08b5b30c9cc9a7efda9c6fdf.jpg',
      'Community': 'https://i.pinimg.com/1200x/21/c1/de/21c1de92a5a4abb4ba2dfcf09ef98562.jpg',
      'Sustainability': 'https://i.pinimg.com/1200x/9d/a6/8d/9da68ddc8d573f8a63786a1c1a7be366.jpg',
      'Technology': 'https://i.pinimg.com/736x/71/a9/36/71a93619c880382220f3088911012686.jpg',
      'Awards': 'https://i.pinimg.com/1200x/cf/33/74/cf3374df08b5b30c9cc9a7efda9c6fdf.jpg',
      'default': 'https://i.pinimg.com/736x/b4/ee/83/b4ee8346940988b2257747f2da216e3b.jpg'
    };
    
    return imageMap[category] || imageMap.default;
  }
}

const geminiService = new GeminiService();
export default geminiService;