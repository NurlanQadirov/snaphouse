import React, { createContext, useState, useContext, useEffect, Suspense } from 'react';

// Dil Kontekstini yaradırıq
const LanguageContext = createContext();

// Dil fayllarını "tənbəl yükləmə" (lazy loading) ilə import edirik
// Bu, React.lazy() funksiyası ilə edilir
const loadTranslations = (lang) => {
  switch (lang) {
    case 'en':
      return import('../i18n/en.js');
    case 'ru':
      return import('../i18n/ru.js');
    case 'az':
    default:
      return import('../i18n/az.js');
  }
};

// 2. Provider-i (təminatçı) yarat
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('az'); // Defolt dil
  const [texts, setTexts] = useState(null); // Başlanğıcda mətnlər boşdur
  const [loading, setLoading] = useState(true); // Yükləmə vəziyyəti

  // Dil dəyişəndə və ya ilk dəfə açılanda...
  useEffect(() => {
    setLoading(true);
    // ...seçilmiş dilin faylını yüklə
    loadTranslations(language)
      .then(module => {
        // ...və 'texts' state-ini yenilə
        setTexts(module.default); 
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load translation:", err);
        // Xəta olarsa, 'en' dilini yükləməyə çalış
        loadTranslations('en').then(module => {
          setTexts(module.default);
          setLoading(false);
        });
      });
  }, [language]); // Bu effekt 'language' dəyişəndə işə düşür

  const value = {
    language,
    setLanguage,
    texts,
    isLoading: loading, // Yükləmə vəziyyətini də ötürürük
  };

  // Mətnlər hələ yüklənməyibsə (ilk açılış və ya dil dəyişimi)
  // Heç nə göstərmə (Preloader onsuz da görünür)
  if (loading || !texts) {
    return null; // və ya <LoadingSpinner />
  }

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