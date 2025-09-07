import { useState, useEffect, useRef } from 'react';

interface BMO_LandingPageComponentProps {
  onStart: () => void;
}

export default function BMO_LandingPageComponent({ onStart }: BMO_LandingPageComponentProps) {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bmoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (bmoRef.current) {
        const rect = bmoRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Limit eye movement range
        const maxMovement = 8;
        const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
        const limitedDistance = Math.min(distance, maxMovement);
        
        const angle = Math.atan2(mouseY, mouseX);
        const limitedX = Math.cos(angle) * limitedDistance;
        const limitedY = Math.sin(angle) * limitedDistance;
        
        setEyePosition({ x: limitedX, y: limitedY });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleStart = () => {
    // Play welcome audio on first interaction
    if (!hasInteracted) {
      setHasInteracted(true);
      // Create audio element dynamically for welcome sound
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmkUDFOq5+61diMGJHfH8N2QQAoUXrTp66hVFApGn+DyvmkUDFOq5+61diMGJHfH8N2QQAoUXrTp66hVFApGn+DyvmkUDFOq5+61diMG');
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Handle audio play failure silently
      });
    }
    onStart();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background via-background to-muted/20">
      <div 
        ref={bmoRef}
        className="relative max-w-sm w-full mx-auto transform hover:scale-105 transition-transform duration-300"
        data-testid="bmo-landing-component"
      >
        {/* BMO Body */}
        <div className="bmo-container rounded-3xl p-8 relative shadow-2xl">
          {/* BMO Screen */}
          <div className="bmo-screen rounded-2xl h-64 mb-8 relative overflow-hidden flex items-center justify-center">
            {/* Screen Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-card via-card to-muted/40"></div>
            
            {/* BMO Eyes Container */}
            <div className="relative flex space-x-12 z-10">
              {/* Left Eye */}
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-accent rounded-full border-2 border-accent/60 shadow-lg"></div>
                <div 
                  className="absolute w-3 h-3 bg-accent-foreground rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
                  style={{
                    transform: `translate(-50%, -50%) translate(${eyePosition.x}px, ${eyePosition.y}px)`
                  }}
                  data-testid="bmo-left-eye"
                ></div>
              </div>
              
              {/* Right Eye */}
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-accent rounded-full border-2 border-accent/60 shadow-lg"></div>
                <div 
                  className="absolute w-3 h-3 bg-accent-foreground rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
                  style={{
                    transform: `translate(-50%, -50%) translate(${eyePosition.x}px, ${eyePosition.y}px)`
                  }}
                  data-testid="bmo-right-eye"
                ></div>
              </div>
            </div>
            
            {/* Screen Shine Effect */}
            <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-sm"></div>
          </div>
          
          {/* BMO Control Buttons Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Red Circle Button */}
            <div className="w-12 h-12 bg-red-500 rounded-full border-4 border-red-600 shadow-lg mx-auto transform hover:scale-105 transition-transform"></div>
            
            {/* Blue Triangle Button */}
            <div className="w-12 h-12 bg-blue-500 border-4 border-blue-600 shadow-lg mx-auto flex items-center justify-center transform hover:scale-105 transition-transform" style={{clipPath: 'polygon(50% 15%, 15% 85%, 85% 85%)'}}>
            </div>
          </div>
          
          {/* D-Pad and Green Button */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Yellow Cross D-Pad */}
            <div className="relative w-16 h-16 mx-auto">
              {/* Horizontal bar */}
              <div className="absolute top-1/2 left-0 w-full h-4 bg-yellow-400 border-2 border-yellow-500 transform -translate-y-1/2 shadow-md"></div>
              {/* Vertical bar */}
              <div className="absolute left-1/2 top-0 w-4 h-full bg-yellow-400 border-2 border-yellow-500 transform -translate-x-1/2 shadow-md"></div>
            </div>
            
            {/* Green Rectangular Button */}
            <div className="w-16 h-8 bg-green-500 border-4 border-green-600 rounded-lg mx-auto shadow-lg transform hover:scale-105 transition-transform"></div>
          </div>
          
          {/* Start Button */}
          <button 
            onClick={handleStart}
            className="w-full bmo-button rounded-lg py-4 px-8 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
            data-testid="button-start-landing"
          >
            <span className="pixel-text text-base text-primary-foreground tracking-wider">START</span>
          </button>
        </div>
        
        {/* BMO Arms */}
        <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
          <div className="w-2 h-16 bg-gray-800 rounded-full"></div>
        </div>
        <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
          <div className="w-2 h-16 bg-gray-800 rounded-full"></div>
        </div>
        
        {/* BMO Legs */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-8">
          <div className="w-2 h-12 bg-gray-800 rounded-full"></div>
          <div className="w-2 h-12 bg-gray-800 rounded-full"></div>
        </div>
        
        {/* BMO Speaker Grille */}
        <div className="absolute right-2 top-1/4 transform -translate-y-1/2">
          <div className="w-6 h-16 bg-primary/80 rounded-r-full border-2 border-primary flex flex-col items-center justify-center space-y-1 shadow-md">
            <div className="w-1 h-1 bg-primary-foreground rounded-full"></div>
            <div className="w-1 h-1 bg-primary-foreground rounded-full"></div>
            <div className="w-1 h-1 bg-primary-foreground rounded-full"></div>
            <div className="w-1 h-1 bg-primary-foreground rounded-full"></div>
            <div className="w-1 h-1 bg-primary-foreground rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Welcome Text */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p className="pixel-text text-sm text-primary animate-pulse">
          Move your mouse to see BMO's eyes follow!
        </p>
      </div>
    </div>
  );
}