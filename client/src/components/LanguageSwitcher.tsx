import { useTranslation, languageNames, SupportedLanguage } from '@/contexts/TranslationContext';
import { Globe } from 'lucide-react';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
        data-testid="language-switcher"
      >
        <Globe size={18} />
        <span>{languageNames[language]}</span>
        <span className="ml-1">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-50 min-w-[120px]">
          {Object.entries(languageNames).map(([lang, name]) => (
            <button
              key={lang}
              onClick={() => {
                setLanguage(lang as SupportedLanguage);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 transition-colors font-medium ${
                language === lang 
                  ? 'bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800' 
                  : 'text-gray-700 hover:text-teal-700'
              }`}
              data-testid={`language-${lang}`}
            >
              <span className="flex items-center space-x-2">
                <span>{name}</span>
                {language === lang && <span className="text-teal-600">✓</span>}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}