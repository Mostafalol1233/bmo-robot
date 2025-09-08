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

  // Remove Replit theme classes
  const htmlElement = document.documentElement;
  if (htmlElement) {
    htmlElement.classList.remove('replit-ui-theme-root');
    htmlElement.removeAttribute('translate');
    htmlElement.removeAttribute('style');
  }

  // Remove any replit-specific style elements
  const styleElements = document.querySelectorAll('style');
  styleElements.forEach(style => {
    if (style.textContent && (
      style.textContent.includes('replit') ||
      style.textContent.includes('.ͼ1.cm-focused') ||
      style.textContent.includes('replit-ui-theme')
    )) {
      style.remove();
    }
  });

  // Remove replit banner comments
  const walker = document.createTreeWalker(
    document,
    NodeFilter.SHOW_COMMENT,
    null
  );

  const comments: Comment[] = [];
  let node;
  while (node = walker.nextNode()) {
    if (node.textContent && node.textContent.includes('replit')) {
      comments.push(node as Comment);
    }
  }

  comments.forEach(comment => {
    comment.remove();
  });

  // Remove any elements with replit class names
  const replitClassElements = document.querySelectorAll('[class*="replit"]');
  replitClassElements.forEach(el => {
    const classes = Array.from(el.classList);
    classes.forEach(className => {
      if (className.includes('replit')) {
        el.classList.remove(className);
      }
    });
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
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'data-replit-metadata', 'data-component-name', 'translate', 'style']
  });

  // Also run cleanup every second for better coverage
  setInterval(cleanupReplitMetadata, 1000);

  // Force cleanup on window focus (when user switches back to tab)
  window.addEventListener('focus', cleanupReplitMetadata);

  // Force cleanup on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cleanupReplitMetadata);
  }
}