/**
 * Website Protection System
 * Protects against right-click, developer tools, and unauthorized access
 */

export function setupProtection() {
  // Disable right-click context menu
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showConsoleWarning();
    showCopyrightAlert();
    return false;
  });

  // Disable specific key combinations
  document.addEventListener('keydown', function(e) {
    // Disable F12 (Developer Tools)
    if (e.keyCode === 123) {
      e.preventDefault();
      showConsoleWarning();
      showCopyrightAlert();
      return false;
    }
    
    // Disable Ctrl+Shift+I (Developer Tools)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      e.preventDefault();
      showConsoleWarning();
      showCopyrightAlert();
      return false;
    }
    
    // Disable Ctrl+Shift+C (Element Inspector)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
      e.preventDefault();
      showConsoleWarning();
      showCopyrightAlert();
      return false;
    }
    
    // Disable Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
      e.preventDefault();
      showConsoleWarning();
      showCopyrightAlert();
      return false;
    }
    
    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
      showConsoleWarning();
      showCopyrightAlert();
      return false;
    }
    
    // Disable Ctrl+S (Save Page)
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      showConsoleWarning();
      showCopyrightAlert();
      return false;
    }
    
    // Disable Ctrl+A (Select All)
    if (e.ctrlKey && e.keyCode === 65) {
      e.preventDefault();
      return false;
    }
    
    // Disable Ctrl+P (Print)
    if (e.ctrlKey && e.keyCode === 80) {
      e.preventDefault();
      showConsoleWarning();
      showCopyrightAlert();
      return false;
    }
  });

  // Disable text selection
  document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false;
  });

  // Disable drag and drop
  document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
  });

  // Detect developer tools
  let devtools = {
    open: false,
    orientation: null
  };

  const threshold = 160;

  setInterval(function() {
    if (window.outerHeight - window.innerHeight > threshold || 
        window.outerWidth - window.innerWidth > threshold) {
      if (!devtools.open) {
        devtools.open = true;
        showConsoleWarning();
        showCopyrightAlert();
        // Redirect or block access
        document.body.innerHTML = `
          <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            font-family: Arial, sans-serif;
          ">
            <div style="
              background: white;
              padding: 40px;
              border-radius: 20px;
              text-align: center;
              box-shadow: 0 20px 40px rgba(0,0,0,0.2);
              max-width: 500px;
            ">
              <h2 style="color: #e74c3c; margin-bottom: 20px;">⚠️ تحذير - حقوق النشر محفوظة</h2>
              <p style="color: #2c3e50; margin-bottom: 20px; line-height: 1.6;">
                هذا الموقع محمي بحقوق النشر.<br>
                فتح أدوات المطور غير مسموح.<br>
                جميع الحقوق محفوظة للمطور.
              </p>
              <button onclick="window.location.reload()" style="
                background: #3498db;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
              ">
                إعادة تحميل الصفحة
              </button>
            </div>
          </div>
        `;
      }
    } else {
      devtools.open = false;
    }
  }, 500);

  // Show console warning only when needed
  let consoleWarningShown = false;
  
  function showConsoleWarning() {
    if (!consoleWarningShown) {
      console.clear();
      console.log('%c⚠️ تحذير - حقوق النشر', 'color: red; font-size: 30px; font-weight: bold;');
      console.log('%cهذا الموقع محمي بحقوق النشر', 'color: red; font-size: 16px;');
      console.log('%cأي محاولة لسرقة الكود أو المحتوى مخالفة قانونية', 'color: red; font-size: 16px;');
      console.log('%cجميع الحقوق محفوظة للمطور', 'color: red; font-size: 16px;');
      consoleWarningShown = true;
      
      // Reset flag after some time
      setTimeout(() => {
        consoleWarningShown = false;
      }, 10000);
    }
  }

  // Disable printing
  window.addEventListener('beforeprint', function(e) {
    e.preventDefault();
    showCopyrightAlert();
    return false;
  });

  // Disable screenshot attempts (limited effectiveness)
  document.addEventListener('keyup', function(e) {
    if (e.key === 'PrintScreen') {
      showCopyrightAlert();
    }
  });

  // Blur content when window loses focus (screenshot protection)
  window.addEventListener('blur', function() {
    document.body.style.filter = 'blur(10px)';
  });

  window.addEventListener('focus', function() {
    document.body.style.filter = 'none';
  });
}

function showCopyrightAlert() {
  // Create a custom alert modal
  const alertDiv = document.createElement('div');
  alertDiv.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      font-family: Arial, sans-serif;
    ">
      <div style="
        background: white;
        padding: 30px;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        max-width: 400px;
      ">
        <h3 style="color: #e74c3c; margin-bottom: 15px;">🚫 غير مسموح</h3>
        <p style="color: #2c3e50; margin-bottom: 20px;">
          هذا الموقع محمي بحقوق النشر<br>
          جميع الحقوق محفوظة
        </p>
        <button onclick="this.parentElement.parentElement.remove()" style="
          background: #3498db;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
        ">
          موافق
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(alertDiv);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    if (alertDiv.parentElement) {
      alertDiv.remove();
    }
  }, 3000);
}

// Additional protection: Hide source code in production
if (typeof window !== 'undefined') {
  // Override toString methods to hide code
  Function.prototype.toString = function() {
    return 'function() { [حماية الكود] }';
  };
  
  // Disable eval
  window.eval = function() {
    showCopyrightAlert();
    throw new Error('eval غير مسموح - حماية الكود');
  };
}