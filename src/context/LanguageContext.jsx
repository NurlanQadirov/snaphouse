// src/context/LanguageContext.jsx  <--- UZANTIYA DİQQƏT ET

import React, { createContext, useState, useContext, useMemo } from 'react';
import { translations } from '../i18n/languages';

// 1. Konteksti yarat
const LanguageContext = createContext();

// 2. Provider-i (təminatçı) yarat
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('az'); // Defolt olaraq 'az' seçilsin

  // Dil dəyişəndə, 'texts' obyektini yenidən hesabla
  const texts = useMemo(() => {
    return translations[language] || translations.en;
  }, [language]);

  const value = {
    language,
    setLanguage,
    texts,
  };

  return (
    // BU HİSSƏ JSX SAYILIR
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