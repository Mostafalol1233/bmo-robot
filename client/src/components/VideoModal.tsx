import ReactPlayer from 'react-player/youtube';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  videoTitle: string;
}

export default function VideoModal({ isOpen, onClose, videoUrl, videoTitle }: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-4 max-w-4xl w-full mx-4 relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold w-8 h-8 flex items-center justify-center"
          data-testid="close-video-modal"
        >
          ×
        </button>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{videoTitle}</h3>
        </div>
        
        <div className="aspect-video bg-black rounded overflow-hidden">
          <ReactPlayer
            url={videoUrl}
            width="100%"
            height="100%"
            controls={true}
            playing={true}
          />
        </div>
        
        <div className="mt-4 text-center">
          <a 
            href="https://www.youtube.com/@Bemora-site"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors"
          >
            <span>🔴</span>
            <span>Visit Bemora Channel</span>
          </a>
        </div>
      </div>
    </div>
  );
}