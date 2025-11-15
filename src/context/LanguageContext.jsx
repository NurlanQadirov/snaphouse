import React, { createContext, useState, useContext, useEffect, Suspense } from 'react';

// DÜZƏLİŞ: Defolt dili (az) birbaşa import edirik.
// Bu, saytın açılışını bloklamır, çünki Vite onu onsuz da əsas paketə daxil edir.
import azTranslations from '../i18n/az.js'; 

// Dil Kontekstini yaradırıq
const LanguageContext = createContext();

// Dil fayllarını "tənbəl yükləmə" (lazy loading)
// Yalnız 'en' və 'ru' tənbəl yüklənir
const loadTranslations = (lang) => {
  switch (lang) {
    case 'en':
      return import('../i18n/en.js');
    case 'ru':
      return import('../i18n/ru.js');
    // 'az' artıq yükləndiyi üçün birbaşa qaytarırıq
    case 'az':
    default:
      return Promise.resolve({ default: azTranslations });
  }
};

// 2. Provider (Təminatçı)
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('az'); // Defolt dil
  
  // DÜZƏLİŞ: Başlanğıc 'texts' vəziyyəti 'null' yox, birbaşa 'azTranslations' olur.
  // Bu, 'qara ekran' və 'bloklama' problemini həll edir.
  const [texts, setTexts] = useState(azTranslations);
  const [isLoading, setIsLoading] = useState(false); // Başlanğıcda yükləmə yoxdur

  // Bu effekt artıq yalnız dil DƏYİŞƏNDƏ işləyir
  useEffect(() => {
    // Əgər seçilən dil onsuz da 'az'-dırsa, heç nə etmə
    if (language === 'az') {
      setTexts(azTranslations);
      return;
    }

    // Əgər başqa dil seçilibsə, "tənbəl yükləməyə" başla
    setIsLoading(true);
    loadTranslations(language)
      .then(module => {
        setTexts(module.default); 
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to load translation:", err);
        setIsLoading(false);
        // Xəta olarsa, 'az' dilinə qayıt
        setLanguage('az');
        setTexts(azTranslations);
      });
  }, [language]); // Bu effekt 'language' dəyişəndə işə düşür

  const value = {
    language,
    setLanguage,
    texts,
    isLoading,
  };

  // Artıq 'isLoading' üçün 'null' qaytarmırıq. Sayt həmişə görünür.
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// 3. Konteksti istifadə etmək üçün xüsusi 'hook'
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}