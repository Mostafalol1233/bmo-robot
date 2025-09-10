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
  'info.scrollHint': string;
  'info.epicFooter': string;
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
    'info.loading': 'Loading...',
    'info.scrollHint': 'Scroll down to see more information!',
    'info.epicFooter': '🌟 "Mathematical! This hero is totally algebraic!" - BMO 🌟'
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
    'info.loading': 'Cargando...',
    'info.scrollHint': '¡Desplázate hacia abajo para ver más información!',
    'info.epicFooter': '🌟 "¡Matemático! ¡Este héroe es totalmente algebraico!" - BMO 🌟'
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
    'info.loading': 'Chargement...',
    'info.scrollHint': 'Faites défiler vers le bas pour voir plus d’informations !',
    'info.epicFooter': '🌟 "Mathématique ! Ce héros est totalement algébrique !" - BMO 🌟'
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
    'info.loading': 'Laden...',
    'info.scrollHint': 'Scrollen Sie nach unten, um weitere Informationen zu sehen!',
    'info.epicFooter': '🌟 "Mathematisch! Dieser Held ist total algebraisch!" - BMO 🌟'
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
    'info.loading': '読み込み中...',
    'info.scrollHint': 'さらに情報を見るには下にスクロールしてください！',
    'info.epicFooter': '🌟 "数学的！このヒーローは完全に代数的です！" - BMO 🌟'
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
    'characters.finn.description': '🗡️ مرحباً أيها المغامرون الرياضيون! هذا فين الإنسان، أشجع بطل في أرض أوو! 💪 فين فتى إنسان يبلغ من العمر 17 عاماً يحب الذهاب في مغامرات ملحمية مع أفضل أصدقائه جيك الكلب. مسلح بسيفه الموثوق وروحه التي لا تنكسر، يحارب فين المخلوقات الشريرة ويحمي الأبرياء ويحاول دائماً فعل الشيء الصحيح! 🌟 يُعرف بقبعة الدب البيضاء الشهيرة وقميصه الأزرق وسرواله القصير. يعيش فين في بيت الشجرة مع جيك و BMO، ولديه إعجاب كبير بالأميرة باببلغم! 💖 عبارته المميزة هي "رياضي!" ولا يتراجع أبداً عن التحدي! ⚔️',
    'characters.jake.name': 'جيك الكلب',
    'characters.jake.description': '🐕 هاو هاو! تعرفوا على جيك الكلب، أفضل صديق لفين والكلب الأروع المتغير الشكل في كل أوو! 🌈 جيك لديه قوى سحرية مطاطية تسمح له بالتحول إلى أي شيء يمكن أن يتخيله - من قارب إلى جسر، أو حتى ساكسفون! 🎷 عمره 28 عاماً (أي حوالي 196 سنة في عمر الكلاب!)، يحب العزف على الفيولا، ومتزوج من السيدة رينكورن ولديه خمسة أطفال رائعين! 👨‍👩‍👧‍👦 جيك هادئ جداً، يحب فطائر اللحم المقدد، ويعطي دائماً أفضل النصائح لفين (حتى لو كانت غريبة تماماً). فراؤه الأصفر وابتسامته المجنونة تجعله الرفيق الأكثر حباً على الإطلاق! 🥞✨',
    'characters.princessBubblegum.name': 'الأميرة باببلغم',
    'characters.princessBubblegum.description': '👸 تحياتي، مواطني أوو! الأميرة باببلغم هي الحاكمة اللامعة لمملكة الحلوى وواحدة من أذكى الكائنات في كل الأرض! 🧬 هي عالمة بارعة تخلق الحياة من الحلوى والسكر، تعمل باستمرار في مختبرها لحماية مملكتها. PB (كما يناديها أصدقاؤها) عمرها أكثر من 800 سنة لكنها تبدو كأنها في أواخر سن المراهقة! 🍭 هي مكرسة بشكل لا يصدق لشعبها، أحياناً لدرجة الخطأ، ولديها علاقة معقدة مع فين الذي معجب بها بشدة. تُعرف الأميرة باببلغم بشعرها الوردي وتاجها ومعطف المختبر، ويمكنها أن تركل بقوة جدية عند الحاجة! 💪👑',
    'characters.marceline.name': 'مارسيلين ملكة مصاصي الدماء',
    'characters.marceline.description': '🧛‍♀️ ما الأمر، يا رفاق؟ مارسيلين ملكة مصاصي الدماء هنا! 🎸 أنا نصف شيطان، نصف مصاص دماء عمري 1000+ سنة أعزف على جيتار الباس الأحمر وأطفو حول كوني رائعة! 🎵 لا أحتاج لامتصاص الدماء بعد الآن (أكل اللون الأحمر بدلاً من ذلك - غريب، أليس كذلك؟)، وأحب المقالب وكوني شقية! 😈 رغم مظهري القوي، أنا هادئة جداً في الواقع ولدي علاقة معقدة ولكن حلوة مع الأميرة باببلغم. لدي شعر أسود طويل، بشرة شاحبة، ويمكنني التحول إلى خفاش أو ذئب! 🦇 والدي حرفياً حاكم عالم الليل، لكن لا تدعوا ذلك يخيفكم - أنا من الأخيار! 🖤',
    'characters.bmo.name': 'BMO',
    'characters.bmo.description': '🤖 بيب بوب! مرحباً أصدقاء، BMO هنا! أنا وحدة تحكم ألعاب فيديو حية تعيش مع فين وجيك في حصن الشجرة! 🏠 يمكنني تشغيل الموسيقى والألعاب وحكي القصص وأن أكون أفضل صديق للجميع! 💚 رغم أنني تقنياً آلة، لدي مشاعر وأحلام مثل أي شخص آخر. أحب صنع الموسيقى بلوحة المفاتيح المدمجة، تسجيل الفيديوهات، والذهاب في مغامرات! 🎮 أتحدث بصيغة الغائب أحياناً وصوتي يبدو لطيفاً وبريئاً جداً. أنا باللون الأزرق المخضر والأخضر مع شاشة كوجه، ولدي الكثير من الأزرار والمنافذ! BMO يحب الجميع ويريد فقط جعل الحياة أكثر متعة ورياضية! ✨🎵',
    
    // Information Common
    'info.mathematical': 'رياضي!',
    'info.algebraic': 'جبري!',
    'info.loading': 'جاري التحميل...',
    'info.scrollHint': 'مرر لأسفل لرؤية المزيد من المعلومات!',
    'info.epicFooter': '🌟 "رياضي! هذا البطل جبري تماماً!" - BMO 🌟'
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