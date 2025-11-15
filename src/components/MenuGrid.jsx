import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import MenuItemCard from './MenuItemCard';

// Konteyner animasiyası (Daha sürətli stagger)
const containerVariants = {
  hidden: { }, 
  visible: {
    transition: {
      staggerChildren: 0.07, // DƏYİŞİKLİK: Daha sürətli (0.15 idi)
      delayChildren: 0.4,
    },
  },
};

// Hər bir kartın öz animasiyası (Daha "Səliqəli")
const itemCardVariants = {
  hidden: { opacity: 0, y: 30 }, // DƏYİŞİKLİK: Daha yaxından gəlir (50 idi)
  visible: { 
    opacity: 1, 
    y: 0,
    // DƏYİŞİKLİK: "Spring" əvəzinə "Səliqəli" (easeOut) istifadə edirik
    transition: { 
      type: "tween", 
      ease: "easeOut", 
      duration: 0.4 // 0.4 saniyəyə yerinə oturur
    }
  },
};

// Komponentin qalan hissəsi eynidir
function MenuGrid({ menuData, selectedCategory, searchTerm, onItemSelected }) {

  // Filtrasiya məntiqi
  const filteredItems = useMemo(() => {
    
    // 1. Axtarış varsa
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      const allItems = Object.values(menuData).flat(); 
      
      return allItems.filter(item => 
        (item.name && item.name.toLowerCase().includes(lowerCaseSearch)) ||
        (item.description && item.description.toLowerCase().includes(lowerCaseSearch)) ||
        (item.ingredients && item.ingredients.join(' ').toLowerCase().includes(lowerCaseSearch))
      );
    }
    
    // 2. Axtarış yoxdursa
    return menuData[selectedCategory] || [];

  }, [searchTerm, selectedCategory, menuData]);

  return (
    <motion.div
      layout
      className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Nəticəni ekrana veririk */}
      {filteredItems.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
          variants={itemCardVariants} 
          onClick={() => onItemSelected(item)}
        />
      ))}
      
      {/* Axtarış nəticəsi boşdursa */}
      {filteredItems.length === 0 && (
        <p className="text-off-white/60 text-center col-span-1 md:col-span-2">
          Axtarışınıza uyğun nəticə tapılmadı.
        </p>
      )}
    </motion.div>
  );
}

export default MenuGrid;