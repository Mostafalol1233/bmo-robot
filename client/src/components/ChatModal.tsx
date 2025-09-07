import { useState, useRef, useEffect } from "react";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bmo';
  timestamp: Date;
}

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi friend! I'm BMO! Want to know about my creator's projects?",
      sender: 'bmo',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Simple BMO responses
    setTimeout(() => {
      const bmoResponses = [
        "That's mathematical! 🎮",
        "Oh, you want to know more? Check out the projects section!",
        "I love making friends! BMO is everyone's friend!",
        "Want to see some cool code? My creator makes awesome stuff!",
        "Adventure Time! Let's explore the portfolio together!",
        "Beep boop! I'm a living video game console!",
      ];
      
      const randomResponse = bmoResponses[Math.floor(Math.random() * bmoResponses.length)];
      
      const bmoMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'bmo',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, bmoMessage]);
    }, 1000);

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      data-testid="chat-modal"
    >
      <div className="bg-card border border-border rounded-2xl p-6 max-w-md w-full max-h-96 flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="pixel-text text-xs text-primary-foreground">BMO</span>
            </div>
            <span className="tech-text text-sm text-foreground">Chat with BMO</span>
          </div>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            data-testid="button-close-chat"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-3 custom-scrollbar" data-testid="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center flex-shrink-0">
                <span className="pixel-text text-xs text-primary-foreground">
                  {message.sender === 'bmo' ? 'B' : 'U'}
                </span>
              </div>
              <div className="bg-muted/20 rounded-lg p-3 flex-1">
                <p className="text-sm text-foreground">{message.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat Input */}
        <div className="flex space-x-3">
          <input 
            type="text" 
            placeholder="Type a message..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-muted/20 border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            data-testid="input-chat-message"
          />
          <button 
            onClick={handleSendMessage}
            className="bg-primary text-primary-foreground rounded-lg px-4 py-2 hover:bg-primary/90 transition-colors"
            data-testid="button-send-message"
          >
            <i className="fas fa-paper-plane text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
