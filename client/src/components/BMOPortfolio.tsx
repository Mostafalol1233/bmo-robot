import { useState } from "react";
import BMOCharacter from "./BMOCharacter";
import ChatModal from "./ChatModal";

type Section = 'face' | 'explorer' | 'about' | 'projects' | 'skills' | 'contact';

export default function BMOPortfolio() {
  const [currentSection, setCurrentSection] = useState<Section>('face');
  const [chatOpen, setChatOpen] = useState(false);

  const showBMOFace = () => setCurrentSection('face');
  const startBMO = () => setCurrentSection('explorer');
  const showFileExplorer = () => setCurrentSection('explorer');
  const openSection = (section: Section) => setCurrentSection(section);
  const openChat = () => setChatOpen(true);
  const closeChat = () => setChatOpen(false);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4 overflow-x-hidden">
        <BMOCharacter 
          currentSection={currentSection}
          onShowBMOFace={showBMOFace}
          onStartBMO={startBMO}
          onShowFileExplorer={showFileExplorer}
          onOpenSection={openSection}
          onOpenChat={openChat}
        />
      </div>
      
      <ChatModal 
        isOpen={chatOpen}
        onClose={closeChat}
      />
    </>
  );
}
