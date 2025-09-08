/**
 * Utility to clean up Replit metadata attributes from DOM elements
 * This removes development-specific attributes that are not needed in production
 */

export function cleanupReplitMetadata() {
  // Remove all data-replit-metadata attributes
  const elements = document.querySelectorAll('[data-replit-metadata]');
  elements.forEach(el => {
    el.removeAttribute('data-replit-metadata');
  });

  // Remove all data-component-name attributes
  const componentElements = document.querySelectorAll('[data-component-name]');
  componentElements.forEach(el => {
    el.removeAttribute('data-component-name');
  });

  // Remove any Replit banner scripts
  const scripts = document.querySelectorAll('script[src*="replit"]');
  scripts.forEach(script => {
    script.remove();
  });

  // Remove any Replit-specific styles or links
  const replitLinks = document.querySelectorAll('link[href*="replit"]');
  replitLinks.forEach(link => {
    link.remove();
  });
}

/**
 * Set up automatic cleanup that runs periodically to catch dynamically added elements
 */
export function setupReplitCleanup() {
  // Clean up immediately
  cleanupReplitMetadata();

  // Set up a MutationObserver to clean up any newly added elements
  const observer = new MutationObserver(() => {
    cleanupReplitMetadata();
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true
  });

  // Also run cleanup every few seconds as a backup
  setInterval(cleanupReplitMetadata, 3000);
}