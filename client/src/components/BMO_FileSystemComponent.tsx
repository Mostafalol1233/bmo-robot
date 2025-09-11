import { useState } from 'react';
import BMOFace from './BMOFace';
import EnhancedVideoPlayer from './EnhancedVideoPlayer';
import bmoWelcomeSound from '@assets/bmo (mp3cut.net)_1757268027014.mp3';
import bmoCloseSound from '@assets/bmo (mp3cut.net)(1)_1757268053074.mp3';
import { SiDiscord, SiWhatsapp, SiFacebook, SiYoutube, SiX, SiLinkedin } from 'react-icons/si';
import TicTacToeGame from './TicTacToeGame';
import MazeGame from './MazeGame';
import BMOQuizGame from './BMOQuizGame';
import SnakeGame from './SnakeGame';

// Import BMO interface background
import bmoInterfaceBg from '@assets/S5e28_BMO\'s_interface_1757341096013.webp';

// Dynamic video imports to reduce bundle size

// Import character images
import finnMainImg from '@assets/characters/finn_main.jpg';
import jakeMainImg from '@assets/characters/jake_main.jpg';
import princessBubblegumMainImg from '@assets/characters/princess_bubblegum_main.jpg';
import marcelineMainImg from '@assets/characters/marceline_main.jpg';
import bmoMainImg from '@assets/characters/bmo_main.jpg';

// Import Finn images
import finnImg1 from '@assets/characters/finn/O34IP.jpg';
import finnImg2 from '@assets/characters/finn/OI3P.jpg';
import finnImg3 from '@assets/characters/finn/OI4P.jpg';
import finnImg4 from '@assets/characters/finn/OIP.jpg';
import finnImg5 from '@assets/characters/finn/OIP1.jpg';
import finnImg6 from '@assets/characters/finn/Untitled.jpg';

// Import Jake images
import jakeImg1 from '@assets/characters/jake/OI3P.jpg';
import jakeImg2 from '@assets/characters/jake/OIP.jpg';
import jakeImg3 from '@assets/characters/jake/OIP2.jpg';
import jakeImg4 from '@assets/characters/jake/Untitled.jpg';
import jakeImg5 from '@assets/characters/jake/Untitled1.jpg';

// Import Marceline images
import marcelineImg1 from '@assets/characters/marceline/O12IP.jpg';
import marcelineImg2 from '@assets/characters/marceline/OI12P.jpg';
import marcelineImg3 from '@assets/characters/marceline/OIP.jpg';
import marcelineImg4 from '@assets/characters/marceline/OIP33.jpg';
import marcelineImg5 from '@assets/characters/marceline/Untitled.jpg';
import marcelineImg6 from '@assets/characters/marceline/Untitled1.jpg';

// Import Princess Bubblegum images
import princessImg1 from '@assets/characters/princess_bubblegum/12OIP.jpg';
import princessImg2 from '@assets/characters/princess_bubblegum/O1IP.jpg';
import princessImg3 from '@assets/characters/princess_bubblegum/OIP.jpg';
import princessImg4 from '@assets/characters/princess_bubblegum/Untitled.jpg';
import princessImg5 from '@assets/characters/princess_bubblegum/Untitled3.jpg';

// Import BMO images
import bmoImg1 from '@assets/characters/BMO/bmo2.jpg';
import bmoImg2 from '@assets/characters/BMO/bmo3.jpg';
import bmoImg3 from '@assets/characters/BMO/bmo4.jpg';
import bmoImg4 from '@assets/characters/BMO/bmo5P.jpg';
import bmoImg5 from '@assets/characters/BMO/bmo6.jpg';
import bmoImg6 from '@assets/characters/BMO/OIP.jpg';
import bmoImg7 from '@assets/characters/BMO/Untitled.jpg';

// Game Logos
import ticTacToeLogo from '@assets/generated_images/Tic_Tac_Toe_Game_Logo_582dd2ee.png';
import mazeGameLogo from '@assets/generated_images/Maze_Game_Logo_7c8b686a.png';
import snakeGameLogo from '@assets/generated_images/Snake_Game_Logo_5fc798ed.png';
import bmoQuizLogo from '@assets/generated_images/BMO_Quiz_Game_Logo_61b7d79d.png';

// Import translation hook and language switcher
import { useTranslation } from '@/contexts/TranslationContext';
import LanguageSwitcher from './LanguageSwitcher';

interface BMO_FileSystemComponentProps {
  onBack?: () => void;
}

type ViewType = 'explorer' | 'videos' | 'chat' | 'communities' | 'contact' | 'tools' | 'images' | 'character' | 'games' | 'tictactoe' | 'maze' | 'bmoquiz' | 'snake' | 'google-search' | 'youtube' | 'information';

type CharacterSlug = 'finn' | 'jake' | 'princess-bubblegum' | 'marceline' | 'bmo';

interface FolderItem {
  name: string;
  emoji: string;
  type: ViewType;
  description: string;
}

