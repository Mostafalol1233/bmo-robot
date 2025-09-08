import { useState } from 'react';
import BMOFace from './BMOFace';
import VideoPlayerModalComponent from './VideoPlayerModalComponent';
import bmoWelcomeSound from '@assets/bmo (mp3cut.net)_1757268027014.mp3';
import bmoCloseSound from '@assets/bmo (mp3cut.net)(1)_1757268053074.mp3';
import { SiDiscord, SiWhatsapp, SiFacebook, SiYoutube, SiX, SiLinkedin } from 'react-icons/si';
import TicTacToeGame from './TicTacToeGame';
import MazeGame from './MazeGame';

// Import BMO interface background
import bmoInterfaceBg from '@assets/S5e28_BMO\'s_interface_1757341096013.webp';

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

type ViewType = 'explorer' | 'videos' | 'chat' | 'communities' | 'contact' | 'tools' | 'images' | 'character' | 'games' | 'tictactoe' | 'maze';

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
  
  // Video list with real YouTube URLs and thumbnails
  const videoList = [
    {
      id: '1',
      title: 'BMO Adventure Short #1',
      url: '/videos/bmo_adventure_1.mp4', // Local video file
      youtubeUrl: 'https://youtube.com/shorts/A1eUITFLvrA',
      thumbnail: 'https://img.youtube.com/vi/A1eUITFLvrA/mqdefault.jpg'
    },
    {
      id: '2', 
      title: 'BMO Adventure Short #2',
      url: '/videos/bmo_adventure_2.mp4', // Local video file
      youtubeUrl: 'https://youtube.com/shorts/920D9DjKgCo',
      thumbnail: 'https://img.youtube.com/vi/920D9DjKgCo/mqdefault.jpg'
    },
    {
      id: '3',
      title: 'BMO Adventure Short #3', 
      url: '/videos/bmo_adventure_3.mp4', // Local video file
      youtubeUrl: 'https://youtube.com/shorts/Ql7tURnDdzk',
      thumbnail: 'https://img.youtube.com/vi/Ql7tURnDdzk/mqdefault.jpg'
    },
    {
      id: '4',
      title: 'Adventure Time Tutorial',
      url: '/videos/adventure_tutorial.mp4', // Local video file
      youtubeUrl: 'https://www.youtube.com/watch?v=puFy652XCl8',
      thumbnail: 'https://img.youtube.com/vi/puFy652XCl8/mqdefault.jpg'
    },
    {
      id: '5',
      title: 'BMO Coding Session',
      url: '/videos/bmo_coding.mp4', // Local video file
      youtubeUrl: 'https://www.youtube.com/watch?v=wjwNBUB_iXk', 
      thumbnail: 'https://img.youtube.com/vi/wjwNBUB_iXk/mqdefault.jpg'
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

  const handleGameClick = (gameType: 'tictactoe' | 'maze') => {
    setCurrentView(gameType);
    setCurrentPath(`C:\\Portfolio\\Games\\${gameType === 'tictactoe' ? 'TicTacToe' : 'Maze'}\\`);
  };

  const handleBackClick = () => {
    setCurrentView('explorer');
    setCurrentPath('C:\\Portfolio\\');
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const userMessage = { id: Date.now(), sender: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    
    // Simple AI response simulation
    setTimeout(() => {
      const responses = [
        "That's interesting! Tell me more about what you'd like to know!",
        "I'm here to help! BMO knows lots about coding and creativity!",
        "Mathematical! I love helping with questions about development!",
        "Beep boop! Processing your request... just kidding, I'm ready to help!"
      ];
      const aiResponse = { 
        id: Date.now() + 1, 
        sender: 'bmo', 
        text: responses[Math.floor(Math.random() * responses.length)]
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
    
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
          <div className="p-4 h-full" style={{ background: 'linear-gradient(135deg, #90EE90, #98FB98)' }}>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b-2 border-gray-800 pb-2 font-mono">📹 Video Gallery</h3>
            
            {/* Simple Video Grid */}
            <div className="max-h-96 overflow-y-auto custom-scrollbar pr-2">
              <div className="grid grid-cols-3 gap-4">
              {videoList.map((video) => (
                <div
                  key={video.id}
                  className="bg-white border-2 border-gray-800 rounded cursor-pointer hover:bg-gray-100 transition-colors p-2"
                  onClick={() => handleVideoClick(video)}
                  data-testid={`video-item-${video.id}`}
                >
                  {/* Video Thumbnail */}
                  <div className="aspect-video bg-black rounded mb-2 overflow-hidden relative group">
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
                    <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 hidden items-center justify-center">
                      <span className="text-white text-2xl">🎬</span>
                    </div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm ml-0.5">▶</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Video Title */}
                  <div className="text-xs font-mono text-center text-gray-800 leading-tight">
                    {video.title}
                  </div>
                </div>
              ))}
              </div>
            </div>
            
            {/* Channel Link */}
            <div className="mt-4 text-center">
              <a 
                href="https://www.youtube.com/@Bemora-site"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 border-2 border-gray-800 font-mono text-sm transition-colors"
                data-testid="youtube-channel-link"
              >
                🔴 Visit Bemora Channel
              </a>
            </div>
          </div>
        );

      case 'images':
        return (
          <div className="p-4 h-full bg-white">
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
          <div className="p-4 h-full" style={{ background: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)' }}>
            <h3 className="text-lg font-semibold mb-4 text-white border-b-2 border-white pb-2 font-mono">🎮 Adventure Time Games</h3>
            
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <button
                onClick={() => handleGameClick('tictactoe')}
                className="bg-white border-4 border-cyan-600 rounded-lg p-6 hover:bg-cyan-50 transition-colors group shadow-lg"
                data-testid="game-tictactoe"
              >
                <div className="text-center">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">⭕</div>
                  <h4 className="text-lg font-bold text-cyan-800 mb-2">Tic Tac Toe</h4>
                  <p className="text-sm text-cyan-600">Finn vs Jake</p>
                  <div className="mt-3 flex justify-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  </div>
                  <div className="text-xs text-cyan-500 mt-1">Easy • Medium • Hard</div>
                </div>
              </button>

              <button
                onClick={() => handleGameClick('maze')}
                className="bg-white border-4 border-purple-600 rounded-lg p-6 hover:bg-purple-50 transition-colors group shadow-lg"
                data-testid="game-maze"
              >
                <div className="text-center">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🌟</div>
                  <h4 className="text-lg font-bold text-purple-800 mb-2">Maze Adventure</h4>
                  <p className="text-sm text-purple-600">10 Levels</p>
                  <div className="mt-3 flex justify-center">
                    <div className="grid grid-cols-3 gap-1">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-1 h-1 bg-purple-400 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-purple-500 mt-1">Mobile Joystick</div>
                </div>
              </button>
            </div>

            <div className="mt-6 text-center">
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-white text-sm font-medium">🎯 Challenge yourself with Adventure Time games!</p>
              </div>
            </div>
          </div>
        );

      case 'tictactoe':
        return <TicTacToeGame onBack={() => setCurrentView('games')} />;

      case 'maze':
        return <MazeGame onBack={() => setCurrentView('games')} />;

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