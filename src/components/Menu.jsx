import React, { useState } from 'react'; // useState-i import etdiyimizdən əmin olun
import { useLanguage } from '../context/LanguageContext';
import MenuCategories from './MenuCategories';
import SpecialsBanner from './SpecialsBanner';
import MenuGrid from './MenuGrid';
import Searchbar from './Searchbar'; // YENİ: Axtarış komponentini import edirik

function Menu({ onItemSelected, mainContentRef }) { 
  const { texts } = useLanguage();
  
  const categories = texts.menu.categories;
  const menuData = texts.menu.menuData;

  const [selectedCategory, setSelectedCategory] = useState(categories[0].key);
  
  // YENİ: Axtarış üçün 'state' yaradırıq
  const [searchTerm, setSearchTerm] = useState('');

  // Kateqoriya dəyişəndə axtarışı sıfırlayırıq
  const handleSelectCategory = (categoryKey) => {
    setSelectedCategory(categoryKey);
    setSearchTerm(''); // Axtarışı təmizlə
  };

  // Xüsusi yeməyi tapırıq
  const specialItemArray = menuData.mainDishes || menuData.signature;
  const specialItem = specialItemArray[0];

  return (
    <section id="menu" className="pb-16 max-w-5xl mx-auto">
      {/* 1. Kateqoriyalar */}
      <MenuCategories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory} // Dəyişdi
        mainContentRef={mainContentRef}
      />
      
      {/* 2. YENİ: Axtarış Zolağı */}
      <div className="mt-6"> {/* Üst tərəfdən boşluq */}
        <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* 3. Xüsusi Tövsiyə Banneri */}
      {/* Axtarış zamanı banneri gizlədirik */}
      {!searchTerm && (
        <div className="mb-6"> {/* 'my-6'-nı 'mb-6' etdik */}
          <SpecialsBanner 
            item={specialItem} 
            onClick={() => onItemSelected(specialItem)} 
          />
        </div>
      )}

      {/* 4. Menyu Kartları (Axtarış nəticəsi ilə) */}
      <MenuGrid
        key={selectedCategory} // Bu vacibdir, amma 'searchTerm'ə görə yox
        menuData={menuData} // Bütün datanı ötürürük
        selectedCategory={selectedCategory}
        searchTerm={searchTerm} // Axtarış mətnini ötürürük
        onItemSelected={onItemSelected}
      />
    </section>
  );
}

export default Menu;