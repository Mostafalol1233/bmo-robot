import { useState } from 'react';
import ReactPlayer from 'react-player';
import BMOFace from './BMOFace';
import bmoWelcomeSound from '@assets/bmo (mp3cut.net)_1757268027014.mp3';

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

type ViewType = 'explorer' | 'videos' | 'chat' | 'communities' | 'contact' | 'tools' | 'images' | 'character';

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
      description: 'Project demos and tutorials'
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
          <div className="p-4 h-full flex flex-col bg-white">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b border-gray-300 pb-2">📹 Video Gallery</h3>
            
            {/* Video Player Area */}
            <div className="flex-1 bg-black rounded-lg border border-gray-300 mb-4 overflow-hidden">
              <div className="w-full h-64 flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎬</div>
                  <div className="text-lg font-medium">Video Player</div>
                  <div className="text-sm text-gray-300 mt-2">Select a video from the list below</div>
                </div>
              </div>
            </div>
            
            {/* Video List */}
            <div className="space-y-2 max-h-32 overflow-y-auto">
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-lg text-sm transition-colors flex items-center space-x-3">
                <div className="w-16 h-12 bg-gray-300 rounded flex items-center justify-center">
                  <span className="text-2xl">🎥</span>
                </div>
                <div>
                  <div className="font-medium text-gray-800">BMO Portfolio Demo</div>
                  <div className="text-xs text-gray-500">YouTube • 5:32</div>
                </div>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-lg text-sm transition-colors flex items-center space-x-3">
                <div className="w-16 h-12 bg-gray-300 rounded flex items-center justify-center">
                  <span className="text-2xl">🎥</span>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Coding Tutorial</div>
                  <div className="text-xs text-gray-500">YouTube • 10:15</div>
                </div>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-lg text-sm transition-colors flex items-center space-x-3">
                <div className="w-16 h-12 bg-gray-300 rounded flex items-center justify-center">
                  <span className="text-2xl">🎥</span>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Project Showcase</div>
                  <div className="text-xs text-gray-500">YouTube • 8:45</div>
                </div>
              </button>
            </div>
          </div>
        );

      case 'images':
        return (
          <div className="p-4 h-full bg-white">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b border-gray-300 pb-2">🖼️ Character Gallery</h3>
            
            {/* Files Grid - Adventure Time Characters using real cropped images */}
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
                href="https://discord.gg/Yn97zEd4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 hover:border-indigo-300 rounded-lg transition-colors group"
                data-testid="link-discord"
              >
                <div className="text-2xl">💬</div>
                <div>
                  <div className="font-medium text-gray-800 group-hover:text-indigo-700">Discord Community</div>
                  <div className="text-sm text-gray-600 mt-1">Join our active development community</div>
                </div>
              </a>
              
              <a 
                href="https://chat.whatsapp.com/CmQ8KDLZtmz0BmOKoHCzZh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 border border-green-200 hover:border-green-300 rounded-lg transition-colors group"
                data-testid="link-whatsapp"
              >
                <div className="text-2xl">📱</div>
                <div>
                  <div className="font-medium text-gray-800 group-hover:text-green-700">WhatsApp Group</div>
                  <div className="text-sm text-gray-600 mt-1">Chat with community members</div>
                </div>
              </a>
              
              <a 
                href="https://x.com/Bemora_BEMO" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 rounded-lg transition-colors group"
                data-testid="link-twitter"
              >
                <div className="text-2xl">🐦</div>
                <div>
                  <div className="font-medium text-gray-800 group-hover:text-blue-700">Twitter @Bemora_BEMO</div>
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
                <div className="text-2xl">📺</div>
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
                <div className="text-2xl">📘</div>
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
                href="https://linkedin.com/in/bmo-developer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 rounded-lg transition-colors group"
              >
                <div className="text-2xl">💼</div>
                <div>
                  <div className="font-medium text-gray-800 group-hover:text-blue-700">LinkedIn Profile</div>
                  <div className="text-sm text-gray-600 mt-1">Connect for professional opportunities</div>
                </div>
              </a>
              
              <a 
                href="https://github.com/bmo-portfolio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 rounded-lg transition-colors group"
              >
                <div className="text-2xl">🐙</div>
                <div>
                  <div className="font-medium text-gray-800 group-hover:text-gray-700">GitHub Repository</div>
                  <div className="text-sm text-gray-600 mt-1">View code and contribute</div>
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2">🛠 Development Toolkit</h3>
              <button 
                onClick={() => window.open('https://bmo-toold.netlify.app', '_blank')}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded transition-colors"
              >
                🔗 Visit Tools Site
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <a 
                href="https://bmo-toold.netlify.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-colors group"
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">⚛️</div>
                  <div>
                    <div className="font-medium text-gray-800 text-base group-hover:text-blue-700">React Component Library</div>
                    <div className="text-sm text-gray-600 mt-1">Reusable UI components & custom hooks for modern React applications</div>
                    <div className="text-xs text-gray-500 mt-2">Click to explore →</div>
                  </div>
                </div>
              </a>
              
              <a 
                href="https://bmo-toold.netlify.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-colors group"
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">🟦</div>
                  <div>
                    <div className="font-medium text-gray-800 text-base group-hover:text-blue-700">TypeScript Utilities</div>
                    <div className="text-sm text-gray-600 mt-1">Type definitions & helper functions for better development</div>
                    <div className="text-xs text-gray-500 mt-2">Click to explore →</div>
                  </div>
                </div>
              </a>
              
              <a 
                href="https://bmo-toold.netlify.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-colors group"
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">🎨</div>
                  <div>
                    <div className="font-medium text-gray-800 text-base group-hover:text-blue-700">Design System</div>
                    <div className="text-sm text-gray-600 mt-1">Color palettes & component styles for consistent UI</div>
                    <div className="text-xs text-gray-500 mt-2">Click to explore →</div>
                  </div>
                </div>
              </a>
              
              <a 
                href="https://bmo-toold.netlify.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block p-4 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg transition-colors group"
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">📦</div>
                  <div>
                    <div className="font-medium text-gray-800 text-base group-hover:text-blue-700">NPM Packages</div>
                    <div className="text-sm text-gray-600 mt-1">Published utilities & libraries for the JavaScript ecosystem</div>
                    <div className="text-xs text-gray-500 mt-2">Click to explore →</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        );

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
                // Play BMO sound when going back
                const audio = new Audio(bmoWelcomeSound);
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
              <div className="text-xs font-medium text-gray-600 mb-2">Quick access</div>
              <button 
                onClick={() => setCurrentView('explorer')}
                className={`flex items-center space-x-2 w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-200 transition-colors ${
                  currentView === 'explorer' ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                }`}
              >
                <span>🏠</span>
                <span>Home</span>
              </button>
              <button className="flex items-center space-x-2 w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-200 transition-colors text-gray-700">
                <span>💻</span>
                <span>This PC</span>
              </button>
              <button className="flex items-center space-x-2 w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-200 transition-colors text-gray-700">
                <span>📁</span>
                <span>Documents</span>
              </button>
              <button className="flex items-center space-x-2 w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-200 transition-colors text-gray-700">
                <span>⬇️</span>
                <span>Downloads</span>
              </button>
              <button className="flex items-center space-x-2 w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-200 transition-colors text-gray-700">
                <span>🖼️</span>
                <span>Pictures</span>
              </button>
              <div className="border-t border-gray-300 my-2"></div>
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
  );
}