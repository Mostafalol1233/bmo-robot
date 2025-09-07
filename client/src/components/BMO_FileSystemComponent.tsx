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
        className="w-full h-full bg-gradient-to-br from-card via-card to-muted/40 p-4 animate-slideIn"
        data-testid="bmo-filesystem"
      >
        {/* File Explorer Header */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-primary/30">
          <div className="flex items-center space-x-2">
            <i className="fas fa-folder-open text-accent text-sm"></i>
            <span className="pixel-text text-xs text-foreground">BMO_SYSTEM</span>
          </div>
          {onBack && (
            <button 
              onClick={onBack}
              className="text-accent hover:text-accent/80 transition-colors transform hover:scale-110"
              data-testid="button-back-to-face"
            >
              <i className="fas fa-home text-sm"></i>
            </button>
          )}
        </div>

        {/* File Grid */}
        <div className="grid grid-cols-2 gap-4 h-full">
          {files.map((file, index) => (
            <button
              key={file.name}
              onClick={() => handleFileClick(file)}
              className="flex flex-col items-center justify-center space-y-2 p-3 rounded-lg hover:bg-primary/10 transition-all duration-300 transform hover:scale-105 hover:shadow-lg group animate-slideIn border border-transparent hover:border-primary/20"
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`file-${file.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {/* File Icon */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 border border-primary/20 group-hover:border-primary/40">
                  <i className={`${file.icon} text-lg text-primary group-hover:text-accent transition-colors duration-300`}></i>
                </div>
                {/* Folder corner */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-br-lg opacity-60 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* File Name */}
              <span className="pixel-text text-xs text-foreground group-hover:text-primary transition-colors text-center leading-tight">
                {file.name}
              </span>
            </button>
          ))}
        </div>

        {/* System Info */}
        <div className="absolute bottom-2 left-2 right-2">
          <div className="flex justify-between items-center text-xs pixel-text text-muted-foreground">
            <span>{files.length} items</span>
            <span>BMO v1.0</span>
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