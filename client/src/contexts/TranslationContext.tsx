import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface TranslationData {
  // Navigation & UI
  'nav.information': string;
  'nav.videos': string;
  'nav.games': string;
  'nav.chat': string;
  'nav.contact': string;
  
  // Character Information
  'characters.title': string;
  'characters.subtitle': string;
  'characters.backToGallery': string;
  'characters.epicGallery': string;
  'characters.bmoMessage': string;
  
  // Games
  'games.title': string;
  'games.ticTacToe': string;
  'games.maze': string;
  'games.snake': string;
  'games.bmoQuiz': string;
  'games.backToGames': string;
  
  // Chat
  'chat.title': string;
  'chat.placeholder': string;
  'chat.send': string;
  'chat.initialMessage': string;
  
  // Videos
  'videos.title': string;
  'videos.adventure1': string;
  'videos.adventure2': string;
  'videos.adventure3': string;
  'videos.coding': string;
  
  // Common
  'common.mathematical': string;
  'common.algebraic': string;
  'common.loading': string;
  'common.error': string;
}

export type SupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'ja';

export const translations: Record<SupportedLanguage, TranslationData> = {
  en: {
    // Navigation & UI
    'nav.information': 'Information',
    'nav.videos': 'Videos',
    'nav.games': 'Games',
    'nav.chat': 'Chat',
    'nav.contact': 'Contact',
    
    // Character Information
    'characters.title': 'Adventure Time Information Archive',
    'characters.subtitle': 'Mathematical! Learn about all the amazing characters from the Land of Ooo! 🏰',
    'characters.backToGallery': '← Return to Heroes Gallery',
    'characters.epicGallery': '⭐ Epic Gallery ⭐',
    'characters.bmoMessage': '🤖 BMO says: "These are all my amazing friends from the Land of Ooo! Mathematical!"',
    
    // Games
    'games.title': 'Epic Adventure Games',
    'games.ticTacToe': 'TIC TAC TOE',
    'games.maze': 'MAZE RUNNER',
    'games.snake': 'SNAKE ADVENTURE',
    'games.bmoQuiz': 'BMO QUIZ',
    'games.backToGames': '← Back to Games',
    
    // Chat
    'chat.title': 'Chat with BMO',
    'chat.placeholder': 'Ask BMO anything mathematical!',
    'chat.send': 'Send',
    'chat.initialMessage': "Hi! I'm BMO! Ask me anything about my creator's work!",
    
    // Videos
    'videos.title': 'Adventure Videos',
    'videos.adventure1': 'BMO Adventure Short #1',
    'videos.adventure2': 'BMO Adventure Short #2',
    'videos.adventure3': 'BMO Adventure Short #3',
    'videos.coding': 'Adventure Time Tutorial',
    
    // Common
    'common.mathematical': 'Mathematical!',
    'common.algebraic': 'Algebraic!',
    'common.loading': 'Loading...',
    'common.error': 'Oh no! Something went wrong!'
  },
  es: {
    // Navigation & UI
    'nav.information': 'Información',
    'nav.videos': 'Videos',
    'nav.games': 'Juegos',
    'nav.chat': 'Chat',
    'nav.contact': 'Contacto',
    
    // Character Information
    'characters.title': 'Archivo de Información de Hora de Aventuras',
    'characters.subtitle': '¡Matemático! ¡Aprende sobre todos los increíbles personajes de la Tierra de Ooo! 🏰',
    'characters.backToGallery': '← Volver a la Galería de Héroes',
    'characters.epicGallery': '⭐ Galería Épica ⭐',
    'characters.bmoMessage': '🤖 BMO dice: "¡Estos son todos mis increíbles amigos de la Tierra de Ooo! ¡Matemático!"',
    
    // Games
    'games.title': 'Juegos de Aventura Épicos',
    'games.ticTacToe': 'TRES EN RAYA',
    'games.maze': 'CORREDOR DEL LABERINTO',
    'games.snake': 'AVENTURA SERPIENTE',
    'games.bmoQuiz': 'QUIZ DE BMO',
    'games.backToGames': '← Volver a Juegos',
    
    // Chat
    'chat.title': 'Chatea con BMO',
    'chat.placeholder': '¡Pregúntale a BMO algo matemático!',
    'chat.send': 'Enviar',
    'chat.initialMessage': '¡Hola! ¡Soy BMO! ¡Pregúntame cualquier cosa sobre el trabajo de mi creador!',
    
    // Videos
    'videos.title': 'Videos de Aventuras',
    'videos.adventure1': 'Corto de Aventura BMO #1',
    'videos.adventure2': 'Corto de Aventura BMO #2',
    'videos.adventure3': 'Corto de Aventura BMO #3',
    'videos.coding': 'Tutorial de Programación BMO',
    
    // Common
    'common.mathematical': '¡Matemático!',
    'common.algebraic': '¡Algebraico!',
    'common.loading': 'Cargando...',
    'common.error': '¡Oh no! ¡Algo salió mal!'
  },
  fr: {
    // Navigation & UI
    'nav.information': 'Information',
    'nav.videos': 'Vidéos',
    'nav.games': 'Jeux',
    'nav.chat': 'Chat',
    'nav.contact': 'Contact',
    
    // Character Information
    'characters.title': 'Archive d\'Information Adventure Time',
    'characters.subtitle': 'Mathématique ! Apprenez tout sur les personnages incroyables du Pays d\'Ooo ! 🏰',
    'characters.backToGallery': '← Retour à la Galerie des Héros',
    'characters.epicGallery': '⭐ Galerie Épique ⭐',
    'characters.bmoMessage': '🤖 BMO dit : "Ce sont tous mes amis incroyables du Pays d\'Ooo ! Mathématique !"',
    
    // Games
    'games.title': 'Jeux d\'Aventure Épiques',
    'games.ticTacToe': 'TIC TAC TOE',
    'games.maze': 'COUREUR DE LABYRINTHE',
    'games.snake': 'AVENTURE SERPENT',
    'games.bmoQuiz': 'QUIZ BMO',
    'games.backToGames': '← Retour aux Jeux',
    
    // Chat
    'chat.title': 'Chattez avec BMO',
    'chat.placeholder': 'Demandez à BMO quelque chose de mathématique !',
    'chat.send': 'Envoyer',
    'chat.initialMessage': 'Salut ! Je suis BMO ! Demandez-moi n\'importe quoi sur le travail de mon créateur !',
    
    // Videos
    'videos.title': 'Vidéos d\'Aventure',
    'videos.adventure1': 'Court-métrage d\'Aventure BMO #1',
    'videos.adventure2': 'Court-métrage d\'Aventure BMO #2',
    'videos.adventure3': 'Court-métrage d\'Aventure BMO #3',
    'videos.coding': 'Tutoriel de Codage BMO',
    
    // Common
    'common.mathematical': 'Mathématique !',
    'common.algebraic': 'Algébrique !',
    'common.loading': 'Chargement...',
    'common.error': 'Oh non ! Quelque chose s\'est mal passé !'
  },
  de: {
    // Navigation & UI
    'nav.information': 'Information',
    'nav.videos': 'Videos',
    'nav.games': 'Spiele',
    'nav.chat': 'Chat',
    'nav.contact': 'Kontakt',
    
    // Character Information
    'characters.title': 'Adventure Time Informationsarchiv',
    'characters.subtitle': 'Mathematisch! Lerne alle erstaunlichen Charaktere aus dem Land Ooo kennen! 🏰',
    'characters.backToGallery': '← Zurück zur Helden-Galerie',
    'characters.epicGallery': '⭐ Epische Galerie ⭐',
    'characters.bmoMessage': '🤖 BMO sagt: "Das sind alle meine erstaunlichen Freunde aus dem Land Ooo! Mathematisch!"',
    
    // Games
    'games.title': 'Epische Abenteuer-Spiele',
    'games.ticTacToe': 'TIC TAC TOE',
    'games.maze': 'LABYRINTH-LÄUFER',
    'games.snake': 'SCHLANGEN-ABENTEUER',
    'games.bmoQuiz': 'BMO QUIZ',
    'games.backToGames': '← Zurück zu Spielen',
    
    // Chat
    'chat.title': 'Chat mit BMO',
    'chat.placeholder': 'Frage BMO etwas Mathematisches!',
    'chat.send': 'Senden',
    'chat.initialMessage': 'Hallo! Ich bin BMO! Frag mich alles über die Arbeit meines Schöpfers!',
    
    // Videos
    'videos.title': 'Abenteuer-Videos',
    'videos.adventure1': 'BMO Abenteuer-Kurz #1',
    'videos.adventure2': 'BMO Abenteuer-Kurz #2',
    'videos.adventure3': 'BMO Abenteuer-Kurz #3',
    'videos.coding': 'BMO Programmier-Tutorial',
    
    // Common
    'common.mathematical': 'Mathematisch!',
    'common.algebraic': 'Algebraisch!',
    'common.loading': 'Laden...',
    'common.error': 'Oh nein! Etwas ist schief gelaufen!'
  },
  ja: {
    // Navigation & UI
    'nav.information': '情報',
    'nav.videos': 'ビデオ',
    'nav.games': 'ゲーム',
    'nav.chat': 'チャット',
    'nav.contact': 'お問い合わせ',
    
    // Character Information
    'characters.title': 'アドベンチャータイム情報アーカイブ',
    'characters.subtitle': '数学的！ウーの国の素晴らしいキャラクターたちについて学ぼう！🏰',
    'characters.backToGallery': '← ヒーローギャラリーに戻る',
    'characters.epicGallery': '⭐ エピックギャラリー ⭐',
    'characters.bmoMessage': '🤖 BMOが言います：「これらは皆、ウーの国の私の素晴らしい友達です！数学的！」',
    
    // Games
    'games.title': 'エピックアドベンチャーゲーム',
    'games.ticTacToe': '三目並べ',
    'games.maze': '迷路ランナー',
    'games.snake': 'スネークアドベンチャー',
    'games.bmoQuiz': 'BMOクイズ',
    'games.backToGames': '← ゲームに戻る',
    
    // Chat
    'chat.title': 'BMOとチャット',
    'chat.placeholder': 'BMOに数学的なことを聞いてみて！',
    'chat.send': '送信',
    'chat.initialMessage': 'こんにちは！BMOです！私の作成者の作品について何でも聞いてください！',
    
    // Videos
    'videos.title': 'アドベンチャービデオ',
    'videos.adventure1': 'BMOアドベンチャーショート#1',
    'videos.adventure2': 'BMOアドベンチャーショート#2',
    'videos.adventure3': 'BMOアドベンチャーショート#3',
    'videos.coding': 'BMOコーディングチュートリアル',
    
    // Common
    'common.mathematical': '数学的！',
    'common.algebraic': '代数的！',
    'common.loading': '読み込み中...',
    'common.error': 'あーっ！何かが間違いました！'
  }
};

interface TranslationContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: keyof TranslationData) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  // Load saved language preference
  useEffect(() => {
    const savedLang = localStorage.getItem('bmo-language') as SupportedLanguage;
    if (savedLang && savedLang in translations) {
      setLanguage(savedLang);
    }
  }, []);

  // Save language preference
  const handleSetLanguage = (lang: SupportedLanguage) => {
    setLanguage(lang);
    localStorage.setItem('bmo-language', lang);
  };

  // Translation function
  const t = (key: keyof TranslationData): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}

export const languageNames: Record<SupportedLanguage, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français', 
  de: 'Deutsch',
  ja: '日本語'
};