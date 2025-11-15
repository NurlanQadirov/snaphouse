import React from 'react';
import { motion } from 'framer-motion';

// Loqo üçün eyni placeholder URL
const logoUrl = 'https://picsum.photos/id/177/100/100'; 

// --- Animasiya Variantları ---

// 1. Preloader (Əsas pəncərə, qara fon)
// 2 saniyə qalır, 0.5 saniyəyə çıxır (cəmi 2.5s)
const preloaderVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.5, delay: 2 } } 
};

// 2. Loqo Şəkli (Zərifcə "spring" ilə gəlir)
const logoVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring', stiffness: 100, delay: 0.2 } // 0.2s sonra gəlir
  },
  exit: { opacity: 0, scale: 0.9 }
};

// 3. Mətn Konteyneri (Hərfləri idarə etmək üçün)
const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08, // Hər hərf arası 0.08s fərq
      delayChildren: 0.5     // Loqodan 0.3s sonra hərflər gəlməyə başlayır
    }
  },
  exit: { opacity: 0 }
};

// 4. Hər Bir Hərf (Aşağıdan yuxarıya zərifcə)
const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// --- Komponent ---

function Preloader() {
  const text = "Snap House";

  return (
    <motion.div
      key="preloader"
      variants={preloaderVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[100] flex flex-col justify-center items-center bg-premium-black"
    >
      {/* 1. Loqo Şəkli */}
      <motion.img
        key="logo-img"
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        src={logoUrl}
        alt="Snap House Logo"
        className="w-24 h-24 object-cover rounded-full shadow-lg" 
      />
      
      {/* 2. Hərflərlə Animasiya Edilən Mətn */}
      <motion.h1
        key="logo-text"
        variants={textContainerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="font-serif text-4xl text-gold mt-6 flex overflow-hidden" // flex + overflow-hidden
        aria-label={text} // Ekran oxuyucular üçün
      >
        {/* Mətnin hər hərfini 'span'-a çeviririk */}
        {text.split('').map((char, index) => (
          <motion.span 
            key={`${char}-${index}`} 
            variants={letterVariants} 
            className="inline-block"
          >
            {/* Boşluq xarakterini HTML-də qorumaq üçün */}
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.h1>
    </motion.div>
  );
}

export default Preloader;