import { useState, useEffect, useRef } from 'react';
import bmoWelcomeSound from '@assets/bmo (mp3cut.net)_1757268027014.mp3';

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

  // Play welcome sound when component mounts (website opens)
  useEffect(() => {
    const playWelcomeSound = () => {
      const audio = new Audio(bmoWelcomeSound);
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Handle audio play failure silently
      });
    };

    // Play sound when component mounts
    playWelcomeSound();
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
        className="relative w-80 mx-auto transform hover:scale-105 transition-transform duration-300"
        data-testid="bmo-landing-component"
      >
        {/* BMO Body - More rectangular and authentic */}
        <div className="bg-gradient-to-br from-cyan-400 via-cyan-450 to-cyan-500 rounded-xl border-4 border-cyan-700 shadow-2xl relative p-6" style={{ aspectRatio: '0.65', width: '320px' }}>
          
          {/* BMO Screen - White screen with animated face */}
          <div className="bg-white border-4 border-gray-800 rounded-lg h-52 mb-6 relative overflow-hidden flex flex-col items-center justify-center" style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)' }}>
            {/* BMO Animated Face */}
            <div className="relative z-10 animate-bounce" style={{ imageRendering: 'pixelated', animationDuration: '3s' }}>
              {/* Eyes - Black circles that follow mouse */}
              <div className="flex space-x-12 mb-6">
                <div className="relative">
                  <div className="w-6 h-6 bg-black rounded-full transition-transform duration-100 ease-out"
                    style={{
                      transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                      imageRendering: 'pixelated'
                    }}
                    data-testid="bmo-left-eye"
                  ></div>
                </div>
                <div className="relative">
                  <div className="w-6 h-6 bg-black rounded-full transition-transform duration-100 ease-out"
                    style={{
                      transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                      imageRendering: 'pixelated'
                    }}
                    data-testid="bmo-right-eye"
                  ></div>
                </div>
              </div>
              
              {/* BMO Smile */}
              <div className="relative w-16 h-6 mx-auto">
                <div className="absolute bottom-0 left-2 w-12 h-3 border-b-4 border-l-2 border-r-2 border-black rounded-b-full" style={{ imageRendering: 'pixelated' }}></div>
              </div>
            </div>
            
            {/* Screen reflection effect */}
            <div className="absolute top-2 left-2 w-8 h-8 bg-white opacity-20 rounded blur-sm"></div>
          </div>
          
          {/* Control Buttons Layout - More authentic BMO layout */}
          <div className="space-y-3">
            {/* Top Row: D-Pad and Red Button with proper spacing */}
            <div className="flex justify-between items-start px-2">
              {/* Yellow Cross D-Pad - more authentic */}
              <div className="relative ml-2">
                <div className="relative w-14 h-14">
                  {/* Horizontal bar */}
                  <div className="absolute top-1/2 left-1 w-12 h-4 bg-gradient-to-b from-yellow-300 to-yellow-500 border-2 border-yellow-600 transform -translate-y-1/2 rounded shadow-lg" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)' }}></div>
                  {/* Vertical bar */}
                  <div className="absolute left-1/2 top-1 w-4 h-12 bg-gradient-to-r from-yellow-300 to-yellow-500 border-2 border-yellow-600 transform -translate-x-1/2 rounded shadow-lg" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)' }}></div>
                </div>
              </div>
              
              {/* Red Start Button - more authentic */}
              <button 
                onClick={handleStart}
                className="w-16 h-16 bg-gradient-to-b from-red-400 to-red-600 rounded-full border-4 border-red-700 shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 mr-2"
                style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.3)' }}
                data-testid="button-start-landing"
              >
                <span className="sr-only">Start</span>
              </button>
            </div>
            
            {/* Action Buttons Row - Below the main controls */}
            <div className="flex justify-center space-x-4 mt-3 px-4">
              {/* Blue Triangle Button */}
              <div className="w-10 h-10 bg-gradient-to-b from-blue-400 to-blue-600 border-2 border-blue-800 shadow-md flex items-center justify-center transform hover:scale-105 transition-transform"
                   style={{ clipPath: 'polygon(50% 20%, 20% 80%, 80% 80%)', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              </div>
              
              {/* Green Rectangular Button */}
              <div className="w-10 h-6 bg-gradient-to-b from-green-400 to-green-600 border-2 border-green-800 rounded shadow-md transform hover:scale-105 transition-transform mt-2"
                   style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
              </div>
            </div>
          </div>
        </div>
        
        {/* BMO Side Label - More authentic positioning */}
        <div className="absolute right-0 top-1/2 transform translate-x-3 -translate-y-1/2 -rotate-90">
          <span className="pixel-text text-xl text-black font-bold tracking-wider" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.3)' }}>BMO</span>
        </div>
        
        {/* BMO Arms - More authentic thin black sticks */}
        <div className="absolute -left-3 top-1/3 w-2 h-20 bg-black rounded-full shadow-md"></div>
        <div className="absolute -right-3 top-1/3 w-2 h-20 bg-black rounded-full shadow-md"></div>
        
        {/* BMO Legs - More authentic */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full flex space-x-16">
          <div className="w-2 h-16 bg-black rounded-full shadow-md"></div>
          <div className="w-2 h-16 bg-black rounded-full shadow-md"></div>
        </div>
        
      </div>
      
    </div>
  );
}