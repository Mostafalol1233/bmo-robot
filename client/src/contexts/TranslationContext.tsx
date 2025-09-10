import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface TranslationData {
  // Information Section Navigation
  'nav.information': string;
  
  // Character Information
  'characters.title': string;
  'characters.subtitle': string;
  'characters.backToGallery': string;
  'characters.epicGallery': string;
  'characters.bmoMessage': string;
  'characters.finn.name': string;
  'characters.finn.description': string;
  'characters.jake.name': string;
  'characters.jake.description': string;
  'characters.princessBubblegum.name': string;
  'characters.princessBubblegum.description': string;
  'characters.marceline.name': string;
  'characters.marceline.description': string;
  'characters.bmo.name': string;
  'characters.bmo.description': string;
  
  // Information Common
  'info.mathematical': string;
  'info.algebraic': string;
  'info.loading': string;
}

export type SupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'ar';

export const translations: Record<SupportedLanguage, TranslationData> = {
  en: {
    // Information Section Navigation
    'nav.information': 'Information',
    
    // Character Information
    'characters.title': 'Adventure Time Information Archive',
    'characters.subtitle': 'Mathematical! Learn about all the amazing characters from the Land of Ooo! 🏰',
    'characters.backToGallery': '← Return to Heroes Gallery',
    'characters.epicGallery': '⭐ Epic Gallery ⭐',
    'characters.bmoMessage': '🤖 BMO says: "These are all my amazing friends from the Land of Ooo! Mathematical!"',
    'characters.finn.name': 'Finn the Human',
    'characters.finn.description': 'A brave and adventurous human boy with a strong moral compass and unwavering optimism.',
    'characters.jake.name': 'Jake the Dog',
    'characters.jake.description': 'Finn\'s best friend, a magical yellow dog with stretching powers and a laid-back attitude.',
    'characters.princessBubblegum.name': 'Princess Bubblegum',
    'characters.princessBubblegum.description': 'The intelligent ruler of the Candy Kingdom, skilled in science and magic.',
    'characters.marceline.name': 'Marceline the Vampire Queen',
    'characters.marceline.description': 'A half-demon vampire who plays bass guitar and has a complex past with other characters.',
    'characters.bmo.name': 'BMO',
    'characters.bmo.description': 'A living video game console, computer, and music player who lives with Finn and Jake.',
    
    // Information Common
    'info.mathematical': 'Mathematical!',
    'info.algebraic': 'Algebraic!',
    'info.loading': 'Loading...'
  },
  es: {
    // Information Section Navigation
    'nav.information': 'Información',
    
    // Character Information
    'characters.title': 'Archivo de Información de Hora de Aventuras',
    'characters.subtitle': '¡Matemático! ¡Aprende sobre todos los increíbles personajes de la Tierra de Ooo! 🏰',
    'characters.backToGallery': '← Volver a la Galería de Héroes',
    'characters.epicGallery': '⭐ Galería Épica ⭐',
    'characters.bmoMessage': '🤖 BMO dice: "¡Estos son todos mis increíbles amigos de la Tierra de Ooo! ¡Matemático!"',
    'characters.finn.name': 'Finn el Humano',
    'characters.finn.description': 'Un valiente y aventurero niño humano con una fuerte brújula moral y optimismo inquebrantable.',
    'characters.jake.name': 'Jake el Perro',
    'characters.jake.description': 'El mejor amigo de Finn, un perro mágico amarillo con poderes de estiramiento y una actitud relajada.',
    'characters.princessBubblegum.name': 'Princesa Dulce',
    'characters.princessBubblegum.description': 'La inteligente gobernante del Reino Dulce, experta en ciencia y magia.',
    'characters.marceline.name': 'Marceline la Reina Vampiro',
    'characters.marceline.description': 'Una vampira medio-demonio que toca el bajo y tiene un pasado complejo con otros personajes.',
    'characters.bmo.name': 'BMO',
    'characters.bmo.description': 'Una consola de videojuegos viviente, computadora y reproductor de música que vive con Finn y Jake.',
    
    // Information Common
    'info.mathematical': '¡Matemático!',
    'info.algebraic': '¡Algebraico!',
    'info.loading': 'Cargando...'
  },
  fr: {
    // Information Section Navigation
    'nav.information': 'Information',
    
    // Character Information
    'characters.title': 'Archive d\'Information Adventure Time',
    'characters.subtitle': 'Mathématique ! Apprenez tout sur les personnages incroyables du Pays d\'Ooo ! 🏰',
    'characters.backToGallery': '← Retour à la Galerie des Héros',
    'characters.epicGallery': '⭐ Galerie Épique ⭐',
    'characters.bmoMessage': '🤖 BMO dit : "Ce sont tous mes amis incroyables du Pays d\'Ooo ! Mathématique !"',
    'characters.finn.name': 'Finn l\'Humain',
    'characters.finn.description': 'Un garçon humain courageux et aventureux avec une boussole morale forte et un optimisme inébranlable.',
    'characters.jake.name': 'Jake le Chien',
    'characters.jake.description': 'Le meilleur ami de Finn, un chien magique jaune avec des pouvoirs d\'extension et une attitude décontractée.',
    'characters.princessBubblegum.name': 'Princesse Chewing-gum',
    'characters.princessBubblegum.description': 'La dirigeante intelligente du Royaume des Bonbons, compétente en science et en magie.',
    'characters.marceline.name': 'Marceline la Reine Vampire',
    'characters.marceline.description': 'Une vampire demi-démon qui joue de la basse et a un passé complexe avec d\'autres personnages.',
    'characters.bmo.name': 'BMO',
    'characters.bmo.description': 'Une console de jeux vidéo vivante, ordinateur et lecteur de musique qui vit avec Finn et Jake.',
    
    // Information Common
    'info.mathematical': 'Mathématique !',
    'info.algebraic': 'Algébrique !',
    'info.loading': 'Chargement...'
  },
  de: {
    // Information Section Navigation
    'nav.information': 'Information',
    
    // Character Information
    'characters.title': 'Adventure Time Informationsarchiv',
    'characters.subtitle': 'Mathematisch! Lerne alle erstaunlichen Charaktere aus dem Land Ooo kennen! 🏰',
    'characters.backToGallery': '← Zurück zur Helden-Galerie',
    'characters.epicGallery': '⭐ Epische Galerie ⭐',
    'characters.bmoMessage': '🤖 BMO sagt: "Das sind alle meine erstaunlichen Freunde aus dem Land Ooo! Mathematisch!"',
    'characters.finn.name': 'Finn der Mensch',
    'characters.finn.description': 'Ein mutiger und abenteuerlustiger Menschenjunge mit einem starken moralischen Kompass und unerschütterlichem Optimismus.',
    'characters.jake.name': 'Jake der Hund',
    'characters.jake.description': 'Finns bester Freund, ein magischer gelber Hund mit Dehnungskräften und einer entspannten Einstellung.',
    'characters.princessBubblegum.name': 'Prinzessin Bubblegum',
    'characters.princessBubblegum.description': 'Die intelligente Herrscherin des Candy Kingdoms, geschickt in Wissenschaft und Magie.',
    'characters.marceline.name': 'Marceline die Vampirkönigin',
    'characters.marceline.description': 'Ein halb-dämonischer Vampir, der Bassgitarre spielt und eine komplexe Vergangenheit mit anderen Charakteren hat.',
    'characters.bmo.name': 'BMO',
    'characters.bmo.description': 'Eine lebende Videospielkonsole, Computer und Musikplayer, der mit Finn und Jake lebt.',
    
    // Information Common
    'info.mathematical': 'Mathematisch!',
    'info.algebraic': 'Algebraisch!',
    'info.loading': 'Laden...'
  },
  ja: {
    // Information Section Navigation
    'nav.information': '情報',
    
    // Character Information
    'characters.title': 'アドベンチャータイム情報アーカイブ',
    'characters.subtitle': '数学的！ウーの国の素晴らしいキャラクターたちについて学ぼう！🏰',
    'characters.backToGallery': '← ヒーローギャラリーに戻る',
    'characters.epicGallery': '⭐ エピックギャラリー ⭐',
    'characters.bmoMessage': '🤖 BMOが言います：「これらは皆、ウーの国の私の素晴らしい友達です！数学的！」',
    'characters.finn.name': 'フィンザヒューマン',
    'characters.finn.description': '強い道徳的羅針盤と揺るぎない楽観主義を持つ勇敢で冒険好きな人間の少年。',
    'characters.jake.name': 'ジェイクザドッグ',
    'characters.jake.description': 'フィンの親友、伸縮力を持つ魔法の黄色い犬で、のんびりした性格。',
    'characters.princessBubblegum.name': 'プリンセスバブルガム',
    'characters.princessBubblegum.description': 'キャンディ王国の知的な統治者で、科学と魔法に長けている。',
    'characters.marceline.name': 'マーセリンザバンパイアクイーン',
    'characters.marceline.description': 'ベースギターを演奏する半悪魔のバンパイアで、他のキャラクターと複雑な過去を持つ。',
    'characters.bmo.name': 'BMO',
    'characters.bmo.description': 'フィンとジェイクと一緒に住んでいる生きたビデオゲーム機、コンピューター、音楽プレーヤー。',
    
    // Information Common
    'info.mathematical': '数学的！',
    'info.algebraic': '代数的！',
    'info.loading': '読み込み中...'
  },
  ar: {
    // Information Section Navigation
    'nav.information': 'المعلومات',
    
    // Character Information
    'characters.title': 'أرشيف معلومات مغامرات وقت المرح',
    'characters.subtitle': 'رياضي! تعلم عن جميع الشخصيات المذهلة من أرض أوو! 🏰',
    'characters.backToGallery': '← العودة إلى معرض الأبطال',
    'characters.epicGallery': '⭐ المعرض الملحمي ⭐',
    'characters.bmoMessage': '🤖 BMO يقول: "هؤلاء جميع أصدقائي المذهلين من أرض أوو! رياضي!"',
    'characters.finn.name': 'فين الإنسان',
    'characters.finn.description': 'فتى إنسان شجاع ومغامر لديه بوصلة أخلاقية قوية وتفاؤل لا يتزعزع.',
    'characters.jake.name': 'جيك الكلب',
    'characters.jake.description': 'أفضل صديق لفين، كلب سحري أصفر بقوى التمدد وموقف مسترخي.',
    'characters.princessBubblegum.name': 'الأميرة باببلغم',
    'characters.princessBubblegum.description': 'الحاكمة الذكية لمملكة الحلوى، ماهرة في العلوم والسحر.',
    'characters.marceline.name': 'مارسيلين ملكة مصاصي الدماء',
    'characters.marceline.description': 'مصاصة دماء نصف شيطان تعزف على الجيتار وتملك ماضٍ معقد مع الشخصيات الأخرى.',
    'characters.bmo.name': 'BMO',
    'characters.bmo.description': 'وحدة تحكم ألعاب حية وكمبيوتر ومشغل موسيقى يعيش مع فين وجيك.',
    
    // Information Common
    'info.mathematical': 'رياضي!',
    'info.algebraic': 'جبري!',
    'info.loading': 'جاري التحميل...'
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
  ja: '日本語',
  ar: 'العربية'
};