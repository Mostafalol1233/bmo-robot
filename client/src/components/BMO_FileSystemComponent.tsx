import { useState } from 'react';

interface BMO_FileSystemComponentProps {
  onBack?: () => void;
}

interface FileItem {
  name: string;
  icon: string;
  type: 'folder';
  action: 'external' | 'modal' | 'chat';
  url?: string;
}

interface ModalState {
  communities: boolean;
  videos: boolean;
  contact: boolean;
  chat: boolean;
}

export default function BMO_FileSystemComponent({ onBack }: BMO_FileSystemComponentProps) {
  const [modals, setModals] = useState<ModalState>({
    communities: false,
    videos: false,
    contact: false,
    chat: false,
  });

  const files: FileItem[] = [
    {
      name: 'Communities',
      icon: 'fas fa-users',
      type: 'folder',
      action: 'modal'
    },
    {
      name: 'Videos',
      icon: 'fas fa-play',
      type: 'folder', 
      action: 'modal'
    },
    {
      name: 'Contact Me',
      icon: 'fas fa-address-book',
      type: 'folder',
      action: 'modal'
    },
    {
      name: 'My Tools',
      icon: 'fas fa-wrench',
      type: 'folder',
      action: 'external',
      url: 'https://github.com'
    },
    {
      name: 'AI Talk',
      icon: 'fas fa-comment-dots',
      type: 'folder',
      action: 'chat'
    }
  ];

  const openModal = (modalName: keyof ModalState) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof ModalState) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
  };

  const handleFileClick = (file: FileItem) => {
    switch (file.action) {
      case 'external':
        if (file.url) {
          window.open(file.url, '_blank');
        }
        break;
      case 'modal':
        if (file.name === 'Communities') openModal('communities');
        else if (file.name === 'Videos') openModal('videos');
        else if (file.name === 'Contact Me') openModal('contact');
        break;
      case 'chat':
        openModal('chat');
        break;
    }
  };

  return (
    <>
      <div 
        className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-50 to-white p-2 animate-slideIn font-mono text-black"
        style={{ imageRendering: 'pixelated', fontSize: '10px' }}
        data-testid="bmo-filesystem"
      >
        {/* Terminal-style File System Header */}
        <div className="bg-gray-800 text-green-400 p-1 mb-2 rounded-sm" style={{ fontFamily: 'monospace' }}>
          <div className="flex items-center justify-between">
            <span className="text-xs">BMO:/home/user$</span>
            {onBack && (
              <button 
                onClick={onBack}
                className="text-red-400 hover:text-red-300 transition-colors text-xs"
                data-testid="button-back-to-face"
              >
                [X]
              </button>
            )}
          </div>
        </div>

        {/* Directory Listing - Computer-like */}
        <div className="bg-white border border-gray-300 p-2 h-full overflow-auto" style={{ fontFamily: 'monospace', fontSize: '9px' }}>
          {/* Header */}
          <div className="bg-gray-100 border-b border-gray-300 p-1 mb-1 text-xs grid grid-cols-3 gap-2 font-bold">
            <span>Name</span>
            <span>Type</span>
            <span>Size</span>
          </div>
          
          {/* File Listings */}
          <div className="space-y-1">
            {files.map((file, index) => (
              <button
                key={file.name}
                onClick={() => handleFileClick(file)}
                className="w-full text-left hover:bg-blue-100 p-1 rounded transition-colors grid grid-cols-3 gap-2 text-xs border border-transparent hover:border-blue-300 animate-slideIn"
                style={{ animationDelay: `${index * 0.05}s`, fontFamily: 'monospace' }}
                data-testid={`file-${file.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {/* File Name with Icon */}
                <div className="flex items-center space-x-1 truncate">
                  <span className="text-blue-600">
                    {file.name === 'Communities' && '📁'}
                    {file.name === 'Videos' && '🎥'}
                    {file.name === 'Contact Me' && '📞'}
                    {file.name === 'My Tools' && '🔧'}
                    {file.name === 'AI Talk' && '🤖'}
                  </span>
                  <span className="truncate text-black">{file.name}</span>
                </div>
                
                {/* File Type */}
                <span className="text-gray-600 text-xs">
                  {file.name === 'My Tools' ? 'Link' : 'Folder'}
                </span>
                
                {/* File Size */}
                <span className="text-gray-500 text-xs">
                  {file.name === 'Videos' ? '2.1 GB' : 
                   file.name === 'Communities' ? '4.2 KB' :
                   file.name === 'Contact Me' ? '1.8 KB' :
                   file.name === 'My Tools' ? '512 B' :
                   file.name === 'AI Talk' ? '16.5 MB' : '--'}
                </span>
              </button>
            ))}
          </div>
          
          {/* Directory Info */}
          <div className="mt-4 pt-2 border-t border-gray-200 text-xs text-gray-500">
            <div className="grid grid-cols-2">
              <span>{files.length} items</span>
              <span className="text-right">Free: 8.7 GB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Communities Modal */}
      {modals.communities && (
        <div 
          className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-slideIn"
          onClick={(e) => e.target === e.currentTarget && closeModal('communities')}
          data-testid="modal-communities"
        >
          <div className="bg-card border border-primary/30 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-primary/20">
              <h2 className="pixel-text text-sm text-foreground">Communities</h2>
              <button 
                onClick={() => closeModal('communities')}
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-close-communities"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-3">
              <a 
                href="https://discord.gg/community" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg hover:bg-primary/10 transition-colors group"
                data-testid="link-discord"
              >
                <i className="fab fa-discord text-primary text-xl group-hover:text-accent transition-colors"></i>
                <div>
                  <p className="pixel-text text-xs text-foreground">Discord Server</p>
                  <p className="text-xs text-muted-foreground">Join our community chat</p>
                </div>
              </a>
              <a 
                href="https://reddit.com/r/programming" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg hover:bg-primary/10 transition-colors group"
                data-testid="link-reddit"
              >
                <i className="fab fa-reddit text-primary text-xl group-hover:text-accent transition-colors"></i>
                <div>
                  <p className="pixel-text text-xs text-foreground">Reddit Community</p>
                  <p className="text-xs text-muted-foreground">Development discussions</p>
                </div>
              </a>
              <a 
                href="https://twitter.com/developer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg hover:bg-primary/10 transition-colors group"
                data-testid="link-twitter"
              >
                <i className="fab fa-twitter text-primary text-xl group-hover:text-accent transition-colors"></i>
                <div>
                  <p className="pixel-text text-xs text-foreground">Twitter Updates</p>
                  <p className="text-xs text-muted-foreground">Follow for latest news</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Videos Modal */}
      {modals.videos && (
        <div 
          className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-slideIn"
          onClick={(e) => e.target === e.currentTarget && closeModal('videos')}
          data-testid="modal-videos"
        >
          <div className="bg-card border border-primary/30 rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-primary/20">
              <h2 className="pixel-text text-sm text-foreground">Videos</h2>
              <button 
                onClick={() => closeModal('videos')}
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-close-videos"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-4">
              {/* Video Player Placeholder */}
              <div className="bg-muted/20 rounded-lg p-8 text-center border border-primary/20">
                <i className="fas fa-play-circle text-4xl text-primary mb-4"></i>
                <p className="pixel-text text-xs text-foreground mb-2">Demo Reel</p>
                <p className="text-xs text-muted-foreground mb-4">Showcase of recent projects</p>
                <button 
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors pixel-text text-xs"
                  data-testid="button-play-demo"
                >
                  PLAY
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/10 rounded-lg p-3 text-center hover:bg-primary/10 transition-colors cursor-pointer" data-testid="video-tutorial-1">
                  <i className="fas fa-video text-accent text-lg mb-2"></i>
                  <p className="pixel-text text-xs text-foreground">Tutorial #1</p>
                </div>
                <div className="bg-muted/10 rounded-lg p-3 text-center hover:bg-primary/10 transition-colors cursor-pointer" data-testid="video-tutorial-2">
                  <i className="fas fa-video text-accent text-lg mb-2"></i>
                  <p className="pixel-text text-xs text-foreground">Tutorial #2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {modals.contact && (
        <div 
          className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-slideIn"
          onClick={(e) => e.target === e.currentTarget && closeModal('contact')}
          data-testid="modal-contact"
        >
          <div className="bg-card border border-primary/30 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-primary/20">
              <h2 className="pixel-text text-sm text-foreground">Contact Me</h2>
              <button 
                onClick={() => closeModal('contact')}
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-close-contact"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-3">
              <a 
                href="mailto:hello@example.com" 
                className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg hover:bg-primary/10 transition-colors group"
                data-testid="link-email-contact"
              >
                <i className="fas fa-envelope text-accent text-xl group-hover:text-primary transition-colors"></i>
                <div>
                  <p className="pixel-text text-xs text-foreground">Email</p>
                  <p className="text-xs text-muted-foreground">hello@example.com</p>
                </div>
              </a>
              <a 
                href="https://linkedin.com/in/profile" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg hover:bg-primary/10 transition-colors group"
                data-testid="link-linkedin-contact"
              >
                <i className="fab fa-linkedin text-accent text-xl group-hover:text-primary transition-colors"></i>
                <div>
                  <p className="pixel-text text-xs text-foreground">LinkedIn</p>
                  <p className="text-xs text-muted-foreground">Professional profile</p>
                </div>
              </a>
              <a 
                href="https://github.com/username" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg hover:bg-primary/10 transition-colors group"
                data-testid="link-github-contact"
              >
                <i className="fab fa-github text-accent text-xl group-hover:text-primary transition-colors"></i>
                <div>
                  <p className="pixel-text text-xs text-foreground">GitHub</p>
                  <p className="text-xs text-muted-foreground">Code repositories</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* AI Chat Modal */}
      {modals.chat && (
        <div 
          className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-slideIn"
          onClick={(e) => e.target === e.currentTarget && closeModal('chat')}
          data-testid="modal-ai-chat"
        >
          <div className="bg-card border border-primary/30 rounded-2xl p-6 max-w-md w-full max-h-96 flex flex-col shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-primary/20">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <span className="pixel-text text-xs text-primary-foreground">AI</span>
                </div>
                <h2 className="pixel-text text-sm text-foreground">AI Talk</h2>
              </div>
              <button 
                onClick={() => closeModal('chat')}
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-close-ai-chat"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto mb-4 space-y-3 custom-scrollbar" data-testid="ai-chat-messages">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center flex-shrink-0">
                  <span className="pixel-text text-xs text-primary-foreground">AI</span>
                </div>
                <div className="bg-muted/20 rounded-lg p-3 flex-1">
                  <p className="text-sm text-foreground">Hi! I'm BMO's AI assistant. How can I help you today?</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 bg-muted/20 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                data-testid="input-ai-message"
              />
              <button 
                className="bg-primary text-primary-foreground rounded-lg px-4 py-2 hover:bg-primary/90 transition-colors"
                data-testid="button-send-ai-message"
              >
                <i className="fas fa-paper-plane text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}