import { useState, useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bmo';
  timestamp: Date;
  audioUrl?: string;
}

interface ChatResponse {
  reply: string;
  audioUrl?: string;
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatInterface({ isOpen, onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi friend! I'm BMO! Want to know about my creator's projects? Ask me anything!",
      sender: 'bmo',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cleanup audio when component unmounts or modal closes
  useEffect(() => {
    if (!isOpen && audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlayingAudio(false);
    }
  }, [isOpen]);

  const chatMutation = useMutation({
    mutationFn: async (message: string): Promise<ChatResponse> => {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
    onSuccess: (data) => {
      const bmoMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        sender: 'bmo',
        timestamp: new Date(),
        audioUrl: data.audioUrl
      };

      setMessages(prev => [...prev, bmoMessage]);

      // Play audio if available
      if (data.audioUrl) {
        playAudio(data.audioUrl);
      }
    },
    onError: (error) => {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Oh no! Something went wrong with my circuits. Try asking me again!",
        sender: 'bmo',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  });

  const playAudio = async (audioUrl: string) => {
    try {
      setIsPlayingAudio(true);
      
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
      }

      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setIsPlayingAudio(false);
      audioRef.current.onerror = () => setIsPlayingAudio(false);
      
      await audioRef.current.play();
    } catch (error) {
      console.error('Audio playback failed:', error);
      setIsPlayingAudio(false);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || chatMutation.isPending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    chatMutation.mutate(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlayingAudio(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-slideIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      data-testid="chat-interface"
    >
      <div className="bg-card border-4 border-primary/60 rounded-3xl p-6 max-w-md w-full max-h-[80vh] flex flex-col shadow-2xl bmo-container">
        {/* BMO Chat Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-primary/30">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center border-2 border-primary/60">
              <span className="pixel-text text-sm text-primary-foreground">BMO</span>
            </div>
            <div>
              <span className="pixel-text text-sm text-foreground">BMO Chat Interface</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${isPlayingAudio ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-xs text-muted-foreground">
                  {isPlayingAudio ? 'Playing audio...' : 'Ready to chat'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isPlayingAudio && (
              <button 
                onClick={stopAudio}
                className="text-accent hover:text-accent/80 transition-colors transform hover:scale-110"
                data-testid="button-stop-audio"
              >
                <i className="fas fa-stop text-sm"></i>
              </button>
            )}
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors transform hover:scale-110"
              data-testid="button-close-chat-interface"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>
        </div>
        
        {/* BMO Chat Messages */}
        <div 
          className="flex-1 overflow-y-auto mb-4 space-y-4 custom-scrollbar bg-muted/10 rounded-2xl p-4 border-2 border-primary/20 bmo-screen min-h-64"
          data-testid="chat-messages-interface"
        >
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                  message.sender === 'bmo' 
                    ? 'bg-primary border-primary/60' 
                    : 'bg-secondary border-secondary/60'
                }`}>
                  <span className="pixel-text text-xs text-primary-foreground">
                    {message.sender === 'bmo' ? 'B' : 'U'}
                  </span>
                </div>

                {/* Message Bubble */}
                <div className={`rounded-2xl p-3 max-w-full ${
                  message.sender === 'bmo'
                    ? 'bg-primary/20 border-2 border-primary/40 text-foreground'
                    : 'bg-secondary/20 border-2 border-secondary/40 text-foreground'
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  
                  {/* Audio Control for BMO messages */}
                  {message.sender === 'bmo' && message.audioUrl && (
                    <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-primary/20">
                      <button 
                        onClick={() => playAudio(message.audioUrl!)}
                        disabled={isPlayingAudio}
                        className="flex items-center space-x-2 text-xs bg-primary/30 hover:bg-primary/40 disabled:bg-muted/20 disabled:text-muted-foreground rounded-lg px-2 py-1 transition-colors"
                        data-testid={`button-play-audio-${message.id}`}
                      >
                        <i className={`fas ${isPlayingAudio ? 'fa-volume-up animate-pulse' : 'fa-play'} text-xs`}></i>
                        <span className="pixel-text">{isPlayingAudio ? 'Playing...' : 'Play'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {chatMutation.isPending && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 max-w-[80%]">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-primary/60">
                  <span className="pixel-text text-xs text-primary-foreground">B</span>
                </div>
                <div className="bg-primary/20 border-2 border-primary/40 rounded-2xl p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
        
        {/* BMO Chat Input */}
        <div className="flex space-x-3">
          <textarea 
            rows={1}
            placeholder="Type your message to BMO..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={chatMutation.isPending}
            className="flex-1 bg-muted/20 border-2 border-border rounded-2xl px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none pixel-text disabled:opacity-50"
            style={{ minHeight: '48px', maxHeight: '96px' }}
            data-testid="input-chat-message-interface"
          />
          <button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || chatMutation.isPending}
            className="bg-primary text-primary-foreground rounded-2xl px-6 py-3 hover:bg-primary/90 disabled:bg-muted/20 disabled:text-muted-foreground transition-colors transform hover:scale-105 active:scale-95 bmo-button flex items-center space-x-2"
            data-testid="button-send-message-interface"
          >
            <i className={`fas ${chatMutation.isPending ? 'fa-spinner animate-spin' : 'fa-paper-plane'} text-sm`}></i>
            <span className="pixel-text text-xs">SEND</span>
          </button>
        </div>

        {/* BMO Status Bar */}
        <div className="mt-3 pt-3 border-t border-primary/20 text-center">
          <p className="pixel-text text-xs text-muted-foreground">
            {chatMutation.isPending ? 'BMO is thinking...' : 'Mathematical! Ask BMO anything!'}
          </p>
        </div>
      </div>
    </div>
  );
}