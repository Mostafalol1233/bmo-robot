import FileExplorer from "./FileExplorer";
import ContentSection from "./ContentSection";

type Section = 'face' | 'explorer' | 'about' | 'projects' | 'skills' | 'contact';

interface BMOCharacterProps {
  currentSection: Section;
  onShowBMOFace: () => void;
  onStartBMO: () => void;
  onShowFileExplorer: () => void;
  onOpenSection: (section: Section) => void;
  onOpenChat: () => void;
}

export default function BMOCharacter({ 
  currentSection, 
  onShowBMOFace, 
  onStartBMO, 
  onShowFileExplorer, 
  onOpenSection, 
  onOpenChat 
}: BMOCharacterProps) {
  
  return (
    <div className="relative max-w-md w-full mx-auto" data-testid="bmo-character">
      {/* BMO Body */}
      <div className="bmo-container rounded-3xl p-8 relative">
        {/* BMO Face/Screen */}
        <div className="bmo-screen rounded-2xl h-64 mb-6 relative overflow-hidden">
          {/* BMO's Face */}
          <div 
            className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
              currentSection === 'face' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
            }`}
            data-testid="bmo-face"
          >
            {/* Eyes */}
            <div className="flex space-x-8 mb-4">
              <div className="w-4 h-4 bg-accent rounded-full animate-blink"></div>
              <div className="w-4 h-4 bg-accent rounded-full animate-blink"></div>
            </div>
            {/* Mouth */}
            <div className="w-12 h-6 border-4 border-accent rounded-full border-t-transparent transform rotate-180"></div>
          </div>
          
          {/* File Explorer Interface */}
          <div 
            className={`absolute inset-0 transition-all duration-700 ${
              currentSection === 'explorer' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
            }`}
          >
            <FileExplorer 
              onShowBMOFace={onShowBMOFace}
              onOpenSection={onOpenSection}
            />
          </div>
          
          {/* Content Sections */}
          {['about', 'projects', 'skills', 'contact'].map((section) => (
            <div 
              key={section}
              className={`absolute inset-0 transition-all duration-700 ${
                currentSection === section ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
              }`}
            >
              <ContentSection 
                section={section as Section}
                onShowFileExplorer={onShowFileExplorer}
              />
            </div>
          ))}
        </div>
        
        {/* BMO Control Buttons */}
        <div className="grid grid-cols-2 gap-4">
          {/* Start Button */}
          <button 
            onClick={onStartBMO}
            className="bmo-button rounded-lg py-3 px-6"
            data-testid="button-start"
          >
            <span className="pixel-text text-xs text-primary-foreground">START</span>
          </button>
          
          {/* Chat Button */}
          <button 
            onClick={onOpenChat}
            className="bmo-button rounded-lg py-3 px-6"
            data-testid="button-chat"
          >
            <span className="pixel-text text-xs text-primary-foreground">CHAT</span>
          </button>
        </div>
      </div>
      
      {/* BMO Speaker */}
      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
        <div className="w-8 h-16 bg-primary rounded-r-full border-4 border-primary/60 flex flex-col items-center justify-center space-y-1">
          <div className="w-1 h-1 bg-primary-foreground rounded-full"></div>
          <div className="w-1 h-1 bg-primary-foreground rounded-full"></div>
          <div className="w-1 h-1 bg-primary-foreground rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
