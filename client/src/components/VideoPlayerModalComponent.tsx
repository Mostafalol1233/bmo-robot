import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import bmoCloseSound from '@assets/bmo (mp3cut.net)(1)_1757268053074.mp3';

interface VideoItem {
  id: string;
  title: string;
  url: string;
  youtubeUrl?: string;
  thumbnail?: string;
  duration?: string;
}

interface VideoPlayerModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  videos: VideoItem[];
  initialVideoIndex?: number;
}

export default function VideoPlayerModalComponent({ 
  isOpen, 
  onClose, 
  videos, 
  initialVideoIndex = 0 
}: VideoPlayerModalComponentProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(initialVideoIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);

  // Reset to initial video when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentVideoIndex(initialVideoIndex);
      setIsPlaying(false);
    }
  }, [isOpen, initialVideoIndex]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const currentVideo = videos[currentVideoIndex];
  const canGoNext = currentVideoIndex < videos.length - 1;
  const canGoPrev = currentVideoIndex > 0;

  const handleVideoSelect = (index: number) => {
    setCurrentVideoIndex(index);
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (canGoNext) {
      handleVideoSelect(currentVideoIndex + 1);
    }
  };

  const handlePrev = () => {
    if (canGoPrev) {
      handleVideoSelect(currentVideoIndex - 1);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-slideIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      data-testid="video-player-modal"
    >
      <div className="bg-card border border-primary/30 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl animate-slideIn">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 pb-2 border-b border-primary/20 bg-card/80 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <i className="fas fa-play-circle text-primary text-lg"></i>
            <div>
              <h2 className="pixel-text text-sm text-foreground">{currentVideo?.title || 'Video Player'}</h2>
              <p className="text-xs text-muted-foreground">
                {currentVideoIndex + 1} of {videos.length} videos
              </p>
            </div>
          </div>
          <button 
            onClick={() => {
              // Play close sound when X is clicked
              const audio = new Audio(bmoCloseSound);
              audio.volume = 0.3;
              audio.play().catch(() => {
                // Handle audio play failure silently
              });
              onClose();
            }}
            className="text-muted-foreground hover:text-foreground transition-colors transform hover:scale-110"
            data-testid="button-close-video-modal"
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        <div className="flex">
          {/* Video Player Section */}
          <div className="flex-1">
            {/* Video Player */}
            <div className="relative bg-black aspect-video">
              {currentVideo ? (
                <ReactPlayer
                  url={currentVideo.youtubeUrl || currentVideo.url}
                  width="100%"
                  height="100%"
                  playing={isPlaying}
                  volume={volume}
                  controls={true}
                  onError={(error) => {
                    console.error('Video error:', error);
                  }}
                  onReady={() => {
                    console.log('Video ready');
                  }}
                  data-testid="react-player"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <i className="fas fa-exclamation-triangle text-accent text-3xl mb-3"></i>
                    <p className="pixel-text text-sm text-muted-foreground">
                      Unable to load video
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Controls */}
            <div className="p-4 border-t border-primary/20 bg-card/50">
              <div className="flex items-center justify-between">
                <button 
                  onClick={handlePrev}
                  disabled={!canGoPrev}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${
                    canGoPrev 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-muted/20 text-muted-foreground cursor-not-allowed'
                  }`}
                  data-testid="button-prev-video"
                >
                  <i className="fas fa-chevron-left"></i>
                  <span className="pixel-text text-xs">PREV</span>
                </button>

                <div className="text-center">
                  <p className="pixel-text text-xs text-foreground mb-1">
                    {currentVideo?.title}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">
                    Video {currentVideoIndex + 1} of {videos.length}
                  </p>
                  {currentVideo?.youtubeUrl && (
                    <a 
                      href={currentVideo.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs text-red-600 hover:text-red-700 transition-colors"
                    >
                      <i className="fab fa-youtube"></i>
                      <span>Watch on YouTube</span>
                    </a>
                  )}
                </div>

                <button 
                  onClick={handleNext}
                  disabled={!canGoNext}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${
                    canGoNext 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-muted/20 text-muted-foreground cursor-not-allowed'
                  }`}
                  data-testid="button-next-video"
                >
                  <span className="pixel-text text-xs">NEXT</span>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Playlist Sidebar */}
          <div className="w-80 border-l border-primary/20 bg-card/30">
            <div className="p-4 border-b border-primary/20">
              <h3 className="pixel-text text-sm text-foreground mb-2">Playlist</h3>
              <p className="text-xs text-muted-foreground">{videos.length} videos</p>
            </div>
            
            <div className="overflow-y-auto max-h-96 custom-scrollbar">
              {videos.map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => handleVideoSelect(index)}
                  className={`w-full p-3 text-left hover:bg-primary/10 transition-colors border-b border-primary/10 ${
                    index === currentVideoIndex ? 'bg-primary/20 border-l-4 border-l-primary' : ''
                  }`}
                  data-testid={`playlist-video-${index}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-16 h-12 bg-muted/20 rounded flex items-center justify-center flex-shrink-0">
                      {index === currentVideoIndex ? (
                        <i className="fas fa-play text-primary text-sm"></i>
                      ) : (
                        <i className="fas fa-video text-muted-foreground text-sm"></i>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`pixel-text text-xs mb-1 truncate ${
                        index === currentVideoIndex ? 'text-primary' : 'text-foreground'
                      }`}>
                        {video.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {video.duration || 'Duration unknown'}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}