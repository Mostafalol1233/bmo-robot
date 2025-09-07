import { useState } from 'react';
import ReactPlayer from 'react-player';

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

  const renderExplorerView = () => (
    <div className="h-full">
      {/* Folder Icons Grid */}
      <div className="p-4 grid grid-cols-2 gap-4 h-full">
        {folders.map((folder, index) => (
          <button
            key={folder.name}
            onClick={() => handleFolderClick(folder)}
            className="flex flex-col items-center justify-center p-2 hover:bg-blue-100 rounded transition-colors animate-slideIn"
            style={{ animationDelay: `${index * 0.1}s` }}
            data-testid={`folder-${folder.name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className="text-2xl mb-1" style={{ imageRendering: 'pixelated' }}>
              {folder.emoji}
            </div>
            <span className="pixel-text text-xs text-center text-black leading-tight">
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
          <div className="p-3 h-full flex flex-col">
            <h3 className="pixel-text text-sm mb-3 text-black">Video Gallery</h3>
            <div className="flex-1 bg-black rounded flex items-center justify-center">
              <div className="text-white text-center p-4">
                <div className="text-2xl mb-2">🎬</div>
                <div className="pixel-text text-xs">Video Player</div>
                <div className="text-xs mt-1">Click to play demo</div>
              </div>
            </div>
            <div className="mt-2 space-y-1">
              <div className="bg-gray-200 p-2 rounded text-xs">
                <span className="pixel-text">Demo Reel.mp4</span>
              </div>
              <div className="bg-gray-200 p-2 rounded text-xs">
                <span className="pixel-text">Tutorial_01.mp4</span>
              </div>
            </div>
          </div>
        );

      case 'chat':
        return (
          <div className="p-2 h-full flex flex-col">
            <div className="flex-1 overflow-y-auto mb-2 space-y-2 bg-gray-100 p-2 rounded">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-2 rounded text-xs max-w-[80%] ${
                    message.sender === 'user'
                      ? 'bg-blue-200 ml-auto text-right'
                      : 'bg-green-200'
                  }`}
                >
                  <div className="pixel-text">{message.text}</div>
                </div>
              ))}
            </div>
            <div className="flex space-x-1">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type message..."
                className="flex-1 text-xs p-1 border rounded pixel-text"
                data-testid="chat-input"
              />
              <button
                onClick={handleSendMessage}
                className="px-2 py-1 bg-blue-500 text-white rounded text-xs pixel-text"
                data-testid="chat-send"
              >
                Send
              </button>
            </div>
          </div>
        );

      case 'communities':
        return (
          <div className="p-3 space-y-2">
            <h3 className="pixel-text text-sm mb-2 text-black">Communities</h3>
            <div className="space-y-1">
              <button className="w-full text-left p-2 bg-gray-200 rounded text-xs hover:bg-gray-300 transition-colors">
                <span className="pixel-text">🔗 Discord Server</span>
              </button>
              <button className="w-full text-left p-2 bg-gray-200 rounded text-xs hover:bg-gray-300 transition-colors">
                <span className="pixel-text">🔗 Reddit Community</span>
              </button>
              <button className="w-full text-left p-2 bg-gray-200 rounded text-xs hover:bg-gray-300 transition-colors">
                <span className="pixel-text">🔗 Twitter Updates</span>
              </button>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="p-3 space-y-2">
            <h3 className="pixel-text text-sm mb-2 text-black">Contact Info</h3>
            <div className="space-y-1">
              <div className="p-2 bg-gray-200 rounded text-xs">
                <span className="pixel-text">📧 hello@example.com</span>
              </div>
              <div className="p-2 bg-gray-200 rounded text-xs">
                <span className="pixel-text">💼 LinkedIn Profile</span>
              </div>
              <div className="p-2 bg-gray-200 rounded text-xs">
                <span className="pixel-text">🐙 GitHub Profile</span>
              </div>
            </div>
          </div>
        );

      case 'tools':
        return (
          <div className="p-3 space-y-2">
            <h3 className="pixel-text text-sm mb-2 text-black">Development Tools</h3>
            <div className="space-y-1">
              <div className="p-2 bg-gray-200 rounded text-xs">
                <span className="pixel-text">⚛️ React Projects</span>
              </div>
              <div className="p-2 bg-gray-200 rounded text-xs">
                <span className="pixel-text">🟦 TypeScript Utils</span>
              </div>
              <div className="p-2 bg-gray-200 rounded text-xs">
                <span className="pixel-text">🎨 Design Systems</span>
              </div>
            </div>
          </div>
        );

      default:
        return renderExplorerView();
    }
  };

  return (
      <div 
        className="w-full h-full bg-gray-200 text-black animate-slideIn"
        style={{ imageRendering: 'pixelated', fontSize: '10px' }}
        data-testid="bmo-filesystem"
      >
        {/* Windows Explorer Top Menu */}
        <div className="bg-gray-300 border-b border-gray-400 px-2 py-1">
          <div className="flex space-x-4 text-xs pixel-text">
            <span className="hover:bg-gray-400 px-1 cursor-pointer">File</span>
            <span className="hover:bg-gray-400 px-1 cursor-pointer">Edit</span>
            <span className="hover:bg-gray-400 px-1 cursor-pointer">View</span>
            <span className="hover:bg-gray-400 px-1 cursor-pointer">Help</span>
            {onBack && (
              <button 
                onClick={onBack}
                className="ml-auto text-red-600 hover:text-red-800 transition-colors"
                data-testid="button-back-to-face"
              >
                [X]
              </button>
            )}
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="bg-gray-100 border-b border-gray-400 px-2 py-1 flex items-center space-x-2">
          <button
            onClick={handleBackClick}
            disabled={currentView === 'explorer'}
            className={`text-xs px-2 py-1 border rounded ${
              currentView === 'explorer' 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-white hover:bg-gray-50 cursor-pointer'
            }`}
            data-testid="nav-back"
          >
            ← Back
          </button>
          <button
            disabled
            className="text-xs px-2 py-1 border rounded bg-gray-200 text-gray-400 cursor-not-allowed"
          >
            → Forward
          </button>
          <div className="flex-1 bg-white border border-gray-400 px-2 py-1 text-xs pixel-text">
            {currentPath}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 h-full overflow-hidden">
          {renderContentView()}
        </div>
      </div>
  );
}