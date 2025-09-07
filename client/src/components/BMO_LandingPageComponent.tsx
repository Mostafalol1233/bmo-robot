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
        className="relative w-80 mx-auto transform hover:scale-105 transition-transform duration-300"
        data-testid="bmo-landing-component"
      >
        {/* BMO Body - More rectangular and authentic */}
        <div className="bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-lg border-4 border-cyan-600 shadow-2xl relative p-6" style={{ aspectRatio: '0.7' }}>
          
          {/* BMO Screen - Square and more authentic */}
          <div className="bg-gradient-to-br from-cyan-200 to-cyan-300 border-4 border-cyan-700 rounded-lg h-48 mb-6 relative overflow-hidden flex flex-col items-center justify-center">
            {/* Simple BMO Face */}
            <div className="relative z-10">
              {/* Eyes - Simple black dots that follow mouse */}
              <div className="flex space-x-8 mb-3">
                <div 
                  className="w-3 h-3 bg-black rounded-full transition-transform duration-100 ease-out"
                  style={{
                    transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`
                  }}
                  data-testid="bmo-left-eye"
                ></div>
                <div 
                  className="w-3 h-3 bg-black rounded-full transition-transform duration-100 ease-out"
                  style={{
                    transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`
                  }}
                  data-testid="bmo-right-eye"
                ></div>
              </div>
              
              {/* Simple Smile - Small curved line */}
              <div className="w-8 h-3 border-b-2 border-black rounded-full mx-auto"></div>
            </div>
          </div>
          
          {/* Control Buttons Layout - Like authentic BMO */}
          <div className="space-y-4">
            {/* Top Row: D-Pad and Red Button */}
            <div className="flex justify-between items-center px-4">
              {/* Yellow D-Pad */}
              <div className="relative">
                <div className="relative w-12 h-12">
                  {/* Horizontal bar */}
                  <div className="absolute top-1/2 left-0 w-full h-3 bg-yellow-400 border-2 border-yellow-600 transform -translate-y-1/2 rounded-sm shadow-md"></div>
                  {/* Vertical bar */}
                  <div className="absolute left-1/2 top-0 w-3 h-full bg-yellow-400 border-2 border-yellow-600 transform -translate-x-1/2 rounded-sm shadow-md"></div>
                </div>
                <span className="block text-center mt-1 pixel-text text-xs text-black">D-PAD</span>
              </div>
              
              {/* Red Start Button */}
              <button 
                onClick={handleStart}
                className="w-12 h-12 bg-red-500 rounded-full border-4 border-red-700 shadow-lg transform hover:scale-110 active:scale-95 transition-all duration-200"
                data-testid="button-start-landing"
              >
                <span className="sr-only">Start</span>
              </button>
            </div>
            
            {/* Button Labels */}
            <div className="flex justify-between px-4">
              <span className="pixel-text text-xs text-black opacity-0">D-PAD</span>
              <span className="pixel-text text-xs text-black">START</span>
            </div>
            
            {/* Bottom Row: Action Buttons */}
            <div className="flex justify-center space-x-6 mt-4">
              {/* Blue Triangle Button */}
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-500 border-3 border-blue-700 shadow-md mx-auto flex items-center justify-center" style={{clipPath: 'polygon(50% 15%, 15% 85%, 85% 85%)'}}>
                </div>
                <span className="block mt-1 pixel-text text-xs text-black">SELECT</span>
              </div>
              
              {/* Green Button */}
              <div className="text-center">
                <div className="w-8 h-6 bg-green-500 border-3 border-green-700 rounded-sm shadow-md"></div>
                <span className="block mt-1 pixel-text text-xs text-black">B</span>
              </div>
              
              {/* Small Action Button */}
              <div className="text-center">
                <div className="w-6 h-6 bg-gray-600 border-2 border-gray-800 rounded-sm shadow-md"></div>
                <span className="block mt-1 pixel-text text-xs text-black">A</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* BMO Side Label */}
        <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2 -rotate-90">
          <span className="pixel-text text-lg text-black font-bold tracking-wider">BMO</span>
        </div>
        
        {/* BMO Arms - Thin black sticks */}
        <div className="absolute -left-2 top-1/3 w-1 h-16 bg-black rounded-full"></div>
        <div className="absolute -right-2 top-1/3 w-1 h-16 bg-black rounded-full"></div>
        
        {/* BMO Legs - Thin black sticks */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full flex space-x-12">
          <div className="w-1 h-12 bg-black rounded-full"></div>
          <div className="w-1 h-12 bg-black rounded-full"></div>
        </div>
        
        {/* Speaker Holes on the side */}
        <div className="absolute right-4 top-1/4 grid grid-cols-2 gap-1">
          <div className="w-1 h-1 bg-cyan-700 rounded-full"></div>
          <div className="w-1 h-1 bg-cyan-700 rounded-full"></div>
          <div className="w-1 h-1 bg-cyan-700 rounded-full"></div>
          <div className="w-1 h-1 bg-cyan-700 rounded-full"></div>
          <div className="w-1 h-1 bg-cyan-700 rounded-full"></div>
          <div className="w-1 h-1 bg-cyan-700 rounded-full"></div>
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