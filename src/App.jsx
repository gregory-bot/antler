import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PictureCatalog from './components/PictureCatalog';
import Profile from './components/Profile';
import News from './components/News';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import MobileNav from './components/MobileNav';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <MobileNav />
      
      <main>
        <Hero />
        <PictureCatalog />
        <Profile />
        <News />
        <Contact />
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;