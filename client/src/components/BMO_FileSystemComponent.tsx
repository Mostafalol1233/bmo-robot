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
    <div className="h-full bg-white">
      {/* Folder Icons Grid - Windows Explorer Style */}
      <div className="p-3 grid grid-cols-2 gap-3 h-full">
        {folders.map((folder, index) => (
          <button
            key={folder.name}
            onClick={() => handleFolderClick(folder)}
            className="flex flex-col items-center justify-center p-3 hover:bg-blue-200 border border-transparent hover:border-blue-400 rounded transition-all duration-200 transform hover:scale-105 animate-slideIn group"
            style={{ animationDelay: `${index * 0.1}s` }}
            data-testid={`folder-${folder.name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {/* Windows-style folder icon background */}
            <div className="relative mb-2">
              <div className="w-12 h-10 bg-yellow-300 border-2 border-yellow-600 rounded-t-lg relative" style={{ imageRendering: 'pixelated' }}>
                <div className="absolute top-0 left-0 w-3 h-2 bg-yellow-400 border border-yellow-600 rounded-tl-lg"></div>
                <div className="absolute inset-1 bg-yellow-100 rounded flex items-center justify-center">
                  <span className="text-lg group-hover:scale-110 transition-transform" style={{ imageRendering: 'pixelated' }}>
                    {folder.emoji}
                  </span>
                </div>
              </div>
            </div>
            <span className="pixel-text text-[10px] text-center text-black leading-tight max-w-full">
              {folder.name}
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
          <div className="p-2 h-full flex flex-col bg-white">
            <h3 className="pixel-text text-[10px] mb-2 text-black border-b border-gray-300 pb-1">📹 Video Gallery</h3>
            <div className="flex-1 bg-black border-2 border-gray-400 rounded flex items-center justify-center mb-2">
              <div className="text-white text-center p-2">
                <div className="text-xl mb-1">🎬</div>
                <div className="pixel-text text-[8px]">React Player Ready</div>
                <div className="text-[7px] mt-1">Select video below</div>
              </div>
            </div>
            <div className="space-y-1 overflow-y-auto">
              <button className="w-full text-left p-1 bg-gray-100 hover:bg-blue-200 border border-gray-300 rounded text-[8px] transition-colors">
                <span className="pixel-text">🎥 Portfolio Demo.mp4</span>
              </button>
              <button className="w-full text-left p-1 bg-gray-100 hover:bg-blue-200 border border-gray-300 rounded text-[8px] transition-colors">
                <span className="pixel-text">🎥 Coding Tutorial.mp4</span>
              </button>
              <button className="w-full text-left p-1 bg-gray-100 hover:bg-blue-200 border border-gray-300 rounded text-[8px] transition-colors">
                <span className="pixel-text">🎥 Project Showcase.mp4</span>
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
        className="w-full h-full bg-gray-200 text-black animate-windowsExplorer"
        style={{ imageRendering: 'pixelated', fontSize: '10px' }}
        data-testid="bmo-filesystem"
      >
        {/* Windows Explorer Top Menu */}
        <div className="bg-gradient-to-b from-gray-200 to-gray-300 border-b-2 border-gray-400 px-2 py-1 shadow-sm">
          <div className="flex space-x-1 text-[8px] pixel-text">
            <button className="hover:bg-gray-400 px-2 py-1 rounded transition-colors border border-transparent hover:border-gray-500">File</button>
            <button className="hover:bg-gray-400 px-2 py-1 rounded transition-colors border border-transparent hover:border-gray-500">Edit</button>
            <button className="hover:bg-gray-400 px-2 py-1 rounded transition-colors border border-transparent hover:border-gray-500">View</button>
            <button className="hover:bg-gray-400 px-2 py-1 rounded transition-colors border border-transparent hover:border-gray-500">Help</button>
            {onBack && (
              <button 
                onClick={onBack}
                className="ml-auto text-red-600 hover:text-red-800 hover:bg-red-100 px-2 py-1 rounded transition-colors border border-transparent hover:border-red-400"
                data-testid="button-back-to-face"
                title="Close BMO Filesystem"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Navigation Bar - Windows Explorer Style */}
        <div className="bg-gradient-to-b from-gray-100 to-gray-200 border-b-2 border-gray-400 px-2 py-1 flex items-center space-x-2 shadow-sm">
          <button
            onClick={handleBackClick}
            disabled={currentView === 'explorer'}
            className={`text-[8px] px-2 py-1 border border-gray-400 rounded pixel-text transition-all ${
              currentView === 'explorer' 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-inner' 
                : 'bg-white hover:bg-blue-100 hover:border-blue-400 cursor-pointer shadow-sm active:shadow-inner'
            }`}
            data-testid="nav-back"
            title="Go back to main folder"
          >
            ← Back
          </button>
          <button
            disabled
            className="text-[8px] px-2 py-1 border border-gray-400 rounded bg-gray-200 text-gray-400 cursor-not-allowed shadow-inner pixel-text"
            title="Forward (not available)"
          >
            → Forward
          </button>
          <div className="flex-1 bg-white border-2 border-gray-400 px-2 py-1 text-[8px] pixel-text shadow-inner rounded" style={{ fontFamily: 'monospace' }}>
            {currentPath}
          </div>
          <div className="text-[7px] text-gray-600 pixel-text">
            {currentView === 'explorer' ? `${folders.length} items` : '1 folder'}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 h-full overflow-hidden">
          <div className="h-full animate-fadeInUp">
            {renderContentView()}
          </div>
        </div>
      </div>
  );
}