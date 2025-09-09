import { useState } from 'react';
import BMOFace from './BMOFace';
import VideoPlayerModalComponent from './VideoPlayerModalComponent';
import ReactPlayer from 'react-player';
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

interface BMO_FileSystemComponentProps {
  onBack?: () => void;
}

type ViewType = 'explorer' | 'videos' | 'chat' | 'communities' | 'contact' | 'tools' | 'images' | 'character' | 'games' | 'tictactoe' | 'maze' | 'bmoquiz' | 'snake';

interface FolderItem {
  name: string;
  emoji: string;
  type: ViewType;
  description: string;
}

export default function BMO_FileSystemComponent({ onBack }: BMO_FileSystemComponentProps) {
  const [showFace, setShowFace] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('explorer');
  const [currentPath, setCurrentPath] = useState('C:\\Portfolio\\');
  const [selectedCharacter, setSelectedCharacter] = useState<string>('');

  // Character images mapping
  const characterImages: Record<string, string[]> = {
    'Finn': [finnImg1, finnImg2, finnImg3, finnImg4, finnImg5, finnImg6],
    'Jake': [jakeImg1, jakeImg2, jakeImg3, jakeImg4, jakeImg5],
    'Princess Bubblegum': [princessImg1, princessImg2, princessImg3, princessImg4, princessImg5],
    'Marceline': [marcelineImg1, marcelineImg2, marcelineImg3, marcelineImg4, marcelineImg5, marcelineImg6],
    'BMO': [bmoImg1, bmoImg2, bmoImg3, bmoImg4, bmoImg5, bmoImg6, bmoImg7]
  };
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bmo', text: "Hi! I'm BMO! Ask me anything about my creator's work!" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  
  // Video list with both local and YouTube URLs for better compatibility
  const videoList = [
    {
      id: '1',
      title: 'BMO Adventure Short #1',
      url: 'https://youtube.com/shorts/A1eUITFLvrA', 
      youtubeUrl: 'https://youtube.com/shorts/A1eUITFLvrA',
      thumbnail: 'https://img.youtube.com/vi/A1eUITFLvrA/mqdefault.jpg',
      duration: '0:15'
    },
    {
      id: '2', 
      title: 'BMO Adventure Short #2',
      url: 'https://youtube.com/shorts/920D9DjKgCo',
      youtubeUrl: 'https://youtube.com/shorts/920D9DjKgCo',
      thumbnail: 'https://img.youtube.com/vi/920D9DjKgCo/mqdefault.jpg',
      duration: '0:20'
    },
    {
      id: '3',
      title: 'BMO Adventure Short #3', 
      url: 'https://youtube.com/shorts/Ql7tURnDdzk',
      youtubeUrl: 'https://youtube.com/shorts/Ql7tURnDdzk',
      thumbnail: 'https://img.youtube.com/vi/Ql7tURnDdzk/mqdefault.jpg',
      duration: '0:18'
    },
    {
      id: '4',
      title: 'Adventure Time Tutorial',
      url: 'https://www.youtube.com/watch?v=puFy652XCl8',
      youtubeUrl: 'https://www.youtube.com/watch?v=puFy652XCl8',
      thumbnail: 'https://img.youtube.com/vi/puFy652XCl8/mqdefault.jpg',
      duration: '2:45'
    },
    {
      id: '5',
      title: 'BMO Coding Session',
      url: 'https://www.youtube.com/watch?v=wjwNBUB_iXk',
      youtubeUrl: 'https://www.youtube.com/watch?v=wjwNBUB_iXk', 
      thumbnail: 'https://img.youtube.com/vi/wjwNBUB_iXk/mqdefault.jpg',
      duration: '1:30'
    }
  ];

  // Handle video click
  const handleVideoClick = (video: {id: string, title: string, url: string, thumbnail: string, youtubeUrl?: string}) => {
    const videoIndex = videoList.findIndex(v => v.id === video.id);
    setSelectedVideoIndex(videoIndex);
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
      name: 'Images',
      emoji: '🖼️',
      type: 'images',
      description: 'Personal photos and gallery'
    },
    {
      name: 'Contact Me',
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
    setSelectedCharacter(characterName);
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
          "BMO is the best living video game console! I live with Finn and Jake in the Tree Fort! 🏠",
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
            
            {/* Main Channel Link */}
            <div className="mt-6 text-center">
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
                      alt="Finn" 
                      className="w-full h-full object-cover"
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
              {(characterImages[selectedCharacter] || []).map((imageUrl, index) => (
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
              {(!characterImages[selectedCharacter] || characterImages[selectedCharacter].length === 0) && (
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
                  {characterImages[selectedCharacter]?.length || 0} images available from Adventure Time collection
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
                  className="relative group"
                  data-testid="game-tictactoe"
                >
                  <div className="bg-black border-4 border-cyan-400 rounded-none p-6 hover:border-pink-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-400/50 transform group-hover:scale-105">
                    <div className="absolute top-2 left-2 w-2 h-2 bg-cyan-400 animate-pulse"></div>
                    <div className="absolute top-2 right-2 w-2 h-2 bg-pink-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-yellow-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-green-400 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                    
                    <div className="text-center">
                      <div className="text-4xl mb-3 text-cyan-400 group-hover:text-pink-400 transition-colors font-mono">X◯</div>
                      <h3 className="text-xl font-bold text-white mb-2 font-mono tracking-wide">TIC TAC TOE</h3>
                      <p className="text-cyan-300 mb-3 font-mono text-xs">FINN vs JAKE</p>
                      
                      {/* Difficulty indicators */}
                      <div className="flex justify-center space-x-1 mb-3">
                        <div className="px-1 py-0.5 bg-green-500 text-black text-xs font-bold font-mono">EASY</div>
                        <div className="px-1 py-0.5 bg-yellow-500 text-black text-xs font-bold font-mono">MED</div>
                        <div className="px-1 py-0.5 bg-red-500 text-black text-xs font-bold font-mono">HARD</div>
                      </div>
                      
                      <div className="text-xs text-gray-400 font-mono">VS BOT • 2 PLAYER</div>
                    </div>
                  </div>
                  
                  {/* Retro glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-pink-400/20 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl transform scale-110"></div>
                </button>

                {/* Maze Game Card */}
                <button
                  onClick={() => handleGameClick('maze')}
                  className="relative group"
                  data-testid="game-maze"
                >
                  <div className="bg-black border-4 border-purple-400 rounded-none p-6 hover:border-yellow-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-400/50 transform group-hover:scale-105">
                    <div className="absolute top-2 left-2 w-2 h-2 bg-purple-400 animate-pulse"></div>
                    <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-pink-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-cyan-400 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                    
                    <div className="text-center">
                      <div className="text-4xl mb-3 text-purple-400 group-hover:text-yellow-400 transition-colors font-mono">⬜</div>
                      <h3 className="text-xl font-bold text-white mb-2 font-mono tracking-wide">MAZE RUNNER</h3>
                      <p className="text-purple-300 mb-3 font-mono text-xs">10 EPIC LEVELS</p>
                      
                      {/* Level grid visualization */}
                      <div className="grid grid-cols-5 gap-0.5 justify-center mb-3 max-w-16 mx-auto">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className="w-1.5 h-1.5 bg-purple-400 border border-purple-300 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                        ))}
                      </div>
                      
                      <div className="text-xs text-gray-400 font-mono">JOYSTICK • KEYBOARD</div>
                    </div>
                  </div>
                  
                  {/* Retro glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-yellow-400/20 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl transform scale-110"></div>
                </button>

                {/* Snake Game Card */}
                <button
                  onClick={() => handleGameClick('snake')}
                  className="relative group"
                  data-testid="game-snake"
                >
                  <div className="bg-black border-4 border-pink-400 rounded-none p-6 hover:border-orange-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-pink-400/50 transform group-hover:scale-105">
                    <div className="absolute top-2 left-2 w-2 h-2 bg-pink-400 animate-pulse"></div>
                    <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-red-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-yellow-400 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                    
                    <div className="text-center">
                      <div className="text-4xl mb-3 text-pink-400 group-hover:text-orange-400 transition-colors font-mono">🐍</div>
                      <h3 className="text-xl font-bold text-white mb-2 font-mono tracking-wide">CANDY SNAKE</h3>
                      <p className="text-pink-300 mb-3 font-mono text-xs">COLLECT CANDY</p>
                      
                      {/* Snake movement visualization */}
                      <div className="flex justify-center space-x-1 mb-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-green-200 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}>🍭</div>
                      </div>
                      
                      <div className="text-xs text-gray-400 font-mono">ARROWS • WASD</div>
                    </div>
                  </div>
                  
                  {/* Retro glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl transform scale-110"></div>
                </button>

                {/* BMO Quiz Game Card */}
                <button
                  onClick={() => handleGameClick('bmoquiz')}
                  className="relative group"
                  data-testid="game-bmoquiz"
                >
                  <div className="bg-black border-4 border-green-400 rounded-none p-6 hover:border-teal-400 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-green-400/50 transform group-hover:scale-105">
                    <div className="absolute top-2 left-2 w-2 h-2 bg-green-400 animate-pulse"></div>
                    <div className="absolute top-2 right-2 w-2 h-2 bg-teal-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 bg-blue-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-2 right-2 w-2 h-2 bg-cyan-400 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                    
                    <div className="text-center">
                      <div className="text-4xl mb-3 text-green-400 group-hover:text-teal-400 transition-colors font-mono">🎮</div>
                      <h3 className="text-xl font-bold text-white mb-2 font-mono tracking-wide">BMO QUIZ</h3>
                      <p className="text-green-300 mb-3 font-mono text-xs">CHARACTER QUIZ</p>
                      
                      {/* Character icons */}
                      <div className="flex justify-center space-x-1 mb-3">
                        <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs">👑</div>
                        <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center text-xs">🐕</div>
                        <div className="w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center text-xs">👸</div>
                        <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-xs">🧛</div>
                        <div className="w-6 h-6 bg-teal-400 rounded-full flex items-center justify-center text-xs">🤖</div>
                      </div>
                      
                      <div className="text-xs text-gray-400 font-mono">5 QUESTIONS • RANDOM</div>
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

        {/* Ribbon Menu */}
        <div className="bg-gray-50 border-b border-gray-300 px-3 py-1">
          <div className="flex items-center space-x-4 text-xs text-gray-600">
            <button className="hover:bg-gray-200 px-2 py-1 rounded">File</button>
            <button className="hover:bg-gray-200 px-2 py-1 rounded">Home</button>
            <button className="hover:bg-gray-200 px-2 py-1 rounded">Share</button>
            <button className="hover:bg-gray-200 px-2 py-1 rounded">View</button>
          </div>
        </div>

        {/* Navigation Bar - Modern Windows Style */}
        <div className="bg-white border-b border-gray-300 px-3 py-2 flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <button
              onClick={handleBackClick}
              disabled={currentView === 'explorer'}
              className={`p-1 rounded hover:bg-gray-100 transition-colors ${
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
              className="p-1 rounded text-gray-400 cursor-not-allowed"
              title="Forward (not available)"
            >
              →
            </button>
            <button
              className="p-1 rounded hover:bg-gray-100 text-gray-600 hover:text-gray-800"
              title="Up"
            >
              ↑
            </button>
          </div>
          <div className="flex-1 bg-gray-50 border border-gray-300 px-3 py-1 text-sm rounded" style={{ fontFamily: 'system-ui' }}>
            <span className="flex items-center space-x-1">
              <span className="text-blue-600">📁</span>
              <span>{currentPath}</span>
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {currentView === 'explorer' ? `${folders.length} items` : '1 item'}
          </div>
        </div>

        {/* Main Content Area with Sidebar */}
        <div className="flex-1 h-full overflow-hidden flex">
          {/* Left Sidebar */}
          <div className="w-48 bg-gray-50 border-r border-gray-300 p-2">
            <div className="space-y-1">
              <div className="text-xs font-medium text-gray-600 mb-2">BMO Portfolio</div>
              {folders.map((folder) => (
                <button
                  key={folder.name}
                  onClick={() => handleFolderClick(folder)}
                  className={`flex items-center space-x-2 w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-200 transition-colors ${
                    currentView === folder.type ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  <span>{folder.emoji}</span>
                  <span>{folder.name}</span>
                </button>
              ))}
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
      
      {/* Video Player Modal */}
      <VideoPlayerModalComponent
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videos={videoList}
        initialVideoIndex={selectedVideoIndex}
      />
    </>
  );
}