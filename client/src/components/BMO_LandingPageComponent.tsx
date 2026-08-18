import { useState, useEffect, useRef, type CSSProperties } from 'react';
import bmoWelcomeSound from '@assets/bmo (mp3cut.net)_1757268027014.mp3';
import adventureBackground from '@assets/1_1757441992148.jfif';

interface BMO_LandingPageComponentProps {
  onStart: () => void;
  isScreenZooming?: boolean;
}

type FaceMood = 'happy' | 'sleepy' | 'surprised' | 'wink' | 'love' | 'sad';

const faceMoods: Array<{ id: FaceMood; label: string; glyph: string; caption: string }> = [
  { id: 'happy', label: 'HAPPY', glyph: '◡', caption: 'ready for an adventure' },
  { id: 'sleepy', label: 'SLEEPY', glyph: '⌣', caption: 'five more minutes, human' },
  { id: 'surprised', label: 'WOW', glyph: 'O', caption: 'oh my glob!' },
  { id: 'wink', label: 'WINK', glyph: '¬', caption: 'you got this' },
  { id: 'love', label: 'LOVE', glyph: '♥', caption: 'best friends forever' },
  { id: 'sad', label: 'SAD', glyph: '︵', caption: 'cheer up, little buddy' },
];

export default function BMO_LandingPageComponent({ onStart, isScreenZooming }: BMO_LandingPageComponentProps) {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isMouthMoving, setIsMouthMoving] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [selectedFace, setSelectedFace] = useState<FaceMood>('happy');
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

  const activeMood = faceMoods.find((mood) => mood.id === selectedFace) ?? faceMoods[0];
  const isWink = selectedFace === 'wink';

  return (
    <div
      className="bmo-stage min-h-screen flex items-center justify-center p-4 sm:p-8"
      style={{ '--bmo-reference-bg': `url(${adventureBackground})` } as CSSProperties}
    >
      <div className="bmo-layout">
        <div className="bmo-intro">
          <div className="bmo-reference-mark">BMO <span>PORTFOLIO</span></div>
          <div className="bmo-kicker"><span className="bmo-live-dot" /> BMO // ONLINE</div>
          <h1>HELLO, HUMAN<span>.</span></h1>
          <p>Pick a face for your new best friend, then press start to explore BMO's world.</p>
          <div className="bmo-intro-rule" />
          <div className="bmo-hint"><span>01</span> FACE DECK <b>·</b> <span>02</span> START ADVENTURE</div>
        </div>

        <div
          ref={bmoRef}
          className={`bmo-character ${isScreenZooming ? 'bmo-character--zooming' : ''}`}
          data-testid="bmo-landing-component"
        >
        <div className="bmo-shadow" aria-hidden="true" />
        {/* BMO Body - a CSS-perspective shell inspired by the reference */}
        <div className="bmo-shell relative p-6" style={{ aspectRatio: '0.65', width: '320px' }}>
          <div className="bmo-shell-side-plane" aria-hidden="true" />
          <div className="bmo-shell-top" />
          <div className="bmo-screw bmo-screw--tl" />
          <div className="bmo-screw bmo-screw--tr" />
          <div className="bmo-screw bmo-screw--bl" />
          <div className="bmo-screw bmo-screw--br" />
          
          {/* BMO Screen - White screen with animated face */}
          <div 
            className="bmo-face-screen h-52 mb-6 relative overflow-hidden flex flex-col items-center justify-center cursor-pointer"
            onClick={handleStart}
            data-testid="bmo-screen-clickable"
            title="Start BMO"
          >
            <div className={`bmo-face-art bmo-face-art--${selectedFace} relative z-10 ${isMouthMoving ? 'bmo-face-art--talking' : ''}`}>
              <div className="bmo-eyes">
                <div className="relative">
                  <div className={`bmo-eye ${isBlinking || isWink ? 'bmo-eye--closed' : ''}`}
                    style={{
                      transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                    }}
                    data-testid="bmo-left-eye"
                  ></div>
                </div>
                <div className="relative">
                  <div className={`bmo-eye ${isBlinking ? 'bmo-eye--closed' : ''}`}
                    style={{
                      transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
                    }}
                    data-testid="bmo-right-eye"
                  ></div>
                </div>
              </div>
              
              <div className="bmo-mouth" aria-label={`${activeMood.label.toLowerCase()} expression`}>
                {selectedFace === 'surprised' && <span className="bmo-mouth-surprised" />}
                {selectedFace === 'love' && <span className="bmo-mouth-smile" />}
                {selectedFace === 'sad' && <span className="bmo-mouth-sad" />}
                {selectedFace === 'sleepy' && <span className="bmo-mouth-sleepy" />}
                {(selectedFace === 'happy' || selectedFace === 'wink') && <span className="bmo-mouth-smile" />}
              </div>
            </div>
            
            <div className="bmo-screen-glare" />
            <div className="bmo-screen-status"><span /> {activeMood.label}</div>
          </div>
          
          {/* Speaker grille and headphone jack */}
          <div className="bmo-speaker-grille" aria-label="BMO speaker">
            {Array.from({ length: 6 }).map((_, index) => <i key={index} />)}
          </div>
          <div className="bmo-headphone-jack" />

          <div className="bmo-slot" />

          {/* Control Buttons Layout - More authentic BMO layout */}
          <div className="bmo-controls">
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
          <span className="bmo-side-label">BMO</span>
        </div>

        <div className="bmo-side-vents" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, index) => <i key={index} />)}
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
              className="bmo-arm bmo-arm--left w-2 h-20 rounded-full transform rotate-12"
              style={{
                borderLeft: '2px solid black',
                borderRight: '2px solid black',
                boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.1)'
              }}
            ></div>
            {/* Lower arm curve */}
            <div 
              className="bmo-arm bmo-arm--left w-2 h-16 rounded-full absolute top-16 left-2 transform -rotate-45 transition-transform duration-300"
              style={{
                borderLeft: '2px solid black',
                borderRight: '2px solid black',
                boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.1)'
              }}
            ></div>
            {/* Simple mitten hand - Adventure Time style */}
            <div 
              className="bmo-hand absolute top-28 left-6 w-7 h-9 rounded-full border-2 transition-all duration-300"
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
            transformOrigin: 'center left',
            transform: isWaving ? 'rotate(-15deg)' : 'rotate(0deg)'
          }}
        >
          {/* Thin flexible arm */}
          <div className="relative">
            {/* Upper arm curve - mirrored from left arm */}
            <div 
              className="bmo-arm bmo-arm--right w-2 h-20 rounded-full transform -rotate-12"
              style={{
                borderLeft: '2px solid black',
                borderRight: '2px solid black',
                boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.1)'
              }}
            ></div>
            {/* Lower arm curve - properly mirrored positioning */}
            <div 
              className={`bmo-arm bmo-arm--right w-2 h-16 rounded-full absolute top-16 -left-2 transform rotate-45 transition-transform duration-300`}
              style={{
                borderLeft: '2px solid black',
                borderRight: '2px solid black',
                boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.1)'
              }}
            ></div>
            {/* Simple mitten hand - Adventure Time style - corrected position */}
            <div 
              className={`bmo-hand absolute top-28 -left-6 w-7 h-9 rounded-full border-2 transition-all duration-300 ${
                isWaving ? 'animate-bounce' : ''
              }`}
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                transform: isWaving ? 'rotate(-10deg)' : 'rotate(0deg)'
              }}
            >
              {/* Hand highlight */}
              <div className="absolute top-1 left-1 w-2 h-2 bg-white opacity-20 rounded-full"></div>
              {/* Thumb indication */}
              <div className="absolute -top-1 right-0 w-2 h-3 bg-gray-900 rounded-full border border-black"></div>
            </div>
          </div>
        </div>
        
        {/* BMO Legs - Authentic Adventure Time Style */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
          {/* Left Leg */}
          <div className="absolute -left-12 top-0">
            {/* Thin black leg */}
            <div 
               className="bmo-leg w-2 h-16 rounded-full"
              style={{
                border: '1px solid #333',
                boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.1)'
              }}
            ></div>
            {/* BMO's iconic rounded shoe */}
            <div 
               className="bmo-foot absolute -bottom-2 -left-3 w-9 h-5 rounded-full border-2"
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
               className="bmo-leg w-2 h-16 rounded-full"
              style={{
                border: '1px solid #333',
                boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.1)'
              }}
            ></div>
            {/* BMO's iconic rounded shoe */}
            <div 
               className="bmo-foot absolute -bottom-2 -left-3 w-9 h-5 rounded-full border-2"
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

        <aside className="face-deck" aria-label="BMO face selector">
          <div className="face-deck-header">
            <div>
              <span className="bmo-kicker">FACE DECK</span>
              <h2>How are we feeling?</h2>
            </div>
            <span className="face-deck-count">0{faceMoods.length}</span>
          </div>
          <div className="face-grid">
            {faceMoods.map((mood) => (
              <button
                key={mood.id}
                type="button"
                className={`face-card ${selectedFace === mood.id ? 'face-card--active' : ''}`}
                onClick={() => setSelectedFace(mood.id)}
                aria-pressed={selectedFace === mood.id}
              >
                <span className={`face-card-preview face-card-preview--${mood.id}`}>
                  <i /><i /><b>{mood.glyph}</b>
                </span>
                <span className="face-card-label">{mood.label}</span>
              </button>
            ))}
          </div>
          <div className="face-deck-footer">
            <span className="face-deck-signal" /> {activeMood.caption}
          </div>
        </aside>
      </div>
      
    </div>
  );
}