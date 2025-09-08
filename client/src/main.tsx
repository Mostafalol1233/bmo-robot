import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setupReplitCleanup } from "./lib/cleanupReplit";
import { setupProtection } from "./lib/protection";

// Start cleanup process to remove Replit development metadata
setupReplitCleanup();

// Setup website protection
setupProtection();

createRoot(document.getElementById("root")!).render(<App />);
