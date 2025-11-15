import React from 'react';
import { Instagram, MapPin, Smartphone } from 'lucide-react';
import Logo from './Logo';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext'; // YENİ İMPORT

function Footer() {
  const { texts } = useLanguage(); // Dili götürürük

  return (
    <footer className="py-12 bg-premium-black border-t border-gold/20 mt-16">
      <div className="max-w-5xl mx-auto px-6 text-center text-off-white/60">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        
        {/* Sloqan (dildən gəlir) */}
        <p className="font-serif text-lg italic text-off-white/80 mb-8">
          "{texts.footer.slogan}"
        </p>

        {/* İkonlar (dildən gəlir) */}
        <div className="flex justify-center items-center space-x-8 mb-10">
          <motion.a 
            href="https://maps.google.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, color: '#D4AF37' }}
            className="flex flex-col items-center text-off-white/70"
          >
            <MapPin size={24} />
            <span className="text-xs mt-1">{texts.footer.address}</span>
          </motion.a>
          
          <motion.a 
            href="tel:+994500000000"
            whileHover={{ scale: 1.1, color: '#D4AF37' }}
            className="flex flex-col items-center text-off-white/70"
          >
            <Smartphone size={24} />
            <span className="text-xs mt-1">{texts.footer.call}</span>
          </motion.a>

          <motion.a 
            href="https://www.instagram.com/snaphousebaku/" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, color: '#D4AF37' }}
            className="flex flex-col items-center text-off-white/70"
          >
            <Instagram size={24} />
            <span className="text-xs mt-1">{texts.footer.instagram}</span>
          </motion.a>
        </div>
        
        {/* Qalan mətnlər (dildən gəlir) */}
        <p className="text-sm">
          "{texts.footer.scan}"
        </p>
        <p className="text-xs mt-4">
          {texts.footer.rights}
        </p>
      </div>
    </footer>
  );
}

export default Footer;