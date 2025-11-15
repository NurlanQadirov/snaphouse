import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext'; // YENİ İMPORT

// ... (bannerVariants olduğu kimi qalır) ...
const bannerVariants = { /*...*/ };

function SpecialsBanner({ item, onClick }) {
  const { texts } = useLanguage(); // Dili götürürük

  if (!item) return null;

  return (
    <motion.div 
      variants={bannerVariants}
      initial="hidden"
      animate="visible"
      onClick={onClick}
      className="relative mx-4 md:mx-auto h-36 rounded-xl overflow-hidden cursor-pointer group shadow-premium"
    >
      <img 
        src={item.image} 
        alt={item.name} 
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
        
        {/* Nişan (dildən gəlir) */}
        <div className="flex items-center bg-gold/20 backdrop-blur-sm px-3 py-1 rounded-full mb-2 border border-gold/30">
          <Star size={16} className="text-gold mr-1" />
          <span className="text-xs font-medium text-gold uppercase tracking-wider">
            {texts.specialsBanner.title} {/* "Chef's Special" */}
          </span>
        </div>
        
        {/* Yeməyin adı (dildən gəlir) */}
        <h3 className="font-serif text-3xl font-bold">
          {item.name} {/* Artıq 'item' özü tərcümə olunmuş gələcək */}
        </h3>
      </div>
    </motion.div>
  );
}

export default SpecialsBanner;