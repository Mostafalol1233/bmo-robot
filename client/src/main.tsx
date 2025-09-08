import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setupReplitCleanup } from "./lib/cleanupReplit";

// Start cleanup process to remove Replit development metadata
setupReplitCleanup();

createRoot(document.getElementById("root")!).render(<App />);
