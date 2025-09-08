import { useState, useEffect, useRef } from 'react';
import bmoWelcomeSound from '@assets/bmo (mp3cut.net)_1757268027014.mp3';

interface BMO_LandingPageComponentProps {
  onStart: () => void;
  isScreenZooming?: boolean;
}

export default function BMO_LandingPageComponent({ onStart, isScreenZooming }: BMO_LandingPageComponentProps) {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isMouthMoving, setIsMouthMoving] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const bmoRef = useRef<HTMLDivElement>(null);

  // Function to stop any currently playing audio
  const stopCurrentAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
  };

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
      // Stop any currently playing audio first
      stopCurrentAudio();
      
      const audio = new Audio(bmoWelcomeSound);
      audio.volume = 0.3;
      currentAudioRef.current = audio;
      
      audio.play().catch(() => {
        // Handle audio play failure silently
      });
      
      // Clear reference when audio ends
      audio.addEventListener('ended', () => {
        currentAudioRef.current = null;
      });
    };

    // Only play sound when component mounts (not when returning from filesystem)
    if (!hasInteracted) {
      playWelcomeSound();
    }
  }, []);

  const handleStart = () => {
    // Trigger robotic arm wave on interaction
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 2000);
    
    // Stop any currently playing audio to prevent conflicts
    stopCurrentAudio();
    
    // Play welcome audio on first interaction
    if (!hasInteracted) {
      setHasInteracted(true);
      // Create audio element dynamically for welcome sound
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmkUDFOq5+61diMGJHfH8N2QQAoUXrTp66hVFApGn+DyvmkUDFOq5+61diMGJHfH8N2QQAoUXrTp66hVFApGn+DyvmkUDFOq5+61diMG');
      audio.volume = 0.3;
      currentAudioRef.current = audio;
      
      audio.play().catch(() => {
        // Handle audio play failure silently
      });
      
      // Clear reference when audio ends
      audio.addEventListener('ended', () => {
        currentAudioRef.current = null;
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
            className={`bg-white border-4 border-gray-800 rounded-lg h-52 mb-6 relative overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all duration-500 ${
              isScreenZooming ? 'animate-screenZoom' : ''
            }`}
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
        
        {/* BMO Arms - Authentic Adventure Time Style */}
        {/* Left Arm - Also Animated for Greeting */}
        <div 
          className={`absolute -left-6 top-1/2 transform -translate-y-1/2 transition-transform duration-500 ${
            isWaving ? 'animate-wave' : ''
          }`}
          style={{
            transformOrigin: 'top center',
            transform: isWaving ? 'rotate(90deg)' : 'rotate(0deg)'
          }}
        >
          {/* Thin flexible arm */}
          <div className="relative">
            {/* Upper arm curve */}
            <div 
              className="w-1.5 h-20 bg-gray-900 rounded-full transform rotate-12"
              style={{
                borderLeft: '2px solid black',
                borderRight: '2px solid black',
                boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.1)'
              }}
            ></div>
            {/* Lower arm curve */}
            <div 
              className="w-1.5 h-16 bg-gray-900 rounded-full absolute top-16 left-2 transform -rotate-45 transition-transform duration-300"
              style={{
                borderLeft: '2px solid black',
                borderRight: '2px solid black',
                boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.1)'
              }}
            ></div>
            {/* Simple mitten hand - Adventure Time style */}
            <div 
              className="absolute top-28 left-6 w-6 h-8 bg-gray-900 rounded-full border-2 border-black transition-all duration-300"
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              {/* Hand highlight */}
              <div className="absolute top-1 left-1 w-2 h-2 bg-white opacity-20 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Right Arm - Animated (Greeting) - Adventure Time Style */}
        <div 
          className={`absolute -right-6 top-1/2 transform -translate-y-1/2 transition-transform duration-500 ${
            isWaving ? 'animate-wave' : ''
          }`}
          style={{
            transformOrigin: 'top center',
            transform: isWaving ? 'rotate(-90deg)' : 'rotate(0deg)'
          }}
        >
          {/* Thin flexible arm */}
          <div className="relative">
            {/* Upper arm curve - mirrored from left arm */}
            <div 
              className="w-1.5 h-20 bg-gray-900 rounded-full transform rotate-12"
              style={{
                borderLeft: '2px solid black',
                borderRight: '2px solid black',
                boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.1)'
              }}
            ></div>
            {/* Lower arm curve - mirrored positioning */}
            <div 
              className={`w-1.5 h-16 bg-gray-900 rounded-full absolute top-16 -left-2 transition-transform duration-300`}
              style={{
                borderLeft: '2px solid black',
                borderRight: '2px solid black',
                boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.1)',
                transformOrigin: 'top center',
                transform: isWaving ? 'rotate(-45deg)' : 'rotate(-45deg)'
              }}
            ></div>
            {/* Simple mitten hand - Adventure Time style */}
            <div 
              className="absolute top-28 -left-6 w-6 h-8 bg-gray-900 rounded-full border-2 border-black transition-all duration-300"
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              {/* Hand highlight */}
              <div className="absolute top-1 left-1 w-2 h-2 bg-white opacity-20 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* BMO Legs - Authentic Adventure Time Style */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
          {/* Left Leg */}
          <div className="absolute -left-12 top-0">
            {/* Thin black leg */}
            <div 
              className="w-1.5 h-16 bg-black rounded-full"
              style={{
                border: '1px solid #333',
                boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.1)'
              }}
            ></div>
            {/* BMO's iconic rounded shoe */}
            <div 
              className="absolute -bottom-2 -left-2 w-6 h-4 bg-black rounded-full border-2 border-gray-800"
              style={{
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              {/* White shine highlight on shoe */}
              <div className="absolute top-0.5 left-1 w-2 h-1.5 bg-white opacity-40 rounded-full"></div>
              {/* Simple sole line */}
              <div className="absolute bottom-0 left-1 right-1 h-0.5 bg-gray-600 rounded-full"></div>
            </div>
          </div>
          
          {/* Right Leg */}
          <div className="absolute -right-12 top-0">
            {/* Thin black leg */}
            <div 
              className="w-1.5 h-16 bg-black rounded-full"
              style={{
                border: '1px solid #333',
                boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.1)'
              }}
            ></div>
            {/* BMO's iconic rounded shoe */}
            <div 
              className="absolute -bottom-2 -left-2 w-6 h-4 bg-black rounded-full border-2 border-gray-800"
              style={{
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              {/* White shine highlight on shoe */}
              <div className="absolute top-0.5 left-1 w-2 h-1.5 bg-white opacity-40 rounded-full"></div>
              {/* Simple sole line */}
              <div className="absolute bottom-0 left-1 right-1 h-0.5 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
  );
}