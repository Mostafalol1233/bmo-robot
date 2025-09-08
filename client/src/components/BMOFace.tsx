import { useState, useEffect, useRef } from 'react';
import bmoWelcomeSound from '@assets/bmo (mp3cut.net)_1757268027014.mp3';
import treeHouseBackground from '@assets/image_1757366365841.png';

interface BMOFaceProps {
  isVisible: boolean;
  onFaceComplete?: () => void;
}

export default function BMOFace({ isVisible, onFaceComplete }: BMOFaceProps) {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const talkingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const blinkingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mouse tracking for eyes
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) return;

      const rect = document.querySelector('.bmo-face-container')?.getBoundingClientRect();
      if (!rect) return;

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
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible]);

  // Blinking animation
  useEffect(() => {
    if (!isVisible) return;

    const startBlinking = () => {
      blinkingIntervalRef.current = setInterval(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }, 3000 + Math.random() * 2000); // Random interval between 3-5 seconds
    };

    startBlinking();
    return () => {
      if (blinkingIntervalRef.current) {
        clearInterval(blinkingIntervalRef.current);
      }
    };
  }, [isVisible]);

  // Welcome audio and talking animation
  useEffect(() => {
    if (isVisible && !hasPlayed) {
      setHasPlayed(true);
      
      // Play welcome audio
      const audio = new Audio(bmoWelcomeSound);
      audio.volume = 0.4;
      audioRef.current = audio;

      // Start talking animation
      setIsTalking(true);
      
      // Simulate talking with mouth movement
      talkingIntervalRef.current = setInterval(() => {
        setMouthOpen(prev => !prev);
      }, 200); // Toggle mouth every 200ms

      audio.play().then(() => {
        // Audio started playing
      }).catch(() => {
        // Handle audio play failure
        setIsTalking(false);
        if (talkingIntervalRef.current) {
          clearInterval(talkingIntervalRef.current);
        }
      });

      // Listen for audio end
      audio.addEventListener('ended', () => {
        setIsTalking(false);
        setMouthOpen(false);
        if (talkingIntervalRef.current) {
          clearInterval(talkingIntervalRef.current);
        }
        // Optional callback when face animation is complete
        if (onFaceComplete) {
          setTimeout(onFaceComplete, 1000);
        }
      });
    }

    return () => {
      if (talkingIntervalRef.current) {
        clearInterval(talkingIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isVisible, hasPlayed, onFaceComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className="bmo-face-container absolute inset-0 flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 41, 59, 0.7), rgba(51, 65, 85, 0.7)), url(${treeHouseBackground})`,
      }}
      data-testid="bmo-face"
    >
      {/* Eyes */}
      <div className="flex space-x-12 mb-6">
        {/* Left Eye */}
        <div className="relative">
          <div 
            className={`w-8 h-8 bg-yellow-400 rounded-full border-2 border-yellow-600 transition-all duration-100 ${
              isBlinking ? 'transform scale-y-0' : ''
            }`}
            style={{
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2), 0 0 8px rgba(255,255,0,0.4)'
            }}
          >
            {/* Eye pupil that follows mouse */}
            <div 
              className="absolute w-3 h-3 bg-black rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100"
              style={{
                transform: `translate(${-50 + eyePosition.x}%, ${-50 + eyePosition.y}%)`
              }}
            />
          </div>
        </div>

        {/* Right Eye */}
        <div className="relative">
          <div 
            className={`w-8 h-8 bg-yellow-400 rounded-full border-2 border-yellow-600 transition-all duration-100 ${
              isBlinking ? 'transform scale-y-0' : ''
            }`}
            style={{
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2), 0 0 8px rgba(255,255,0,0.4)'
            }}
          >
            {/* Eye pupil that follows mouse */}
            <div 
              className="absolute w-3 h-3 bg-black rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100"
              style={{
                transform: `translate(${-50 + eyePosition.x}%, ${-50 + eyePosition.y}%)`
              }}
            />
          </div>
        </div>
      </div>

      {/* Mouth */}
      <div className="relative">
        {isTalking ? (
          // Talking mouth (alternates between open and closed)
          <div 
            className={`transition-all duration-100 ${
              mouthOpen 
                ? 'w-6 h-4 bg-black rounded-full border-2 border-slate-600' 
                : 'w-8 h-2 bg-black rounded-full border border-slate-600'
            }`}
            style={{
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)'
            }}
          />
        ) : (
          // Happy smile mouth
          <div 
            className="w-10 h-5 border-b-4 border-l-2 border-r-2 border-yellow-400 rounded-b-full"
            style={{
              borderBottomColor: '#facc15',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
            }}
          />
        )}
      </div>

      {/* Cheek highlights when talking */}
      {isTalking && (
        <>
          <div 
            className="absolute left-8 top-1/2 w-4 h-4 bg-yellow-300 rounded-full opacity-30 animate-pulse"
            style={{ transform: 'translateY(-50%)' }}
          />
          <div 
            className="absolute right-8 top-1/2 w-4 h-4 bg-yellow-300 rounded-full opacity-30 animate-pulse"
            style={{ transform: 'translateY(-50%)' }}
          />
        </>
      )}

      {/* Welcome text */}
      {isTalking && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-slate-700 bg-opacity-80 rounded-lg px-3 py-2 backdrop-blur-sm">
            <p className="pixel-text text-xs text-yellow-400 text-center animate-pulse">
              Welcome friends! I have been expecting you...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}