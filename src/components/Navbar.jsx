import React from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
// Dəyişiklik: 'translations' importu silindi, yalnız 'useLanguage' qaldı
import { useLanguage } from '../context/LanguageContext';

function Navbar() {
  // 'setLanguage' və 'texts' birbaşa kontekstdən gəlir
  const { language, setLanguage, texts } = useLanguage();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.5, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-30 h-20 
                   bg-premium-black/50 backdrop-blur-md 
                   border-b border-gold/30"
    >
      <div className="max-w-5xl mx-auto h-full flex items-center justify-between px-6">
        <Logo />
        
        {/* Dil Dəyişmə Düymələri */}
        <div className="flex space-x-2">
          {/* Artıq 'translations' obyektinə ehtiyac yoxdur */}
          {['az', 'en', 'ru'].map((langKey) => (
            <button
              key={langKey}
              onClick={() => setLanguage(langKey)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-all
                ${
                  language === langKey
                    ? 'bg-gold text-premium-black' // Aktiv dil
                    : 'text-off-white/60 hover:bg-white/10' // İnaktiv dil
                }
              `}
            >
              {/* Mətnlər 'texts' obyektindən gəlir */}
              {texts.nav[langKey]}
            </button>
          ))}
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;