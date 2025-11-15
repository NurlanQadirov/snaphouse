import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import MenuCategories from './MenuCategories';
import SpecialsBanner from './SpecialsBanner';
import MenuGrid from './MenuGrid';
import Searchbar from './Searchbar';

function Menu({ onItemSelected, mainContentRef }) { 
  const { texts } = useLanguage();
  
  const categories = texts.menu.categories;
  const menuData = texts.menu.menuData;

  const [selectedCategory, setSelectedCategory] = useState(categories[0].key);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectCategory = (categoryKey) => {
    setSelectedCategory(categoryKey);
    setSearchTerm('');
    // Ağıllı scroll
    mainContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // DÜZƏLİŞ: Banner üçün 'mainDishes' yox, 'signature' istifadə edirik
  const specialItem = menuData.signature[0]; // 'signature' kateqoriyasının ilk elementi

  return (
    <section id="menu" className="pb-16 max-w-5xl mx-auto">
      {/* 1. Kateqoriyalar */}
      <MenuCategories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        mainContentRef={mainContentRef}
      />
      
      {/* 2. Axtarış Zolağı */}
      <div className="mt-6">
        <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* 3. Xüsusi Tövsiyə Banneri */}
      {!searchTerm && (
        <div className="mb-6">
          <SpecialsBanner 
            item={specialItem} 
            onClick={() => onItemSelected(specialItem)} 
          />
        </div>
      )}

      {/* 4. Menyu Kartları (Axtarış nəticəsi ilə) */}
      <MenuGrid
        key={selectedCategory + searchTerm} // Axtarış dəyişəndə də animasiyanı tətikləyirik
        menuData={menuData}
        selectedCategory={selectedCategory}
        searchTerm={searchTerm}
        onItemSelected={onItemSelected}
      />
    </section>
  );
}

export default Menu;