import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext'; // YENİ İMPORT

const logoUrl = 'https://picsum.photos/id/177/100/100'; 
// ... (bütün 'variants' kodları olduğu kimi qalır) ...
// ...
const preloaderVariants = { /*...*/ };
const logoVariants = { /*...*/ };
const textContainerVariants = { /*...*/ };
const letterVariants = { /*...*/ };

function Preloader() {
  const { texts } = useLanguage(); // Dili kontekstdən götürürük
  const text = texts.preloader.title; // Mətni dildən götürürük

  return (
    <motion.div
      // ... (motion.div kodları olduğu kimi qalır) ...
      key="preloader"
      variants={preloaderVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[100] flex flex-col justify-center items-center bg-premium-black"
    >
      <motion.img
        // ... (motion.img kodları olduğu kimi qalır) ...
        key="logo-img"
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        src={logoUrl}
        alt="Snap House Logo"
        className="w-24 h-24 object-cover rounded-full shadow-lg" 
      />
      <motion.h1
        // ... (motion.h1 kodları olduğu kimi qalır) ...
        key="logo-text"
        variants={textContainerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="font-serif text-4xl text-gold mt-6 flex overflow-hidden"
        aria-label={text}
      >
        {text.split('').map((char, index) => (
          <motion.span 
            key={`${char}-${index}`} 
            variants={letterVariants} 
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.h1>
    </motion.div>
  );
}

export default Preloader;