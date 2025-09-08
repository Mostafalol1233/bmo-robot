import { useState, useEffect, useRef } from 'react';
import bmoWelcomeSound from '@assets/bmo (mp3cut.net)_1757268027014.mp3';

interface BMO_LandingPageComponentProps {
  onStart: () => void;
}

export default function BMO_LandingPageComponent({ onStart }: BMO_LandingPageComponentProps) {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isMouthMoving, setIsMouthMoving] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
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

  // Natural blinking, mouth movements, and robotic arm waving
  useEffect(() => {
    // Random blinking
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 2000 + Math.random() * 3000); // Random between 2-5 seconds

    // Random mouth movements
    const mouthInterval = setInterval(() => {
      setIsMouthMoving(true);
      setTimeout(() => setIsMouthMoving(false), 800);
    }, 3000 + Math.random() * 4000); // Random between 3-7 seconds

    // Random robotic arm waving - greeting animation
    const waveInterval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 2000); // Wave for 2 seconds
    }, 8000 + Math.random() * 5000); // Random between 8-13 seconds

    return () => {
      clearInterval(blinkInterval);
      clearInterval(mouthInterval);
      clearInterval(waveInterval);
    };
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
    // Trigger robotic arm wave on interaction
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 2000);
    
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
          <div 
            className="bg-white border-4 border-gray-800 rounded-lg h-52 mb-6 relative overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors" 
            style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)' }}
            onClick={handleStart}
            data-testid="bmo-screen-clickable"
          >
            {/* BMO Animated Face */}
            <div className="relative z-10 animate-bounce" style={{ imageRendering: 'pixelated', animationDuration: '3s' }}>
              {/* Eyes - Black circles that follow mouse */}
              <div className="flex space-x-12 mb-6">
                <div className="relative">
                  <div className={`w-6 h-6 bg-black rounded-full transition-transform duration-100 ease-out ${isBlinking ? 'animate-blink' : ''}`}
                    style={{
                      transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                      imageRendering: 'pixelated'
                    }}
                    data-testid="bmo-left-eye"
                  ></div>
                </div>
                <div className="relative">
                  <div className={`w-6 h-6 bg-black rounded-full transition-transform duration-100 ease-out ${isBlinking ? 'animate-blink' : ''}`}
                    style={{
                      transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                      imageRendering: 'pixelated'
                    }}
                    data-testid="bmo-right-eye"
                  ></div>
                </div>
              </div>
              
              {/* BMO Smile with movement */}
              <div className="relative w-16 h-6 mx-auto">
                <div className={`absolute bottom-0 left-2 w-12 h-3 border-b-4 border-l-2 border-r-2 border-black rounded-b-full transition-transform duration-200 ${isMouthMoving ? 'animate-pulse' : ''}`} 
                     style={{ 
                       imageRendering: 'pixelated',
                       transform: isMouthMoving ? 'scaleX(1.1) scaleY(0.9)' : 'scaleX(1) scaleY(1)'
                     }}></div>
              </div>
            </div>
            
            {/* Screen reflection effect */}
            <div className="absolute top-2 left-2 w-8 h-8 bg-white opacity-20 rounded blur-sm"></div>
          </div>
          
          {/* Control Buttons Layout - More authentic BMO layout */}
          <div className="space-y-3">
            {/* Top Row: D-Pad and Red Button with proper spacing */}
            <div className="flex justify-between items-start px-2">
              {/* Yellow Cross D-Pad - Games Link */}
              <div className="relative ml-2">
                <button
                  onClick={() => window.open('https://bemora.vercel.app', '_blank')}
                  className="relative w-14 h-14 transform hover:scale-105 transition-all duration-200 cursor-pointer"
                  title="BMO Games"
                  data-testid="button-games"
                >
                  {/* Horizontal bar */}
                  <div className="absolute top-1/2 left-1 w-12 h-4 bg-gradient-to-b from-yellow-300 to-yellow-500 border-2 border-yellow-600 transform -translate-y-1/2 rounded shadow-lg hover:from-yellow-200 hover:to-yellow-400 transition-colors" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)' }}></div>
                  {/* Vertical bar */}
                  <div className="absolute left-1/2 top-1 w-4 h-12 bg-gradient-to-r from-yellow-300 to-yellow-500 border-2 border-yellow-600 transform -translate-x-1/2 rounded shadow-lg hover:from-yellow-200 hover:to-yellow-400 transition-colors" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)' }}></div>
                </button>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 pixel-text text-xs text-black font-bold">GAMES</span>
              </div>
              
              {/* Red Button - Start Button */}
              <div className="relative mr-2">
                <button
                  onClick={handleStart}
                  className="relative w-14 h-14 bg-gradient-to-br from-red-400 to-red-600 border-4 border-red-800 rounded-full shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-200 hover:from-red-300 hover:to-red-500"
                  style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.2)' }}
                  title="Start Portfolio"
                  data-testid="button-start-red"
                >
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-red-300 to-red-500 opacity-40"></div>
                  <div className="absolute inset-3 rounded-full bg-white opacity-20"></div>
                </button>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 pixel-text text-xs text-black font-bold">START</span>
              </div>
              
            </div>
            
          </div>
        </div>
        
        {/* BMO Side Label - More authentic positioning */}
        <div className="absolute right-0 top-1/2 transform translate-x-3 -translate-y-1/2 -rotate-90">
          <span className="pixel-text text-xl text-black font-bold tracking-wider" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.3)' }}>BMO</span>
        </div>
        
        {/* BMO Robotic Arms - More Authentic Mechanical Design */}
        {/* Left Arm - Static */}
        <div className="absolute -left-4 top-1/3">
          {/* Shoulder joint */}
          <div className="w-4 h-4 bg-gray-800 border-2 border-black rounded-sm shadow-lg relative mb-1">
            <div className="absolute inset-1 bg-gray-600 rounded-sm"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-red-500 rounded-full"></div>
          </div>
          {/* Upper arm segment - rectangular for authenticity */}
          <div className="w-3 h-12 bg-gradient-to-b from-black to-gray-800 border border-gray-600 shadow-md relative mx-auto">
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-600"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-900"></div>
            {/* Arm details */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full"></div>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full"></div>
          </div>
          {/* Elbow joint - square and mechanical */}
          <div className="w-4 h-3 bg-gray-700 border border-black shadow-md mx-auto relative">
            <div className="absolute inset-0.5 bg-gray-500 border border-gray-400"></div>
          </div>
          {/* Lower arm segment */}
          <div className="w-3 h-12 bg-gradient-to-b from-black to-gray-800 border border-gray-600 shadow-md relative mx-auto">
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-600"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-900"></div>
            {/* Hand/end effector */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-cyan-400 border border-cyan-600 rounded-sm shadow-sm">
              <div className="absolute inset-0.5 bg-cyan-300 opacity-60"></div>
            </div>
          </div>
        </div>
        
        {/* Right Arm - Animated (Waving) - More Authentic */}
        <div 
          className={`absolute -right-4 top-1/3 transition-transform duration-500 ${
            isWaving ? 'animate-wave' : ''
          }`}
          style={{
            transformOrigin: 'top center',
            transform: isWaving ? 'rotate(20deg)' : 'rotate(0deg)'
          }}
        >
          {/* Shoulder joint */}
          <div className="w-4 h-4 bg-gray-800 border-2 border-black rounded-sm shadow-lg relative mb-1">
            <div className="absolute inset-1 bg-gray-600 rounded-sm"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-red-500 rounded-full animate-robotic-pulse"></div>
          </div>
          {/* Upper arm segment */}
          <div className="w-3 h-12 bg-gradient-to-b from-black to-gray-800 border border-gray-600 shadow-md relative mx-auto">
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-600"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-900"></div>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full"></div>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full"></div>
          </div>
          {/* Elbow joint */}
          <div className="w-4 h-3 bg-gray-700 border border-black shadow-md mx-auto relative">
            <div className="absolute inset-0.5 bg-gray-500 border border-gray-400"></div>
          </div>
          {/* Lower arm segment (waves more) */}
          <div 
            className="w-3 h-12 bg-gradient-to-b from-black to-gray-800 border border-gray-600 shadow-md relative mx-auto"
            style={{
              transformOrigin: 'top center',
              transform: isWaving ? 'rotate(-25deg)' : 'rotate(0deg)',
              transition: 'transform 0.4s ease-in-out'
            }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-600"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-900"></div>
            {/* Hand/end effector with greeting gesture */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-cyan-400 border border-cyan-600 rounded-sm shadow-sm animate-robotic-pulse">
              <div className="absolute inset-0.5 bg-cyan-300 opacity-60"></div>
              {/* Small greeting indicator */}
              <div className="absolute -top-1 -right-1 w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
        
        {/* BMO Legs - More authentic */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full flex space-x-16">
          <div className="w-2 h-16 bg-black rounded-full shadow-md"></div>
          <div className="w-2 h-16 bg-black rounded-full shadow-md"></div>
        </div>
        
      </div>
      
    </div>
  );
}