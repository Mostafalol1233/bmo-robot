import { useState } from 'react';
import VideoPlayerModalComponent from './VideoPlayerModalComponent';

interface BMO_SimpleFileSystemProps {
  onBack?: () => void;
}

type ViewType = 'explorer' | 'videos' | 'images' | 'chat' | 'communities' | 'contact' | 'tools';

export default function BMO_SimpleFileSystem({ onBack }: BMO_SimpleFileSystemProps) {
  const [currentView, setCurrentView] = useState<ViewType>('explorer');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  // Video list with real YouTube URLs
  const videoList = [
    {
      id: '1',
      title: 'BMO Adventure Short #1',
      url: 'https://youtube.com/shorts/A1eUITFLvrA',
      thumbnail: 'https://img.youtube.com/vi/A1eUITFLvrA/mqdefault.jpg'
    },
    {
      id: '2', 
      title: 'BMO Adventure Short #2',
      url: 'https://youtube.com/shorts/920D9DjKgCo',
      thumbnail: 'https://img.youtube.com/vi/920D9DjKgCo/mqdefault.jpg'
    },
    {
      id: '3',
      title: 'BMO Adventure Short #3', 
      url: 'https://youtube.com/shorts/Ql7tURnDdzk',
      thumbnail: 'https://img.youtube.com/vi/Ql7tURnDdzk/mqdefault.jpg'
    },
    {
      id: '4',
      title: 'Adventure Time Tutorial',
      url: 'https://www.youtube.com/watch?v=puFy652XCl8',
      thumbnail: 'https://img.youtube.com/vi/puFy652XCl8/mqdefault.jpg'
    },
    {
      id: '5',
      title: 'BMO Coding Session',
      url: 'https://www.youtube.com/watch?v=wjwNBUB_iXk', 
      thumbnail: 'https://img.youtube.com/vi/wjwNBUB_iXk/mqdefault.jpg'
    }
  ];

  const folders = [
    { name: 'Videos', emoji: '🎬', type: 'videos' as ViewType },
    { name: 'Images', emoji: '🖼️', type: 'images' as ViewType },
    { name: 'Chat', emoji: '💬', type: 'chat' as ViewType },
    { name: 'Communities', emoji: '👥', type: 'communities' as ViewType },
    { name: 'Contact', emoji: '📒', type: 'contact' as ViewType },
    { name: 'Tools', emoji: '🛠', type: 'tools' as ViewType }
  ];

  const handleVideoClick = (video: any) => {
    const videoIndex = videoList.findIndex(v => v.id === video.id);
    setSelectedVideoIndex(videoIndex);
    setIsVideoModalOpen(true);
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'videos':
        return (
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4 text-black" style={{fontFamily: 'monospace'}}>📹 VIDEOS</h2>
            <div className="max-h-96 overflow-y-auto custom-scrollbar pr-2">
              <div className="grid grid-cols-3 gap-4">
                {videoList.map((video) => (
                  <div
                    key={video.id}
                    className="bg-cyan-300 border-2 border-black cursor-pointer hover:bg-cyan-200 transition-colors p-2"
                    onClick={() => handleVideoClick(video)}
                    data-testid={`video-item-${video.id}`}
                  >
                    <div className="aspect-video bg-black mb-2 overflow-hidden relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm ml-0.5">▶</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-center text-black" style={{fontFamily: 'monospace'}}>
                      {video.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'images':
        return (
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4 text-black" style={{fontFamily: 'monospace'}}>🖼️ IMAGES</h2>
            <div className="max-h-96 overflow-y-auto custom-scrollbar pr-2">
              <div className="grid grid-cols-4 gap-4">
                {['Finn', 'Jake', 'Princess Bubblegum', 'Marceline', 'BMO', 'Ice King', 'Tree Trunks', 'Lady Rainicorn'].map((character, index) => (
                  <div
                    key={character}
                    className="bg-cyan-300 border-2 border-black cursor-pointer hover:bg-cyan-200 transition-colors p-3 text-center"
                  >
                    <div className="w-12 h-12 bg-cyan-400 border border-black mx-auto mb-2 flex items-center justify-center">
                      <span className="text-lg">🖼️</span>
                    </div>
                    <div className="text-xs font-bold text-black" style={{fontFamily: 'monospace'}}>
                      {character.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'chat':
        return (
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4 text-black" style={{fontFamily: 'monospace'}}>💬 CHAT</h2>
            <div className="bg-black border-2 border-cyan-400 h-64 p-4 overflow-y-auto custom-scrollbar">
              <div className="text-green-400 font-mono text-sm space-y-2">
                <div>BMO_SYSTEM &gt; Welcome to BMO Chat!</div>
                <div>BMO_SYSTEM &gt; I can talk about Adventure Time!</div>
                <div>USER &gt; Hi BMO!</div>
                <div>BMO &gt; Hello friend! Want to play a game?</div>
                <div>USER &gt; Tell me about Finn and Jake</div>
                <div>BMO &gt; Finn is a brave human boy and Jake is his magical dog brother!</div>
                <div className="text-cyan-400">BMO_SYSTEM &gt; Type your message...</div>
              </div>
            </div>
            <div className="mt-4 flex">
              <input 
                type="text" 
                placeholder="Type to BMO..."
                className="flex-1 bg-cyan-300 border-2 border-black p-2 text-black font-mono text-sm"
              />
              <button className="bg-green-400 border-2 border-black px-4 text-black font-bold hover:bg-green-300">
                SEND
              </button>
            </div>
          </div>
        );

      case 'communities':
        return (
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4 text-black" style={{fontFamily: 'monospace'}}>👥 COMMUNITIES</h2>
            <div className="max-h-96 overflow-y-auto custom-scrollbar pr-2">
              <div className="space-y-3">
                {[
                  'Adventure Time Fans',
                  'BMO Programmers Club', 
                  'Tree Fort Builders',
                  'Candy Kingdom Citizens',
                  'Mathematical Minds',
                  'Ice King Fan Club'
                ].map((community, index) => (
                  <div
                    key={community}
                    className="bg-cyan-300 border-2 border-black cursor-pointer hover:bg-cyan-200 transition-colors p-4 flex items-center space-x-4"
                  >
                    <div className="w-12 h-12 bg-cyan-400 border border-black flex items-center justify-center">
                      <span className="text-lg">👥</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-black" style={{fontFamily: 'monospace'}}>
                        {community.toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-700" style={{fontFamily: 'monospace'}}>
                        {Math.floor(Math.random() * 1000)} MEMBERS
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4 text-black" style={{fontFamily: 'monospace'}}>📒 CONTACT</h2>
            <div className="bg-cyan-300 border-2 border-black p-4 space-y-4">
              <div className="text-center">
                <div className="w-24 h-24 bg-cyan-400 border-2 border-black mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">📞</span>
                </div>
                <div className="text-lg font-bold text-black" style={{fontFamily: 'monospace'}}>
                  BMO CONTACT INFO
                </div>
              </div>
              <div className="space-y-2 text-sm font-mono text-black">
                <div>📧 EMAIL: bmo@adventuretime.ooo</div>
                <div>🌐 WEBSITE: www.bmo-portfolio.dev</div>
                <div>📱 PHONE: 1-800-BMO-TIME</div>
                <div>📍 LOCATION: Tree Fort, Land of Ooo</div>
                <div>⏰ AVAILABLE: Always for friends!</div>
              </div>
            </div>
          </div>
        );

      case 'tools':
        return (
          <div className="p-6">
            <h2 className="text-lg font-bold mb-4 text-black" style={{fontFamily: 'monospace'}}>🛠 TOOLS</h2>
            <div className="max-h-96 overflow-y-auto custom-scrollbar pr-2">
              <div className="grid grid-cols-3 gap-4">
                {[
                  'Calculator', 'Clock', 'Compass', 
                  'Notepad', 'Calendar', 'Music Player',
                  'Camera', 'Map', 'Weather'
                ].map((tool, index) => (
                  <div
                    key={tool}
                    className="bg-cyan-300 border-2 border-black cursor-pointer hover:bg-cyan-200 transition-colors p-3 text-center"
                  >
                    <div className="w-12 h-12 bg-cyan-400 border border-black mx-auto mb-2 flex items-center justify-center">
                      <span className="text-lg">🛠️</span>
                    </div>
                    <div className="text-xs font-bold text-black" style={{fontFamily: 'monospace'}}>
                      {tool.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-6">
            <div className="grid grid-cols-3 gap-6 h-full items-start">
              {folders.map((folder) => (
                <button
                  key={folder.name}
                  onClick={() => setCurrentView(folder.type)}
                  className="flex flex-col items-center p-4 hover:bg-green-200 hover:bg-opacity-50 border-2 border-transparent hover:border-black transition-all duration-200"
                  data-testid={`folder-${folder.name.toLowerCase()}`}
                >
                  <div className="w-16 h-12 bg-cyan-400 border-2 border-black relative mb-3" style={{clipPath: 'polygon(0 20%, 30% 20%, 35% 0, 100% 0, 100% 80%, 70% 80%, 65% 100%, 0 100%)'}}>
                    <div className="absolute inset-1 bg-cyan-300 flex items-center justify-center">
                      <span className="text-xl">{folder.emoji}</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-black text-center" style={{fontFamily: 'monospace', textShadow: '1px 1px 0px rgba(0,0,0,0.3)'}}>
                    {folder.name.toUpperCase()}
                  </span>
                </button>
              ))}
              
              {/* Trash can */}
              <div className="flex justify-end">
                <div className="w-12 h-16 bg-gray-600 border-2 border-black relative" style={{clipPath: 'polygon(25% 0%, 75% 0%, 85% 10%, 85% 100%, 15% 100%, 15% 10%)'}}>
                  <div className="absolute inset-1 bg-gray-500 flex items-center justify-center">
                    <span className="text-lg">🗑️</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <div 
        className="w-full h-full bg-gradient-to-br from-green-300 via-green-400 to-green-500 text-black"
        style={{ fontSize: '12px', fontFamily: 'monospace' }}
        data-testid="bmo-filesystem"
      >
        {/* BMO Classic Interface Header */}
        <div className="bg-gray-700 text-green-400 px-3 py-2 flex items-center justify-between border-b-2 border-black">
          <span className="text-sm font-bold tracking-wider">FILE  EDIT  VIEW  WINDOW  HELP</span>
          {onBack && (
            <button 
              onClick={onBack}
              className="text-green-400 hover:text-green-200 font-bold text-lg"
              data-testid="button-back-to-face"
            >
              ✕
            </button>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 h-full">
          {renderMainContent()}
        </div>
      </div>
      
      {/* Video Player Modal */}
      <VideoPlayerModalComponent
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videos={videoList}
        initialVideoIndex={selectedVideoIndex}
      />
    </>
  );
}