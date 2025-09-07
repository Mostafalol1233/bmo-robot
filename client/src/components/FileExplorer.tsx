type Section = 'face' | 'explorer' | 'about' | 'projects' | 'skills' | 'contact';

interface FileExplorerProps {
  onShowBMOFace: () => void;
  onOpenSection: (section: Section) => void;
}

export default function FileExplorer({ onShowBMOFace, onOpenSection }: FileExplorerProps) {
  const files = [
    { name: 'about.txt', icon: 'fas fa-file-text', color: 'text-secondary', section: 'about' as Section },
    { name: 'projects', icon: 'fas fa-folder', color: 'text-accent', section: 'projects' as Section },
    { name: 'skills.exe', icon: 'fas fa-cog', color: 'text-primary', section: 'skills' as Section },
    { name: 'contact.msg', icon: 'fas fa-envelope', color: 'text-accent', section: 'contact' as Section },
  ];

  return (
    <div className="p-4" data-testid="file-explorer">
      {/* File Explorer Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-border">
        <div className="flex items-center space-x-2">
          <i className="fas fa-folder text-accent text-sm"></i>
          <span className="pixel-text text-xs text-foreground">BMO_PORTFOLIO</span>
        </div>
        <button 
          onClick={onShowBMOFace}
          className="text-accent hover:text-accent/80 transition-colors"
          data-testid="button-close-explorer"
        >
          <i className="fas fa-times text-sm"></i>
        </button>
      </div>
      
      {/* File Grid */}
      <div className="grid grid-cols-2 gap-3">
        {files.map((file) => (
          <button 
            key={file.name}
            onClick={() => onOpenSection(file.section)}
            className="flex flex-col items-center space-y-2 p-2 rounded-lg hover:bg-muted/20 transition-colors group"
            data-testid={`file-${file.section}`}
          >
            <i className={`${file.icon} text-2xl ${file.color} file-icon`}></i>
            <span className={`pixel-text text-xs text-foreground group-hover:${file.color} transition-colors`}>
              {file.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
