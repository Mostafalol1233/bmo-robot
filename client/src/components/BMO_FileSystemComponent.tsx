import { useState } from 'react';
import ReactPlayer from 'react-player';
import BMOFace from './BMOFace';

interface BMO_FileSystemComponentProps {
  onBack?: () => void;
}

type ViewType = 'explorer' | 'videos' | 'chat' | 'communities' | 'contact' | 'tools';

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
              <div className="w-full h-64 flex items-center justify-center">
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  width="100%"
                  height="100%"
                  controls={true}
                  playing={false}
                  light={true}
                />
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

      case 'chat':
        return (
          <div className="p-2 h-full flex flex-col bg-white">
            <h3 className="pixel-text text-[10px] mb-2 text-black border-b border-gray-300 pb-1">💬 AI Talk with BMO</h3>
            <div className="flex-1 overflow-y-auto mb-2 space-y-1 bg-gray-50 border-2 border-gray-300 p-2 rounded" style={{ minHeight: '120px' }}>
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-1 rounded text-[8px] max-w-[85%] ${
                    message.sender === 'user'
                      ? 'bg-blue-100 border border-blue-300 ml-auto text-right'
                      : 'bg-green-100 border border-green-300'
                  }`}
                >
                  <div className="pixel-text leading-tight">
                    <span className="font-bold">{message.sender === 'user' ? 'You:' : 'BMO:'}</span> {message.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-1">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask BMO anything..."
                className="flex-1 text-[8px] p-1 border-2 border-gray-300 rounded pixel-text bg-white"
                data-testid="chat-input"
              />
              <button
                onClick={handleSendMessage}
                className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white border border-blue-600 rounded text-[8px] pixel-text transition-colors"
                data-testid="chat-send"
              >
                Send
              </button>
            </div>
          </div>
        );

      case 'communities':
        return (
          <div className="p-2 bg-white h-full">
            <h3 className="pixel-text text-[10px] mb-2 text-black border-b border-gray-300 pb-1">👥 Communities & Social</h3>
            <div className="space-y-1">
              <button className="w-full text-left p-2 bg-gray-100 hover:bg-blue-200 border border-gray-300 rounded text-[8px] transition-colors group">
                <span className="pixel-text">🔗 Discord Community</span>
                <div className="text-[7px] text-gray-600 mt-1">Join our active development community</div>
              </button>
              <button className="w-full text-left p-2 bg-gray-100 hover:bg-blue-200 border border-gray-300 rounded text-[8px] transition-colors group">
                <span className="pixel-text">🔗 Reddit r/BMOPortfolio</span>
                <div className="text-[7px] text-gray-600 mt-1">Share projects and get feedback</div>
              </button>
              <button className="w-full text-left p-2 bg-gray-100 hover:bg-blue-200 border border-gray-300 rounded text-[8px] transition-colors group">
                <span className="pixel-text">🔗 Twitter @BMOCodes</span>
                <div className="text-[7px] text-gray-600 mt-1">Follow for updates and tips</div>
              </button>
              <button className="w-full text-left p-2 bg-gray-100 hover:bg-blue-200 border border-gray-300 rounded text-[8px] transition-colors group">
                <span className="pixel-text">🔗 YouTube Channel</span>
                <div className="text-[7px] text-gray-600 mt-1">Coding tutorials and demos</div>
              </button>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="p-2 bg-white h-full">
            <h3 className="pixel-text text-[10px] mb-2 text-black border-b border-gray-300 pb-1">📒 Contact Information</h3>
            <div className="space-y-1">
              <div className="p-2 bg-gray-100 border border-gray-300 rounded text-[8px]">
                <div className="pixel-text">📧 Email Address</div>
                <div className="text-[7px] text-gray-600 mt-1">developer@bmo-portfolio.com</div>
              </div>
              <div className="p-2 bg-gray-100 border border-gray-300 rounded text-[8px]">
                <div className="pixel-text">💼 LinkedIn Profile</div>
                <div className="text-[7px] text-gray-600 mt-1">Connect for professional opportunities</div>
              </div>
              <div className="p-2 bg-gray-100 border border-gray-300 rounded text-[8px]">
                <div className="pixel-text">🐙 GitHub Repository</div>
                <div className="text-[7px] text-gray-600 mt-1">View code and contribute</div>
              </div>
              <div className="p-2 bg-gray-100 border border-gray-300 rounded text-[8px]">
                <div className="pixel-text">📱 Schedule Meeting</div>
                <div className="text-[7px] text-gray-600 mt-1">Book a 30-minute consultation</div>
              </div>
            </div>
          </div>
        );

      case 'tools':
        return (
          <div className="p-2 bg-white h-full">
            <h3 className="pixel-text text-[10px] mb-2 text-black border-b border-gray-300 pb-1">🛠 Development Toolkit</h3>
            <div className="space-y-1">
              <div className="p-2 bg-gray-100 border border-gray-300 rounded text-[8px]">
                <div className="pixel-text">⚛️ React Component Library</div>
                <div className="text-[7px] text-gray-600 mt-1">Reusable UI components & hooks</div>
              </div>
              <div className="p-2 bg-gray-100 border border-gray-300 rounded text-[8px]">
                <div className="pixel-text">🟦 TypeScript Utilities</div>
                <div className="text-[7px] text-gray-600 mt-1">Type definitions & helper functions</div>
              </div>
              <div className="p-2 bg-gray-100 border border-gray-300 rounded text-[8px]">
                <div className="pixel-text">🎨 Design System</div>
                <div className="text-[7px] text-gray-600 mt-1">Color palettes & component styles</div>
              </div>
              <div className="p-2 bg-gray-100 border border-gray-300 rounded text-[8px]">
                <div className="pixel-text">🔧 VS Code Extensions</div>
                <div className="text-[7px] text-gray-600 mt-1">Productivity tools & themes</div>
              </div>
              <div className="p-2 bg-gray-100 border border-gray-300 rounded text-[8px]">
                <div className="pixel-text">📦 NPM Packages</div>
                <div className="text-[7px] text-gray-600 mt-1">Published utilities & libraries</div>
              </div>
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
              onClick={onBack}
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