type Section = 'face' | 'explorer' | 'about' | 'projects' | 'skills' | 'contact';

interface ContentSectionProps {
  section: Section;
  onShowFileExplorer: () => void;
}

export default function ContentSection({ section, onShowFileExplorer }: ContentSectionProps) {
  const getSectionTitle = () => {
    switch(section) {
      case 'about': return 'about.txt';
      case 'projects': return 'projects/';
      case 'skills': return 'skills.exe';
      case 'contact': return 'contact.msg';
      default: return '';
    }
  };

  const renderContent = () => {
    switch(section) {
      case 'about':
        return (
          <div className="space-y-4 text-xs leading-relaxed">
            <p className="text-foreground">Hello! I'm a creative developer who loves building interactive experiences.</p>
            <p className="text-muted-foreground">Just like BMO, I'm passionate about games, music, and bringing joy through technology.</p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">Frontend</span>
              <span className="bg-secondary/20 text-secondary px-2 py-1 rounded text-xs">Backend</span>
              <span className="bg-accent/20 text-accent px-2 py-1 rounded text-xs">UI/UX</span>
            </div>
          </div>
        );
      
      case 'projects':
        return (
          <div className="space-y-3">
            <div className="bg-muted/20 rounded-lg p-3">
              <h3 className="pixel-text text-xs text-primary mb-2">Adventure Game</h3>
              <p className="text-xs text-muted-foreground mb-2">Interactive storytelling platform</p>
              <div className="flex space-x-2">
                <span className="bg-secondary/20 text-secondary px-2 py-1 rounded text-xs">React</span>
                <span className="bg-accent/20 text-accent px-2 py-1 rounded text-xs">WebGL</span>
              </div>
            </div>
            <div className="bg-muted/20 rounded-lg p-3">
              <h3 className="pixel-text text-xs text-primary mb-2">Music Visualizer</h3>
              <p className="text-xs text-muted-foreground mb-2">Audio-reactive visual experience</p>
              <div className="flex space-x-2">
                <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">JavaScript</span>
                <span className="bg-secondary/20 text-secondary px-2 py-1 rounded text-xs">Canvas</span>
              </div>
            </div>
          </div>
        );
      
      case 'skills':
        return (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-foreground">JavaScript</span>
                <span className="text-xs text-primary">90%</span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{width: '90%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-foreground">React</span>
                <span className="text-xs text-secondary">85%</span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div className="bg-secondary h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-foreground">UI/UX Design</span>
                <span className="text-xs text-accent">80%</span>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div className="bg-accent h-2 rounded-full" style={{width: '80%'}}></div>
              </div>
            </div>
          </div>
        );
      
      case 'contact':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-xs text-foreground mb-4">Let's create something awesome together!</p>
            </div>
            <div className="space-y-3">
              <a 
                href="mailto:hello@example.com" 
                className="flex items-center space-x-3 p-2 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
                data-testid="link-email"
              >
                <i className="fas fa-envelope text-accent"></i>
                <span className="text-xs text-foreground">hello@example.com</span>
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-2 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
                data-testid="link-github"
              >
                <i className="fab fa-github text-primary"></i>
                <span className="text-xs text-foreground">github.com/username</span>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-2 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
                data-testid="link-linkedin"
              >
                <i className="fab fa-linkedin text-secondary"></i>
                <span className="text-xs text-foreground">linkedin.com/in/username</span>
              </a>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="p-4 overflow-y-auto custom-scrollbar h-full" data-testid={`section-${section}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
        <span className="pixel-text text-xs text-foreground">{getSectionTitle()}</span>
        <button 
          onClick={onShowFileExplorer}
          className="text-accent hover:text-accent/80 transition-colors"
          data-testid="button-back-to-explorer"
        >
          <i className="fas fa-arrow-left text-sm"></i>
        </button>
      </div>
      
      {/* Section Content */}
      {renderContent()}
    </div>
  );
}
