import { useState, useRef, useEffect } from 'react';
import BMO_LandingPageComponent from './BMO_LandingPageComponent';
import BMO_FileSystemComponent from './BMO_FileSystemComponent';
import ChatInterface from './ChatInterface';
import VideoPlayerModalComponent from './VideoPlayerModalComponent';
import LanguageSwitcher from './LanguageSwitcher';

type AppSection = 'landing' | 'filesystem' | 'chat' | 'videos';

interface VideoItem {
  id: string;
  title: string;
  url: string;
  youtubeUrl?: string;
  thumbnail?: string;
  duration?: string;
}

export default function BMO_IntegratedPortfolio() {
  const [currentSection, setCurrentSection] = useState<AppSection>('landing');
  const [isScreenZooming, setIsScreenZooming] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [chatOpen, setChatOpen] = useState(false);
  const [videosOpen, setVideosOpen] = useState(false);
  const bmoRef = useRef<HTMLDivElement>(null);

  // Sample videos for the video player
  const sampleVideos: VideoItem[] = [
    {
      id: '1',
      title: 'BMO\'s Adventure Demo',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      duration: '3:32'
    },
    {
      id: '2', 
      title: 'Coding Tutorial #1',
      url: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
      youtubeUrl: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
      duration: '10:15'
    },
    {
      id: '3',
      title: 'Project Showcase',
      url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
      youtubeUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
      duration: '5:45'
    }
  ];

  // Mouse following logic for landing page
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (currentSection === 'landing' && bmoRef.current) {
        const rect = bmoRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Limit eye movement range
        const maxMovement = 6;
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
  }, [currentSection]);

  // Navigation functions
  const handleStartBMO = () => {
    // Start screen zoom animation from BMO's face, then switch to filesystem
    setIsScreenZooming(true);
    setTimeout(() => {
      setCurrentSection('filesystem');
      setIsZoomed(true);
      setIsScreenZooming(false);
    }, 800); // Allow time for zoom animation
  };

  const handleBackToLanding = () => {
    setCurrentSection('landing');
    setIsZoomed(false);
    setIsScreenZooming(false);
  };

  const handleOpenChat = () => {
    setChatOpen(true);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
  };

  const handleOpenVideos = () => {
    setVideosOpen(true);
  };

  const handleCloseVideos = () => {
    setVideosOpen(false);
  };

  // Render current section
  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'landing':
        return (
          <BMO_LandingPageComponent 
            onStart={handleStartBMO}
            isScreenZooming={isScreenZooming}
          />
        );
      
      case 'filesystem':
        return (
          <div className="min-h-screen flex items-center justify-center p-4">
            {isZoomed ? (
              // Zoomed screen view - fullscreen BMO screen only
              <div 
                className="fixed inset-0 bg-gradient-to-br from-cyan-200 to-cyan-300 border-4 border-cyan-700 animate-zoomIn z-50"
                style={{ transformOrigin: 'center center' }}
                data-testid="bmo-filesystem-zoomed"
              >
                <BMO_FileSystemComponent onBack={handleBackToLanding} />
              </div>
            ) : (
              // Normal BMO body view
              <div 
                ref={bmoRef}
                className="relative w-80 mx-auto"
                data-testid="bmo-filesystem-integrated"
              >
                {/* BMO Body with File System */}
                <div className="bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-lg border-4 border-cyan-600 shadow-2xl relative p-6" style={{ aspectRatio: '0.7' }}>
                  
                  {/* BMO Screen with File System */}
                  <div className="bg-gradient-to-br from-cyan-200 to-cyan-300 border-4 border-cyan-700 rounded-lg h-48 mb-6 relative overflow-hidden">
                    <BMO_FileSystemComponent onBack={handleBackToLanding} />
                  </div>
                  
                  {/* Control Buttons - Same as landing but different actions */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center px-4">
                      <div className="relative">
                        <div className="relative w-12 h-12">
                          <div className="absolute top-1/2 left-0 w-full h-3 bg-yellow-400 border-2 border-yellow-600 transform -translate-y-1/2 rounded-sm shadow-md"></div>
                          <div className="absolute left-1/2 top-0 w-3 h-full bg-yellow-400 border-2 border-yellow-600 transform -translate-x-1/2 rounded-sm shadow-md"></div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={handleBackToLanding}
                        className="w-12 h-12 bg-red-500 rounded-full border-4 border-red-700 shadow-lg transform hover:scale-110 active:scale-95 transition-all duration-200"
                        data-testid="button-home"
                      >
                        <i className="fas fa-home text-white text-sm"></i>
                      </button>
                    </div>
                    
                    <div className="flex justify-between px-4">
                      <span className="pixel-text text-xs text-black opacity-0">D-PAD</span>
                      <span className="pixel-text text-xs text-black">HOME</span>
                    </div>
                    
                    <div className="flex justify-center space-x-6 mt-4">
                      <button 
                        onClick={handleOpenChat}
                        className="text-center transform hover:scale-110 transition-transform"
                        data-testid="button-chat-integrated"
                      >
                        <div className="w-8 h-8 bg-blue-500 border-3 border-blue-700 shadow-md mx-auto flex items-center justify-center" style={{clipPath: 'polygon(50% 15%, 15% 85%, 85% 85%)'}}>
                          <i className="fas fa-comment text-white text-xs"></i>
                        </div>
                        <span className="block mt-1 pixel-text text-xs text-black">CHAT</span>
                      </button>
                      
                      <button 
                        onClick={handleOpenVideos}
                        className="text-center transform hover:scale-110 transition-transform"
                        data-testid="button-videos-integrated"
                      >
                        <div className="w-8 h-6 bg-green-500 border-3 border-green-700 rounded-sm shadow-md flex items-center justify-center">
                          <i className="fas fa-play text-white text-xs"></i>
                        </div>
                        <span className="block mt-1 pixel-text text-xs text-black">VIDEOS</span>
                      </button>
                      
                      <div className="text-center opacity-60">
                        <div className="w-6 h-6 bg-gray-600 border-2 border-gray-800 rounded-sm shadow-md"></div>
                        <span className="block mt-1 pixel-text text-xs text-black">OPTIONS</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* BMO Side Elements */}
                <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2 -rotate-90">
                  <span className="pixel-text text-lg text-black font-bold tracking-wider">BMO</span>
                </div>
                
                <div className="absolute -left-2 top-1/3 w-1 h-16 bg-black rounded-full"></div>
                <div className="absolute -right-2 top-1/3 w-1 h-16 bg-black rounded-full"></div>
                
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full flex space-x-12">
                  <div className="w-1 h-12 bg-black rounded-full"></div>
                  <div className="w-1 h-12 bg-black rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {renderCurrentSection()}
      
      {/* Chat Modal */}
      <ChatInterface 
        isOpen={chatOpen}
        onClose={handleCloseChat}
      />
      
      {/* Video Player Modal */}
      <VideoPlayerModalComponent
        isOpen={videosOpen}
        onClose={handleCloseVideos}
        videos={sampleVideos}
        initialVideoIndex={0}
      />
    </div>
  );
}