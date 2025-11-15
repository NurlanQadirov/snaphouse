import React from 'react';
import { Search, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

function Searchbar({ searchTerm, setSearchTerm }) {
  const { texts } = useLanguage(); // Tərcümə üçün

  // 'placeholder' tərcüməsi (hələlik əlavə edirik, sonra dillərə əlavə edərik)
  const placeholder = {
    az: "Menyuda axtar...",
    en: "Search the menu...",
    ru: "Поиск по меню...",
  }[texts.nav.az.toLowerCase()] || "Search the menu..."; // texts.nav.az 'AZ' qaytarır

  return (
    <div className="relative mx-4 md:mx-auto mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full h-14 pl-12 pr-10 py-2 bg-gray-800/50 text-off-white placeholder-off-white/40
                   rounded-xl border-2 border-transparent 
                   focus:border-gold focus:bg-gray-800 focus:outline-none
                   transition-all duration-300"
      />
      {/* Axtarış ikonu */}
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-off-white/40"
      />
      {/* Təmizləmə düyməsi (yalnız nəsə yazıldıqda görünür) */}
      {searchTerm && (
        <button
          onClick={() => setSearchTerm('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-off-white/60 hover:text-white"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}

export default Searchbar;