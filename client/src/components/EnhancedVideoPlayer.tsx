import { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, Volume2, VolumeX, Maximize, X, SkipBack, SkipForward } from 'lucide-react';
import bmoCloseSound from '@assets/bmo (mp3cut.net)(1)_1757268053074.mp3';
import { useTranslation } from '@/contexts/TranslationContext';

interface VideoItem {
  id: string;
  title: string;
  url: string;
  youtubeUrl?: string;
  thumbnail?: string;
  duration?: string;
}

interface EnhancedVideoPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  video: VideoItem;
}

export default function EnhancedVideoPlayer({ 
  isOpen, 
  onClose, 
  video
}: EnhancedVideoPlayerProps) {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef<ReactPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsPlaying(false);
      setCurrentTime(0);
      setShowControls(true);
    }
  }, [isOpen]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case ' ':
          e.preventDefault();
          handlePlayPause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleSeek(-10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleSeek(10);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(prev => Math.min(1, prev + 0.1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(prev => Math.max(0, prev - 0.1));
          break;
        case 'm':
          e.preventDefault();
          setIsMuted(prev => !prev);
          break;
        case 'f':
          e.preventDefault();
          handleFullscreen();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen]);

  // Auto-hide controls
  useEffect(() => {
    if (showControls && isPlaying) {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [showControls, isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (seconds: number) => {
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    setCurrentTime(newTime);
    if (playerRef.current) {
      playerRef.current.seekTo(newTime, 'seconds');
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setIsMuted(false);
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen || !video) return null;

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 bg-black z-50 flex items-center justify-center ${isFullscreen ? 'cursor-none' : ''}`}
      onMouseMove={handleMouseMove}
      data-testid="enhanced-video-player"
    >
      {/* Enhanced Video Player */}
      <div className="relative w-full h-full">
        <ReactPlayer
          ref={playerRef}
          url={video.youtubeUrl ?? video.url}
          width="100%"
          height="100%"
          playing={isPlaying}
          volume={isMuted ? 0 : volume}
          onDuration={setDuration}
          onProgress={(progress) => setCurrentTime(progress.playedSeconds)}
          onError={(error) => {
            console.error('Video playback error:', error);
          }}
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0,
                iv_load_policy: 3,
                fs: 1,
                controls: 0,
                disablekb: 1,
                autohide: 1
              }
            }
          }}
        />

        {/* Enhanced Controls Overlay */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <h2 className="text-white text-xl font-bold">{video.title}</h2>
              </div>
              <button 
                onClick={() => {
                  const audio = new Audio(bmoCloseSound);
                  audio.volume = 0.3;
                  audio.play().catch(() => {});
                  onClose();
                }}
                className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/20"
                data-testid="button-close-video"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Center Play/Pause Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button 
              onClick={handlePlayPause}
              className="bg-black/50 hover:bg-black/70 text-white rounded-full p-6 transition-all duration-200 hover:scale-110"
              data-testid="button-play-pause"
            >
              {isPlaying ? <Pause size={48} /> : <Play size={48} />}
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center space-x-3 text-white text-sm mb-2">
                <span>{formatTime(currentTime)}</span>
                <div 
                  className="flex-1 bg-white/20 rounded-full h-1 overflow-hidden cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const seekRatio = (e.clientX - rect.left) / rect.width;
                    const seekTime = duration * seekRatio;
                    setCurrentTime(seekTime);
                    if (playerRef.current) {
                      playerRef.current.seekTo(seekTime, 'seconds');
                    }
                  }}
                >
                  <div 
                    className="bg-teal-400 h-full transition-all duration-200"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  ></div>
                </div>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => handleSeek(-10)}
                  className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/20"
                  data-testid="button-rewind"
                  title="Rewind 10s (←)"
                >
                  <SkipBack size={20} />
                </button>

                <button 
                  onClick={handlePlayPause}
                  className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/20"
                  data-testid="button-center-play-pause"
                  title="Play/Pause (Space)"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>

                <button 
                  onClick={() => handleSeek(10)}
                  className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/20"
                  data-testid="button-forward"
                  title="Forward 10s (→)"
                >
                  <SkipForward size={20} />
                </button>

                {/* Volume Control */}
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/20"
                    data-testid="button-mute"
                    title="Mute (M)"
                  >
                    {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <div 
                    className="w-20 bg-white/20 rounded-full h-1 overflow-hidden cursor-pointer"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const newVolume = (e.clientX - rect.left) / rect.width;
                      handleVolumeChange(Math.max(0, Math.min(1, newVolume)));
                    }}
                  >
                    <div 
                      className="bg-teal-400 h-full transition-all duration-200"
                      style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleFullscreen}
                  className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/20"
                  data-testid="button-fullscreen"
                  title="Fullscreen (F)"
                >
                  <Maximize size={20} />
                </button>
              </div>
            </div>

            {/* Keyboard Shortcuts Help */}
            <div className="mt-3 text-white/60 text-xs">
              <span className="mr-4">Space: Play/Pause</span>
              <span className="mr-4">←/→: Seek 10s</span>
              <span className="mr-4">↑/↓: Volume</span>
              <span className="mr-4">M: Mute</span>
              <span>F: Fullscreen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}