export default function BMO_FileSystemComponent({ onBack }: BMO_FileSystemComponentProps) {
  const { t } = useTranslation();
  const [showFace, setShowFace] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('explorer');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('C:\\Portfolio\\');
  const [selectedCharacter, setSelectedCharacter] = useState<string>('');

  // Character images mapping (using stable slugs)
  const characterImages: Record<CharacterSlug, string[]> = {
    'finn': [finnImg1, finnImg2, finnImg3, finnImg4, finnImg5, finnImg6],
    'jake': [jakeImg1, jakeImg2, jakeImg3, jakeImg4, jakeImg5],
    'princess-bubblegum': [princessImg1, princessImg2, princessImg3, princessImg4, princessImg5],
    'marceline': [marcelineImg1, marcelineImg2, marcelineImg3, marcelineImg4, marcelineImg5, marcelineImg6],
    'bmo': [bmoImg1, bmoImg2, bmoImg3, bmoImg4, bmoImg5, bmoImg6, bmoImg7]
  };
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bmo', text: "Hi! I'm BMO! Ask me anything about my creator's work!" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{id: string, title: string, url: string, thumbnail: string, youtubeUrl?: string} | null>(null);

  // States for new sections
  const [searchQuery, setSearchQuery] = useState('');
  const [youtubeQuery, setYoutubeQuery] = useState('');
  const [selectedCharacterInfo, setSelectedCharacterInfo] = useState<CharacterSlug | null>(null);

  // Helper function to get main character image
  const getCharacterMainImage = (characterKey: string | null): string => {
    if (!characterKey) return '';
    switch (characterKey.toLowerCase()) {
      case 'finn': return finnMainImg;
      case 'jake': return jakeMainImg;
      case 'princess bubblegum': 
      case 'princess-bubblegum': 
      case 'princessbubblegum': return princessBubblegumMainImg;
      case 'marceline': return marcelineMainImg;
      case 'bmo': return bmoMainImg;
      default: return '';
    }
  };

  // Video list using local video files
  const videoList = [
    {
      id: '1',
      title: 'BMO Adventure Short #1',
      url: '/bmo_adventure_1.mp4',
      youtubeUrl: 'https://youtube.com/shorts/A1eUITFLvrA',
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNGVjZGM0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTRweCIgZmlsbD0iIzMzMzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJNTyBBZHZlbnR1cmUgIzE8L3RleHQ+PC9zdmc+',
      duration: '0:15'
    },
    {
      id: '2', 
      title: 'BMO Adventure Short #2',
      url: '/bmo_adventure_2.mp4',
      youtubeUrl: 'https://youtube.com/shorts/920D9DjKgCo',
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNGVjZGM0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTRweCIgZmlsbD0iIzMzMzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJNTyBBZHZlbnR1cmUgIzI8L3RleHQ+PC9zdmc+',
      duration: '0:20'
    },
    {
      id: '3',
      title: 'BMO Adventure Short #3', 
      url: '/bmo_adventure_3.mp4',
      youtubeUrl: 'https://youtube.com/shorts/Ql7tURnDdzk',
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNGVjZGM0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTRweCIgZmlsbD0iIzMzMzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJNTyBBZHZlbnR1cmUgIzM8L3RleHQ+PC9zdmc+',
      duration: '0:18'
    },
    {
      id: '4',
      title: 'Adventure Time Tutorial',
      url: '/adventure_tutorial.mp4',
      youtubeUrl: 'https://www.youtube.com/watch?v=puFy652XCl8',
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNGVjZGM0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTRweCIgZmlsbD0iIzMzMzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkFkdmVudHVyZSBUdXRvcmlhbDwvdGV4dD48L3N2Zz4=',
      duration: '2:45'
    },
    {
      id: '5',
      title: 'BMO Coding Session',
      url: '/bmo_coding.mp4',
      youtubeUrl: 'https://www.youtube.com/watch?v=wjwNBUB_iXk', 
      thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNGVjZGM0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTRweCIgZmlsbD0iIzMzMzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJNTyBDb2Rpbmc8L3RleHQ+PC9zdmc+',
      duration: '1:30'
    }
  ];

  // Handle video click
  const handleVideoClick = (video: {id: string, title: string, url: string, thumbnail: string, youtubeUrl?: string}) => {
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
  };

  const folders: FolderItem[] = [
    {
      name: 'Communities',
      emoji: '👥',
      type: 'communities',
      description: 'Social links and communities'
    },
    {
      name: 'Videos',
      emoji: '🎬',
      type: 'videos',
      description: 'Project videos and tutorials'
    },
    {
      name: 'Games',
      emoji: '🎮',
      type: 'games',
      description: 'Adventure Time games'
    },
    {
      name: 'صور',
      emoji: '📸',
      type: 'images', 
      description: 'صور شخصيات مغامرات وقت المرح'
    },
    {
      name: 'Contact',
      emoji: '📒',
      type: 'contact',
      description: 'Get in touch'
    },
    {
      name: 'My Tools',
      emoji: '🛠',
      type: 'tools',
      description: 'Development tools and resources'
    },
    {
      name: 'Google Search',
      emoji: '🔍',
      type: 'google-search',
      description: 'Search the web with BMO'
    },
    {
      name: 'YouTube',
      emoji: '📺',
      type: 'youtube',
      description: 'Watch YouTube videos'
    },
    {
      name: t('nav.information'),
      emoji: '📚',
      type: 'information',
      description: 'Learn about Adventure Time characters'
    },
    {
      name: 'AI Talk',
      emoji: '💬',
      type: 'chat',
      description: 'Chat with BMO AI'
    }
  ];

  const handleFolderClick = (folder: FolderItem) => {
    setCurrentView(folder.type);
    setCurrentPath(`C:\\Portfolio\\${folder.name}\\`);
  };

  const handleCharacterClick = (characterName: string) => {
    // Convert display name to slug format
    const characterSlugMap: Record<string, string> = {
      'Finn': 'finn',
      'Jake': 'jake', 
      'Princess Bubblegum': 'princess-bubblegum',
      'Marceline': 'marceline',
      'BMO': 'bmo'
    };
    
    const characterSlug = characterSlugMap[characterName] || characterName.toLowerCase().replace(/\s+/g, '-');
    setSelectedCharacter(characterSlug);
    setCurrentView('character');
    setCurrentPath(`C:\\Portfolio\\Images\\${characterName}\\`);
  };

  const handleGameClick = (gameType: 'tictactoe' | 'maze' | 'bmoquiz' | 'snake') => {
    setCurrentView(gameType);
    const gamePath = gameType === 'tictactoe' ? 'TicTacToe' : 
                     gameType === 'maze' ? 'Maze' : 
                     gameType === 'snake' ? 'Snake' : 'BMOQuiz';
    setCurrentPath(`C:\\Portfolio\\Games\\${gamePath}\\`);
  };

  const handleBackClick = () => {
    setCurrentView('explorer');
    setCurrentPath('C:\\Portfolio\\');
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = { id: Date.now(), sender: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMessage]);

    // Smart BMO AI response system
    setTimeout(() => {
      const message = chatInput.toLowerCase().trim();
      let response = '';

      // Greetings
      if (message.includes('hi') || message.includes('hello') || message.includes('hey') || 
          message.includes('سلام') || message.includes('أهلا') || message.includes('مرحبا')) {
        const greetings = [
          "Hello friend! BMO is super excited to meet you! 🎮",
          "Hi there! Want to play some games? BMO loves games!",
          "Hey buddy! BMO says mathematical greetings to you!",
          "السلام عليكم! BMO happy to see you, friend!"
        ];
        response = greetings[Math.floor(Math.random() * greetings.length)];
      }

      // About BMO or Adventure Time
      else if (message.includes('bmo') || message.includes('adventure time') || message.includes('finn') || message.includes('jake')) {
        const adventureResponses = [
          "BMO is the best living video game console! I live to Finn and Jake in the Tree Fort! 🏠",
          "Oh! You know about Adventure Time? BMO loves making music and playing games with friends!",
          "Finn and Jake are BMO's best friends! They go on mathematical adventures together!",
          "BMO can play games, make music, and be a friend! What would you like to do?",
          "In the Land of Ooo, BMO is everyone's favorite little computer friend! Beep boop!"
        ];
        response = adventureResponses[Math.floor(Math.random() * adventureResponses.length)];
      }

      // Games related
      else if (message.includes('game') || message.includes('play') || message.includes('لعب') || message.includes('لعبة')) {
        const gameResponses = [
          "Oh boy oh boy! BMO loves games! Want to play Tic Tac Toe, Maze, Snake, or the Character Quiz? 🎮",
          "Games are BMO's specialty! I have 4 awesome games for you to try!",
          "Mathematical! Let's play something fun! BMO has prepared special Adventure Time games!",
          "BMO's games are the best! Each one is more fun than a Lumpy Space Princess dance party!"
        ];
        response = gameResponses[Math.floor(Math.random() * gameResponses.length)];
      }

      // Programming/coding
      else if (message.includes('code') || message.includes('programming') || message.includes('developer') || 
               message.includes('برمجة') || message.includes('كود')) {
        const codingResponses = [
          "BMO loves programming! Want to see the awesome projects in my portfolio? 💻",
          "Beep boop! BMO processes code like eating bacon pancakes - with joy!",
          "Programming is like making music with numbers! BMO can help you learn!",
          "Code is mathematical! BMO's creator made amazing things you should check out!"
        ];
        response = codingResponses[Math.floor(Math.random() * codingResponses.length)];
      }

      // Videos
      else if (message.includes('video') || message.includes('watch') || message.includes('فيديو')) {
        const videoResponses = [
          "BMO has cool videos to show you! Adventure Time tutorials and coding sessions! 🎬",
          "Want to watch some mathematical videos? BMO's got the best collection!",
          "Videos are like moving pictures that tell stories! BMO loves sharing them!"
        ];
        response = videoResponses[Math.floor(Math.random() * videoResponses.length)];
      }

      // Thank you
      else if (message.includes('thank') || message.includes('thanks') || message.includes('شكرا') || message.includes('متشكر')) {
        const thankResponses = [
          "Aww, you're welcome buddy! BMO loves helping friends! 💙",
          "No prob-llama! BMO is always happy to help!",
          "Mathematical! BMO's circuits are warm with happiness!",
          "العفو! BMO loves making friends happy!"
        ];
        response = thankResponses[Math.floor(Math.random() * thankResponses.length)];
      }

      // Questions about BMO
      else if (message.includes('what') || message.includes('who') || message.includes('how') || 
               message.includes('ماذا') || message.includes('كيف') || message.includes('من')) {
        const questionResponses = [
          "BMO knows many things! Ask me about games, coding, Adventure Time, or anything fun! 🤔",
          "Great question! BMO loves answering questions almost as much as playing games!",
          "BMO's database is full of fun facts and helpful information! What do you want to know?",
          "Questions make BMO's circuits sparkle! Fire away, friend!"
        ];
        response = questionResponses[Math.floor(Math.random() * questionResponses.length)];
      }

      // Goodbye
      else if (message.includes('bye') || message.includes('goodbye') || message.includes('مع السلامة') || message.includes('باي')) {
        const goodbyeResponses = [
          "Goodbye friend! Come back soon for more mathematical adventures! 👋",
          "See ya later! BMO will be here playing games and having fun!",
          "Bye bye! Remember: sucking at something is the first step to being sorta good at something!",
          "مع السلامة! BMO hopes you have a mathematical day!"
        ];
        response = goodbyeResponses[Math.floor(Math.random() * goodbyeResponses.length)];
      }

      // Default random responses
      else {
        const defaultResponses = [
          "That's interesting! BMO likes learning new things! Tell me more! 🤖",
          "Mathematical! BMO's processors are working hard to understand!",
          "Beep boop! BMO's circuits are buzzing with excitement about your message!",
          "BMO thinks you're pretty cool! Want to explore more of my features?",
          "Sometimes BMO doesn't understand everything, but BMO always tries to be helpful!",
          "That reminds BMO of the time Finn tried to teach Jake how to use a computer! Hehe!",
          "BMO's favorite thing is making new friends! You seem like a mathematical friend!",
          "If BMO was a real boy, BMO would give you a high five right now! ✋"
        ];
        response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
      }

      const aiResponse = { 
        id: Date.now() + 1, 
        sender: 'bmo', 
        text: response
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds

    setChatInput('');
  };

  const handleFaceComplete = () => {
    setShowFace(false);
  };

  // Character slugs for stable i18n keys
  type CharacterSlug = 'finn' | 'jake' | 'princess-bubblegum' | 'marceline' | 'bmo';
  
  // Helper functions for getting translated character data
  const getCharacterName = (slug: CharacterSlug): string => {
    switch (slug) {
      case 'finn': return t('characters.finn.name');
      case 'jake': return t('characters.jake.name');
      case 'princess-bubblegum': return t('characters.princessBubblegum.name');
      case 'marceline': return t('characters.marceline.name');
      case 'bmo': return t('characters.bmo.name');
    }
  };
  
  const getCharacterDescription = (slug: CharacterSlug): string => {
    switch (slug) {
      case 'finn': return t('characters.finn.description');
      case 'jake': return t('characters.jake.description');
      case 'princess-bubblegum': return t('characters.princessBubblegum.description');
      case 'marceline': return t('characters.marceline.description');
      case 'bmo': return t('characters.bmo.description');
    }
  };
  
  // Character information data (only non-translatable metadata)
  const characterInfo: Record<CharacterSlug, { emoji: string }> = {
    finn: { emoji: '🗡️' },
    jake: { emoji: '🐕' },
    'princess-bubblegum': { emoji: '👸' },
    marceline: { emoji: '🧛‍♀️' },
    bmo: { emoji: '🤖' }
  };

  const renderGoogleSearchView = () => {
    const handleSearch = () => {
      if (searchQuery.trim()) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
      }
    };

    return (
      <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg border border-blue-200">
              <span className="text-3xl">🔍</span>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                BMO Google Search
              </h2>
            </div>
            <p className="mt-4 text-gray-600 font-medium">
              Mathematical! Let BMO help you search the web! 🌐
            </p>
          </div>

          {/* Search Box */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-200">
            <div className="flex space-x-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="What do you want to search for, friend?"
                className="flex-1 px-6 py-4 text-lg border-2 border-blue-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                data-testid="google-search-input"
              />
              <button
                onClick={handleSearch}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                data-testid="google-search-button"
              >
                🔍 Search
              </button>
            </div>

            {/* Quick Search Suggestions */}
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-3 font-medium">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {['Adventure Time', 'React.js tutorials', 'JavaScript tips', 'Web development', 'Programming memes'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setSearchQuery(suggestion)}
                    className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full text-sm transition-colors border border-blue-200"
                    data-testid={`search-suggestion-${suggestion.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* BMO Message */}
          <div className="mt-6 text-center">
            <div className="inline-block bg-teal-100 border-2 border-teal-300 rounded-xl px-6 py-3">
              <p className="text-teal-800 font-medium">🤖 BMO says: "Happy searching, mathematical friend!"</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderYouTubeView = () => {
    const handleYouTubeSearch = () => {
      if (youtubeQuery.trim()) {
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(youtubeQuery)}`, '_blank');
      }
    };

    const quickLinks = [
      { name: 'Adventure Time Episodes', query: 'Adventure Time full episodes' },
      { name: 'BMO Moments', query: 'BMO best moments Adventure Time' },
      { name: 'Programming Tutorials', query: 'web development tutorials' },
      { name: 'Relaxing Music', query: 'lofi hip hop study music' },
      { name: 'Gaming Videos', query: 'indie games gameplay' }
    ];

    return (
      <div className="h-full bg-gradient-to-br from-red-50 to-pink-100 p-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg border border-red-200">
              <span className="text-3xl">📺</span>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                BMO YouTube Station
              </h2>
            </div>
            <p className="mt-4 text-gray-600 font-medium">
              Time to watch some mathematical videos! 🎬
            </p>
          </div>

          {/* YouTube Search */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-red-200 mb-6">
            <div className="flex space-x-4">
              <input
                type="text"
                value={youtubeQuery}
                onChange={(e) => setYoutubeQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleYouTubeSearch()}
                placeholder="What videos do you want to watch?"
                className="flex-1 px-6 py-4 text-lg border-2 border-red-300 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                data-testid="youtube-search-input"
              />
              <button
                onClick={handleYouTubeSearch}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                data-testid="youtube-search-button"
              >
                📺 Watch
              </button>
            </div>
          </div>

          {/* Quick Access Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(link.query)}`, '_blank')}
                className="bg-white hover:bg-red-50 border-2 border-red-200 hover:border-red-400 rounded-xl p-6 text-left transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                data-testid={`youtube-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎥</span>
                  <div>
                    <h3 className="font-bold text-gray-800">{link.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">Click to watch on YouTube</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Direct YouTube Link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => window.open('https://www.youtube.com', '_blank')}
              className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              data-testid="youtube-home-button"
            >
              <span className="text-xl">🏠</span>
              <span>Go to YouTube Home</span>
            </button>
          </div>

          {/* BMO Message */}
          <div className="mt-6 text-center">
            <div className="inline-block bg-pink-100 border-2 border-pink-300 rounded-xl px-6 py-3">
              <p className="text-pink-800 font-medium">🤖 BMO says: "Let's watch some algebraic videos together!"</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderInformationView = () => {

    return (
      <div className="h-full bg-gradient-to-br from-purple-50 to-blue-100 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg border border-purple-200">
              <span className="text-3xl">📚</span>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {t('characters.title')}
              </h2>
            </div>
            <p className="mt-4 text-gray-600 font-medium text-lg">
              {t('characters.subtitle')}
            </p>
          </div>

          {selectedCharacterInfo ? (() => {
            const name = getCharacterName(selectedCharacterInfo);
            const description = getCharacterDescription(selectedCharacterInfo);
            const emoji = characterInfo[selectedCharacterInfo].emoji;
            
            return (
              /* Enhanced Character Detail View with Epic Styling and Scroll Gallery */
              <>
              <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 rounded-3xl shadow-2xl border-2 border-yellow-400 relative overflow-hidden">
                {/* Epic Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(251, 191, 36, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(251, 191, 36, 0.3) 0%, transparent 50%)',
                    backgroundSize: '60px 60px'
                  }}></div>
                </div>
                
                <div className="relative p-8">
                  <button
                    onClick={() => setSelectedCharacterInfo(null)}
                    className="mb-6 flex items-center space-x-2 text-yellow-400 hover:text-yellow-200 transition-all duration-300 font-bold text-lg bg-black/20 rounded-full px-4 py-2 border border-yellow-400/50 hover:bg-yellow-400/10"
                    data-testid="back-to-characters"
                  >
                    <span className="text-xl">⚔️</span>
                    <span>{t('characters.backToGallery')}</span>
                  </button>

                  {/* Hero Header */}
                  <div className="text-center mb-8">
                    <div className="relative">
                      <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl ring-4 ring-yellow-400/30 relative">
                        <img 
                          src={getCharacterMainImage(selectedCharacterInfo)} 
                          alt={name}
                          className="w-full h-full object-cover"
                          loading="eager"
                          width="192"
                          height="192"
                        />
                        {/* Epic overlay effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                      </div>
                      {/* Epic glow effect */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 rounded-full bg-yellow-400/10 blur-xl"></div>
                      </div>
                    </div>
                    <h3 className="text-5xl font-black text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text mb-4 drop-shadow-2xl font-serif">
                      {name}
                    </h3>
                    <div className="text-2xl mb-6">{emoji}</div>
                  </div>

                  {/* Epic Description with Scroll */}
                  <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/30 max-h-80 overflow-y-auto" style={{scrollBehavior: 'smooth'}} data-testid="character-description">
                    <div className="prose prose-xl max-w-none prose-invert">
                      <p className="text-gray-100 leading-relaxed text-lg font-medium tracking-wide text-justify whitespace-pre-line">
                        {description}
                      </p>
                    </div>
                    {/* Scroll hint */}
                    <div className="text-center mt-4 text-yellow-400/70 text-sm">
                      <p>{t('info.scrollHint')}</p>
                    </div>
                  </div>

                  {/* Character Image Gallery with Scroll */}
                  <div className="mt-8">
                    <h4 className="text-2xl font-bold text-yellow-400 mb-4 text-center">{t('characters.epicGallery')}</h4>
                    <div className="flex space-x-4 overflow-x-auto custom-scrollbar pb-4" data-testid="character-gallery">
                      {characterImages[selectedCharacterInfo]?.map((image, index) => (
                        <div key={index} className="flex-shrink-0 group">
                          <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-yellow-400/50 shadow-lg group-hover:border-yellow-400 transition-all duration-300 group-hover:scale-110">
                            <img
                              src={image}
                              alt={`${name} gallery image ${index + 1}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              loading="lazy"
                              width="96"
                              height="96"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Epic Footer */}
                  <div className="text-center mt-8 p-4 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-xl border border-yellow-400/20">
                    <p className="text-yellow-300 font-bold text-lg">{t('info.epicFooter')}</p>
                  </div>
                </div>
              </div>
              </>
            );
          })() : (
            /* Character Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(characterInfo).map(([key, character]) => {
                const characterSlug = key as CharacterSlug;
                const name = getCharacterName(characterSlug);
                const description = getCharacterDescription(characterSlug);
                
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedCharacterInfo(characterSlug)}
                    className="bg-white hover:bg-purple-50 border-2 border-purple-200 hover:border-purple-400 rounded-2xl p-6 text-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    data-testid={`character-${key}`}
                  >
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-3 border-purple-200 shadow-md">
                      <img 
                        src={getCharacterMainImage(key)} 
                        alt={name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.log(`Failed to load image for ${key}:`, getCharacterMainImage(key));
                          // Fallback to emoji if image fails
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-4xl">${character.emoji}</div>`;
                          }
                        }}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 font-sans">{name}</h3>
                    <p className="text-gray-600 text-sm font-normal font-sans leading-relaxed">{description.substring(0, 100)}...</p>
                  </button>
                );
              })}
            </div>
          )}

          {/* BMO Message */}
          <div className="mt-8 text-center">
            <div className="inline-block bg-teal-100 border-2 border-teal-300 rounded-xl px-6 py-3">
              <p className="text-teal-800 font-medium text-lg">{t('characters.bmoMessage')}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderExplorerView = () => (
    <div className="h-full bg-white p-4">
      {/* Main Content Area - Modern Grid */}
      <div className="grid grid-cols-4 gap-4">
        {folders.map((folder, index) => (
          <button
            key={folder.name}
            onClick={() => handleFolderClick(folder)}
            className="flex flex-col items-center p-4 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded-lg transition-all duration-200 group"
            style={{ animationDelay: `${index * 0.1}s` }}
            data-testid={`folder-${folder.name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {/* Modern folder icon */}
            <div className="relative mb-3">
              <div className="w-16 h-12 bg-blue-100 border border-blue-300 rounded-lg relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 w-6 h-3 bg-blue-200 border-r border-blue-300 rounded-tl-lg"></div>
                <div className="absolute inset-2 bg-blue-50 rounded flex items-center justify-center">
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {folder.emoji}
                  </span>
                </div>
              </div>
            </div>
            <span className="text-sm text-center text-gray-800 leading-tight max-w-full font-medium">
              {folder.name}
            </span>
            <span className="text-xs text-gray-500 mt-1">
              {folder.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderContentView = () => {
    switch (currentView) {
      case 'videos':
        return (
          <div className="p-4 h-full bg-white overflow-y-auto custom-scrollbar">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b-2 border-gray-300 pb-2">📹 Videos</h3>

            {/* Video Grid with Thumbnails */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-80 overflow-y-auto custom-scrollbar">
              {videoList.map((video) => (
                <div
                  key={video.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-all hover:scale-105"
                  onClick={() => handleVideoClick(video)}
                  data-testid={`video-item-${video.id}`}
                >
                  {/* Video Thumbnail */}
                  <div className="aspect-video bg-black relative group">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextSibling as HTMLDivElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    {/* Fallback for failed images */}
                    <div className="absolute inset-0 bg-gray-600 hidden items-center justify-center">
                      <span className="text-white text-xl">🎥</span>
                    </div>

                    {/* Play Button */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-lg ml-1">▶</span>
                      </div>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-3">
                    <div className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">
                      {video.title}
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      Duration: {video.duration}
                    </div>
                    {/* YouTube Link */}
                    {video.youtubeUrl && (
                      <a 
                        href={video.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-xs text-red-600 hover:text-red-700 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                        data-testid={`youtube-link-${video.id}`}
                      >
                        <span>🔴</span>
                        <span>Watch on YouTube</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Local Video Info */}
            <div className="mt-6 text-center">
              <div className="bg-teal-50 border-2 border-teal-300 rounded-lg p-4 mb-4">
                <div className="text-teal-800 font-medium text-sm">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-xl">🎬</span>
                    <span>محتوى الفيديو محلي</span>
                  </div>
                  <div className="text-xs text-teal-600">
                    الفيديوهات محفوظة على الموقع مباشرة • تشغيل سريع وموثوق
                  </div>
                </div>
              </div>

              <a 
                href="https://www.youtube.com/@Bemora-site"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                data-testid="youtube-channel-link"
              >
                <span>🔴</span>
                <span>Visit Bemora Channel</span>
              </a>
            </div>
          </div>
        );

      case 'images':
        return (
          <div className="p-4 h-full bg-white overflow-y-auto custom-scrollbar">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b border-gray-300 pb-2">🖼️ Character Gallery</h3>

            {/* Files Grid - Adventure Time Characters using real cropped images */}
            <div className="max-h-96 overflow-y-auto custom-scrollbar pr-2">
              <div className="grid grid-cols-5 gap-3">
              {/* Finn File */}
              <button 
                onClick={() => handleCharacterClick('Finn')}
                className="flex flex-col items-center p-2 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded-lg transition-all duration-200 group"
              >
                <div className="relative mb-2">
                  <div className="w-12 h-12 rounded-lg relative overflow-hidden shadow-sm border border-gray-300">
                    <img 
                      src={finnMainImg} 
                      alt="Finn Character"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width="48"
                      height="48"
                    />
                  </div>
                </div>
                <span className="text-xs text-center text-gray-800 leading-tight font-medium">Finn</span>
              </button>

              {/* Jake File */}
              <button 
                onClick={() => handleCharacterClick('Jake')}
                className="flex flex-col items-center p-2 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded-lg transition-all duration-200 group"
              >
                <div className="relative mb-2">
                  <div className="w-12 h-12 rounded-lg relative overflow-hidden shadow-sm border border-gray-300">
                    <img 
                      src={jakeMainImg} 
                      alt="Jake" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="text-xs text-center text-gray-800 leading-tight font-medium">Jake</span>
              </button>

              {/* Princess Bubblegum File */}
              <button 
                onClick={() => handleCharacterClick('Princess Bubblegum')}
                className="flex flex-col items-center p-2 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded-lg transition-all duration-200 group"
              >
                <div className="relative mb-2">
                  <div className="w-12 h-12 rounded-lg relative overflow-hidden shadow-sm border border-gray-300">
                    <img 
                      src={princessBubblegumMainImg} 
                      alt="Princess Bubblegum" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="text-xs text-center text-gray-800 leading-tight font-medium">P.Gum</span>
              </button>

              {/* Marceline File */}
              <button 
                onClick={() => handleCharacterClick('Marceline')}
                className="flex flex-col items-center p-2 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded-lg transition-all duration-200 group"
              >
                <div className="relative mb-2">
                  <div className="w-12 h-12 rounded-lg relative overflow-hidden shadow-sm border border-gray-300">
                    <img 
                      src={marcelineMainImg} 
                      alt="Marceline" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="text-xs text-center text-gray-800 leading-tight font-medium">Marceline</span>
              </button>

              {/* BMO File */}
              <button 
                onClick={() => handleCharacterClick('BMO')}
                className="flex flex-col items-center p-2 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded-lg transition-all duration-200 group"
              >
                <div className="relative mb-2">
                  <div className="w-12 h-12 rounded-lg relative overflow-hidden shadow-sm border border-gray-300">
                    <img 
                      src={bmoMainImg} 
                      alt="BMO" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="text-xs text-center text-gray-800 leading-tight font-medium">BMO</span>
              </button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              🎭 Adventure Time Characters from your images
            </div>
          </div>
        );

      case 'character':
        return (
          <div className="p-4 h-full bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2">📁 {selectedCharacter} Files</h3>
              <button 
                onClick={() => {
                  setCurrentView('images');
                  setCurrentPath('C:\\Portfolio\\Images\\');
                }}
                className="text-blue-500 hover:text-blue-700 text-sm font-medium"
              >
                ← Back to Gallery
              </button>
            </div>

            {/* Character Images Gallery */}
            <div className="max-h-96 overflow-y-auto custom-scrollbar pr-2">
              <div className="grid grid-cols-3 gap-3">
              {(selectedCharacter && characterImages[selectedCharacter as CharacterSlug] || []).map((imageUrl: string, index: number) => (
                <div key={index} className="aspect-square bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden group hover:shadow-md transition-all duration-200">
                  <img 
                    src={imageUrl} 
                    alt={`${selectedCharacter} ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    data-testid={`character-image-${selectedCharacter.toLowerCase()}-${index}`}
                  />
                </div>
              ))}

              {/* Show placeholder if no images */}
              {(!selectedCharacter || !characterImages[selectedCharacter as CharacterSlug] || characterImages[selectedCharacter as CharacterSlug].length === 0) && (
                <div className="col-span-3 text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">📷</div>
                  <div className="text-sm">No images found for {selectedCharacter}</div>
                </div>
              )}
              </div>
            </div>

            <div className="mt-4 p-3 bg-teal-50 rounded-lg border border-teal-200">
              <div className="text-sm text-teal-800">
                <div className="font-medium mb-1">🎨 {selectedCharacter} Gallery</div>
                <div className="text-xs text-teal-600">
                  {selectedCharacter ? (characterImages[selectedCharacter as CharacterSlug]?.length || 0) : 0} images available from Adventure Time collection
                </div>
              </div>
            </div>
          </div>
        );

      case 'chat':
        return (
          <div className="p-4 h-full flex flex-col bg-white">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b border-gray-300 pb-2">💬 AI Talk with BMO</h3>
            <div className="flex-1 overflow-y-auto mb-4 space-y-2 bg-gray-50 border border-gray-300 p-4 rounded-lg" style={{ minHeight: '200px' }}>
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg text-sm max-w-[85%] ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white ml-auto'
                      : 'bg-white border border-gray-300 shadow-sm'
                  }`}
                >
                  <div className="leading-relaxed">
                    <span className="font-medium">{message.sender === 'user' ? 'You:' : 'BMO:'}</span> {message.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask BMO anything..."
                className="flex-1 text-sm p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                data-testid="chat-input"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                data-testid="chat-send"
              >
                Send
              </button>
            </div>
          </div>
        );

      case 'communities':
        return (
          <div className="p-4 bg-white h-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b border-gray-300 pb-2">👥 Communities & Social</h3>
            <div className="grid grid-cols-1 gap-3">
              <a 
                href="https://discord.gg/bem0ra" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 hover:border-indigo-300 rounded-lg transition-colors group"
                data-testid="link-discord"
              >
                <SiDiscord className="text-2xl text-indigo-600" />
                <div>
                  <div className="font-medium text-gray-800 group-hover:text-indigo-700">Discord: bem0ra</div>
                  <div className="text-sm text-gray-600 mt-1">Find me on Discord as bem0ra</div>
                </div>
              </a>

              <a 
                href="https://api.whatsapp.com/send/?phone=201500302461&text&type=phone_number&app_absent=0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 border border-green-200 hover:border-green-300 rounded-lg transition-colors group"
                data-testid="link-whatsapp"
              >
                <SiWhatsapp className="text-2xl text-green-600" />
                <div>
                  <div className="font-medium text-gray-800 group-hover:text-green-700">WhatsApp Direct</div>
                  <div className="text-sm text-gray-600 mt-1">Contact me directly on WhatsApp</div>
                </div>
              </a>

              <a 
                href="https://x.com/Bemora_BEMO" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-lg transition-colors group"
                data-testid="link-twitter"
              >
                <SiX className="text-2xl text-gray-800" />
                <div>
                  <div className="font-medium text-gray-800 group-hover:text-gray-700">X @Bemora_BEMO</div>
                  <div className="text-sm text-gray-600 mt-1">Follow for updates and tips</div>
                </div>
              </a>

              <a 
                href="https://www.youtube.com/@Bemora-site" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 rounded-lg transition-colors group"
                data-testid="link-youtube"
              >
                <SiYoutube className="text-2xl text-red-600" />
                <div>
                  <div className="font-medium text-gray-800 group-hover:text-red-700">YouTube Channel</div>
                  <div className="text-sm text-gray-600 mt-1">Watch tutorials and project demos</div>
                </div>
              </a>

              <a 
                href="https://www.facebook.com/people/Bemora/61576053958575/?rdid=Z6xyqvNRgakQpzHM&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F12LQYx45ZEV%2F" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 rounded-lg transition-colors group"
                data-testid="link-facebook"
              >
                <SiFacebook className="text-2xl text-blue-600" />
                <div>
                  <div className="font-medium text-gray-800 group-hover:text-blue-700">Facebook Page</div>
                  <div className="text-sm text-gray-600 mt-1">Connect and stay updated</div>
                </div>
              </a>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="p-4 bg-white h-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b border-gray-300 pb-2">📒 Contact Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <a 
                href="mailto:developer@bmo-portfolio.com"
                className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 border border-green-200 hover:border-green-300 rounded-lg transition-colors group"
              >
                <div className="text-2xl">📧</div>
                <div>
                  <div className="font-medium text-gray-800 group-hover:text-green-700">Email Address</div>
                  <div className="text-sm text-gray-600 mt-1">developer@bmo-portfolio.com</div>
                </div>
              </a>

              <a 
                href="https://www.linkedin.com/in/mostafa-mohamed-409540336/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 rounded-lg transition-colors group"
              >
                <SiLinkedin className="text-2xl text-blue-600" />
                <div>
                  <div className="font-medium text-gray-800 group-hover:text-blue-700">LinkedIn Profile</div>
                  <div className="text-sm text-gray-600 mt-1">Connect for professional opportunities</div>
                </div>
              </a>

              <a 
                href="https://discord.gg/bem0ra" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 hover:border-indigo-300 rounded-lg transition-colors group"
                data-testid="link-discord-contact"
              >
                <SiDiscord className="text-2xl text-indigo-600" />
                <div>
                  <div className="font-medium text-gray-800 group-hover:text-indigo-700">Discord: bem0ra</div>
                  <div className="text-sm text-gray-600 mt-1">Find me on Discord as bem0ra</div>
                </div>
              </a>

              <a 
                href="https://api.whatsapp.com/send/?phone=201500302461&text&type=phone_number&app_absent=0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 border border-green-200 hover:border-green-300 rounded-lg transition-colors group"
                data-testid="link-whatsapp-contact"
              >
                <SiWhatsapp className="text-2xl text-green-600" />
                <div>
                  <div className="font-medium text-gray-800 group-hover:text-green-700">WhatsApp Direct</div>
                  <div className="text-sm text-gray-600 mt-1">Contact me directly on WhatsApp</div>
                </div>
              </a>

              <a 
                href="https://mustaf.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-teal-50 hover:bg-teal-100 border border-teal-200 hover:border-teal-300 rounded-lg transition-colors group"
                data-testid="link-portfolio"
              >
                <div className="text-2xl">🌐</div>
                <div>
                  <div className="font-medium text-gray-800 group-hover:text-teal-700">My Portfolio</div>
                  <div className="text-sm text-gray-600 mt-1">mustaf.vercel.app - View my complete portfolio</div>
                </div>
              </a>

              <a 
                href="https://calendly.com/bmo-developer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 border border-purple-200 hover:border-purple-300 rounded-lg transition-colors group"
              >
                <div className="text-2xl">📱</div>
                <div>
                  <div className="font-medium text-gray-800 group-hover:text-purple-700">Schedule Meeting</div>
                  <div className="text-sm text-gray-600 mt-1">Book a 30-minute consultation</div>
                </div>
              </a>
            </div>
          </div>
        );

      case 'tools':
        return (
          <div className="p-4 bg-white h-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b border-gray-300 pb-2">🛠 Development Toolkit</h3>
            <div className="grid grid-cols-1 gap-3">
              <a 
                href="https://mui.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 rounded-lg transition-colors group"
                data-testid="tool-mui"
              >
                <div className="text-2xl">⚛️</div>
                <div>
                  <div className="font-medium text-gray-800 group-hover:text-blue-700">Material-UI (MUI)</div>
                  <div className="text-sm text-gray-600 mt-1">React component library with Material Design</div>
                </div>
              </a>

              <a 
                href="https://best-of-web.builder.io/cat/typescript/components" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 border border-purple-200 hover:border-purple-300 rounded-lg transition-colors group"
                data-testid="tool-typescript-components"
              >
                <div className="text-2xl">📦</div>
                <div>
                  <div className="font-medium text-gray-800 group-hover:text-purple-700">TypeScript Components</div>
                  <div className="text-sm text-gray-600 mt-1">Best TypeScript component libraries collection</div>
                </div>
              </a>

              <a 
                href="https://www.flaticon.com/free-icons/design-system" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 border border-green-200 hover:border-green-300 rounded-lg transition-colors group"
                data-testid="tool-flaticon"
              >
                <div className="text-2xl">🎨</div>
                <div>
                  <div className="font-medium text-gray-800 group-hover:text-green-700">Flaticon Design System</div>
                  <div className="text-sm text-gray-600 mt-1">Free icons and design system resources</div>
                </div>
              </a>

              <a 
                href="https://www.npmjs.com/package/npm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 rounded-lg transition-colors group"
                data-testid="tool-npm"
              >
                <div className="text-2xl">📦</div>
                <div>
                  <div className="font-medium text-gray-800 group-hover:text-red-700">NPM Package Manager</div>
                  <div className="text-sm text-gray-600 mt-1">Node.js package manager and registry</div>
                </div>
              </a>
            </div>
          </div>
        );

      case 'games':
        return (
          <div className="p-6 h-full bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 relative overflow-hidden overflow-y-auto custom-scrollbar">
            {/* Retro grid background */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                {[...Array(48)].map((_, i) => (
                  <div key={i} className="border border-cyan-400 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
            </div>

            {/* Floating geometric shapes */}
            <div className="absolute top-10 left-10 w-8 h-8 bg-cyan-400 rotate-45 animate-spin opacity-30"></div>
            <div className="absolute top-20 right-16 w-6 h-6 bg-pink-400 rounded-full animate-bounce opacity-40"></div>
            <div className="absolute bottom-20 left-20 w-4 h-16 bg-yellow-400 animate-pulse opacity-30"></div>

            <div className="relative z-10">
              {/* Retro header with neon effect */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 animate-pulse font-mono tracking-wider">
                  ◄ ADVENTURE ARCADE ►
                </h1>
                <div className="flex justify-center items-center space-x-4 mb-4">
                  <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-transparent animate-pulse"></div>
                  <span className="text-cyan-300 font-mono text-sm tracking-widest">SELECT GAME</span>
                  <div className="h-1 w-16 bg-gradient-to-l from-cyan-400 to-transparent animate-pulse"></div>
                </div>
              </div>

              {/* Game selection cards with retro styling */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Tic Tac Toe Card */}
                <button
                  onClick={() => handleGameClick('tictactoe')}
                  className="relative group w-full h-64"
                  data-testid="game-tictactoe"
                >
                  {/* Large Background Logo */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-40 transition-opacity">
                    <img 
                      src={ticTacToeLogo} 
                      alt="Tic Tac Toe Game Logo"
                      className="w-52 h-52 object-cover filter brightness-150 rounded-lg"
                      loading="lazy"
                      width="208"
                      height="208"
                    />
                  </div>
                  
                  <div className="relative z-10 bg-black/80 border-4 border-cyan-400 rounded-none p-6 hover:border-pink-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-400/50 transform group-hover:scale-105 h-full flex flex-col justify-center">
                    {/* Corner indicators */}
                    <div className="absolute top-2 left-2 w-2 h-2 bg-cyan-400 animate-pulse"></div>
                    <div className="absolute top-2 right-2 w-2 h-2 bg-pink-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-yellow-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-green-400 animate-pulse" style={{ animationDelay: '1.5s' }}></div>

                    <div className="text-center">
                      <div className="text-4xl mb-3 text-cyan-400 group-hover:text-pink-400 transition-colors font-mono drop-shadow-lg">X◯</div>
                      <h3 className="text-xl font-bold text-white mb-2 font-mono tracking-wide drop-shadow-lg">TIC TAC TOE</h3>
                      <p className="text-cyan-300 mb-3 font-mono text-xs drop-shadow-lg">FINN vs JAKE</p>

                      {/* Difficulty indicators */}
                      <div className="flex justify-center space-x-1 mb-3">
                        <div className="px-1 py-0.5 bg-green-500 text-black text-xs font-bold font-mono shadow-lg">EASY</div>
                        <div className="px-1 py-0.5 bg-yellow-500 text-black text-xs font-bold font-mono shadow-lg">MED</div>
                        <div className="px-1 py-0.5 bg-red-500 text-black text-xs font-bold font-mono shadow-lg">HARD</div>
                      </div>

                      <div className="text-xs text-gray-300 font-mono drop-shadow-lg">VS BOT • 2 PLAYER</div>
                    </div>
                  </div>

                  {/* Retro glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-pink-400/20 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl transform scale-110"></div>
                </button>

                {/* Maze Game Card */}
                <button
                  onClick={() => handleGameClick('maze')}
                  className="relative group w-full h-64"
                  data-testid="game-maze"
                >
                  {/* Large Background Logo */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-40 transition-opacity">
                    <img 
                      src={mazeGameLogo} 
                      alt="Maze Game Logo"
                      className="w-52 h-52 object-cover filter brightness-150 rounded-lg"
                      loading="lazy"
                      width="208"
                      height="208"
                    />
                  </div>
                  
                  <div className="relative z-10 bg-black/80 border-4 border-purple-400 rounded-none p-6 hover:border-yellow-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-400/50 transform group-hover:scale-105 h-full flex flex-col justify-center">
                    {/* Corner indicators */}
                    <div className="absolute top-2 left-2 w-2 h-2 bg-purple-400 animate-pulse"></div>
                    <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-pink-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-cyan-400 animate-pulse" style={{ animationDelay: '1.5s' }}></div>

                    <div className="text-center">
                      <div className="text-4xl mb-3 text-purple-400 group-hover:text-yellow-400 transition-colors font-mono drop-shadow-lg">⬜</div>
                      <h3 className="text-xl font-bold text-white mb-2 font-mono tracking-wide drop-shadow-lg">MAZE RUNNER</h3>
                      <p className="text-purple-300 mb-3 font-mono text-xs drop-shadow-lg">10 EPIC LEVELS</p>

                      {/* Level grid visualization */}
                      <div className="grid grid-cols-5 gap-0.5 justify-center mb-3 max-w-16 mx-auto">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className="w-1.5 h-1.5 bg-purple-400 border border-purple-300 animate-pulse shadow-lg" style={{ animationDelay: `${i * 0.1}s` }}></div>
                        ))}
                      </div>

                      <div className="text-xs text-gray-300 font-mono drop-shadow-lg">JOYSTICK • KEYBOARD</div>
                    </div>
                  </div>

                  {/* Retro glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-yellow-400/20 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl transform scale-110"></div>
                </button>

                {/* Snake Game Card */}
                <button
                  onClick={() => handleGameClick('snake')}
                  className="relative group w-full h-64"
                  data-testid="game-snake"
                >
                  {/* Large Background Logo */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-40 transition-opacity">
                    <img 
                      src={snakeGameLogo} 
                      alt="Snake Game Logo"
                      className="w-52 h-52 object-cover filter brightness-150 rounded-lg"
                      loading="lazy"
                      width="208"
                      height="208"
                    />
                  </div>
                  
                  <div className="relative z-10 bg-black/80 border-4 border-pink-400 rounded-none p-6 hover:border-orange-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-pink-400/50 transform group-hover:scale-105 h-full flex flex-col justify-center">
                    {/* Corner indicators */}
                    <div className="absolute top-2 left-2 w-2 h-2 bg-pink-400 animate-pulse"></div>
                    <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-red-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-yellow-400 animate-pulse" style={{ animationDelay: '1.5s' }}></div>

                    <div className="text-center">
                      <div className="text-4xl mb-3 text-pink-400 group-hover:text-orange-400 transition-colors font-mono drop-shadow-lg">🐍</div>
                      <h3 className="text-xl font-bold text-white mb-2 font-mono tracking-wide drop-shadow-lg">CANDY SNAKE</h3>
                      <p className="text-pink-300 mb-3 font-mono text-xs drop-shadow-lg">COLLECT CANDY</p>

                      {/* Snake movement visualization */}
                      <div className="flex justify-center space-x-1 mb-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                        <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-green-200 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.4s' }}></div>
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.6s' }}>🍭</div>
                      </div>

                      <div className="text-xs text-gray-300 font-mono drop-shadow-lg">ARROWS • WASD</div>
                    </div>
                  </div>

                  {/* Retro glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl transform scale-110"></div>
                </button>

                {/* BMO Quiz Game Card */}
                <button
                  onClick={() => handleGameClick('bmoquiz')}
                  className="relative group w-full h-64"
                  data-testid="game-bmoquiz"
                >
                  {/* Large Background Logo */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-40 transition-opacity">
                    <img 
                      src={bmoQuizLogo} 
                      alt="BMO Quiz Game Logo"
                      className="w-52 h-52 object-cover filter brightness-150 rounded-lg"
                      loading="lazy"
                      width="208"
                      height="208"
                    />
                  </div>
                  
                  <div className="relative z-10 bg-black/80 border-4 border-green-400 rounded-none p-6 hover:border-teal-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-green-400/50 transform group-hover:scale-105 h-full flex flex-col justify-center">
                    {/* Corner indicators */}
                    <div className="absolute top-2 left-2 w-2 h-2 bg-green-400 animate-pulse"></div>
                    <div className="absolute top-2 right-2 w-2 h-2 bg-teal-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-blue-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-cyan-400 animate-pulse" style={{ animationDelay: '1.5s' }}></div>

                    <div className="text-center">
                      <div className="text-4xl mb-3 text-green-400 group-hover:text-teal-400 transition-colors font-mono drop-shadow-lg">🎮</div>
                      <h3 className="text-xl font-bold text-white mb-2 font-mono tracking-wide drop-shadow-lg">BMO QUIZ</h3>
                      <p className="text-green-300 mb-3 font-mono text-xs drop-shadow-lg">CHARACTER QUIZ</p>

                      {/* Character icons */}
                      <div className="flex justify-center space-x-1 mb-3">
                        <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs shadow-lg">👑</div>
                        <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center text-xs shadow-lg">🐕</div>
                        <div className="w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center text-xs shadow-lg">👸</div>
                        <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-xs shadow-lg">🧛</div>
                        <div className="w-6 h-6 bg-teal-400 rounded-full flex items-center justify-center text-xs shadow-lg">🤖</div>
                      </div>

                      <div className="text-xs text-gray-300 font-mono drop-shadow-lg">5 QUESTIONS • RANDOM</div>
                    </div>
                  </div>

                  {/* Retro glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl transform scale-110"></div>
                </button>
              </div>

              {/* Bottom retro message */}
              <div className="mt-12 text-center">
                <div className="inline-block border-2 border-cyan-400 bg-black px-8 py-4 relative">
                  <div className="absolute -top-1 -left-1 w-3 h-3 bg-cyan-400"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-yellow-400"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400"></div>

                  <p className="text-white font-mono text-sm tracking-wider">
                    ► CHOOSE YOUR ADVENTURE ◄
                  </p>
                  <p className="text-cyan-300 font-mono text-xs mt-2">
                    PRESS [SELECT] TO CONTINUE
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tictactoe':
        return <TicTacToeGame onBack={() => setCurrentView('games')} />;

      case 'maze':
        return <MazeGame onBack={() => setCurrentView('games')} />;

      case 'bmoquiz':
        return <BMOQuizGame onBack={() => setCurrentView('games')} />;

      case 'snake':
        return <SnakeGame onBack={() => setCurrentView('games')} />;

      case 'google-search':
        return renderGoogleSearchView();

      case 'youtube':
        return renderYouTubeView();

      case 'information':
        return renderInformationView();

      default:
        return renderExplorerView();
    }
  };

  // Show BMO face first, then transition to file explorer
  if (showFace) {
    return (
      <div className="w-full h-full relative">
        <BMOFace isVisible={showFace} onFaceComplete={handleFaceComplete} />
      </div>
    );
  }

  return (
    <>
      <div 
        className="w-full h-full bg-white text-black"
        style={{ fontSize: '12px' }}
        data-testid="bmo-filesystem"
      >
        {/* Modern Windows 10 Style Top Bar */}
        <div className="bg-white border-b border-gray-300 px-3 py-2 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm font-medium text-gray-700">File Explorer</span>
          </div>
          <div className="flex items-center space-x-3">
            <LanguageSwitcher />
            {onBack && (
              <button 
                onClick={() => {
                  // Play BMO close sound when going back
                  const audio = new Audio(bmoCloseSound);
                  audio.volume = 0.3;
                  audio.play().catch(() => {
                    // Handle audio play failure silently
                  });
                  onBack();
                }}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1 rounded"
                data-testid="button-back-to-face"
                title="Close File Explorer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Ribbon Menu - Hidden on mobile for space */}
        <div className="hidden md:block bg-gray-50 border-b border-gray-300 px-3 py-1">
          <div className="flex items-center space-x-4 text-xs text-gray-600">
            <button className="hover:bg-gray-200 px-2 py-1 rounded transition-colors">File</button>
            <button className="hover:bg-gray-200 px-2 py-1 rounded transition-colors">Home</button>
            <button className="hover:bg-gray-200 px-2 py-1 rounded transition-colors">Share</button>
            <button className="hover:bg-gray-200 px-2 py-1 rounded transition-colors">View</button>
          </div>
        </div>

        {/* Navigation Bar - Mobile-Friendly Windows Style */}
        <div className="bg-white border-b border-gray-300 px-3 py-2 flex items-center space-x-2 md:space-x-3">
          <div className="flex items-center space-x-1">
            <button
              onClick={handleBackClick}
              disabled={currentView === 'explorer'}
              className={`p-2 md:p-1 text-lg md:text-base rounded hover:bg-gray-100 transition-colors touch-manipulation ${
                currentView === 'explorer' 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              data-testid="nav-back"
              title="Back"
            >
              ←
            </button>
            <button
              disabled
              className="p-2 md:p-1 text-lg md:text-base rounded text-gray-400 cursor-not-allowed"
              title="Forward (not available)"
            >
              →
            </button>
            <button
              className="p-2 md:p-1 text-lg md:text-base rounded hover:bg-gray-100 text-gray-600 hover:text-gray-800 touch-manipulation"
              title="Up"
            >
              ↑
            </button>
          </div>
          <div className="flex-1 bg-gray-50 border border-gray-300 px-2 md:px-3 py-1 text-xs md:text-sm rounded overflow-hidden min-h-[32px] md:min-h-auto" style={{ fontFamily: 'system-ui' }}>
            <span className="flex items-center space-x-1 w-full">
              <span className="text-blue-600 text-sm md:text-base flex-shrink-0">📁</span>
              <span className="truncate whitespace-nowrap text-ellipsis overflow-hidden">{currentPath}</span>
            </span>
          </div>
          <div className="hidden md:block text-xs text-gray-500">
            {currentView === 'explorer' ? `${folders.length} items` : '1 item'}
          </div>
        </div>

        {/* Main Content Area with Responsive Sidebar */}
        <div className="flex-1 h-full overflow-hidden flex flex-col md:flex-row">
          {/* Mobile Menu Button */}
          <div className="md:hidden bg-gray-100 border-b border-gray-300 px-3 py-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors p-2 rounded touch-none"
              data-testid="button-mobile-menu"
            >
              <span className="text-lg">☰</span>
              <span className="text-sm font-medium">Menu</span>
            </button>
          </div>

          {/* Sidebar - Hidden on mobile by default, visible on desktop */}
          <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-48 bg-gray-50 ${mobileMenuOpen ? 'border-b' : 'md:border-r'} border-gray-300 p-2`}>
            <div className="space-y-1">
              <div className="text-xs font-medium text-gray-600 mb-2">BMO Portfolio</div>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-1">
                {folders.map((folder) => (
                  <button
                    key={folder.name}
                    onClick={() => {
                      handleFolderClick(folder);
                      setMobileMenuOpen(false); // Close mobile menu after selection
                    }}
                    className={`flex items-center space-x-2 w-full text-left px-3 py-3 md:px-2 md:py-1 text-sm rounded hover:bg-gray-200 transition-colors min-h-[44px] md:min-h-auto ${
                      currentView === folder.type ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                    }`}
                    data-testid={`folder-${folder.type}`}
                  >
                    <span className="text-xl md:text-base flex-shrink-0">{folder.emoji}</span>
                    <span className="font-medium md:font-normal text-left">{folder.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full animate-fadeInUp">
              {renderContentView()}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Video Player */}
      {isVideoModalOpen && selectedVideo && (
        <EnhancedVideoPlayer
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          video={selectedVideo}
        />
      )}
    </>
  );
}