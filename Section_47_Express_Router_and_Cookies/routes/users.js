
const express = require('express');
const router = express.Router(); // Create a router instance

// Middleware specific to this router
router.use((req, res, next) => {
  console.log(`🕐 [USER ROUTER] Time: ${new Date().toISOString()}`);
  next();
});

// Define routes on the router
router.get('/profile', (req, res) => {
  res.json({
    message: "User profile page",
    router: "users.js",
    timestamp: new Date().toISOString(),
    tips: [
      "Routers help organize code by feature",
      "Each router can have its own middleware",
      "Routers are mountable at specific paths"
    ]
  });
});

router.get('/settings', (req, res) => {
  res.json({
    message: "User settings",
    theme: "dark",
    notifications: true
  });
});

router.get('/:id', (req, res) => {
  res.json({
    message: `Fetching user with ID: ${req.params.id}`,
    note: "This route is specific to this router"
  });
});


// Add these new routes to existing users.js

// Demo: Show all cookies received
router.get('/cookies', (req, res) => {
  res.json({
    message: 'Cookies received by server',
    cookies: req.cookies,  // Requires cookie-parser middleware
    note: 'Cookies are sent automatically with every request',
    tip: 'Use req.cookies to access cookies on server side'
  });
});

// Demo: Cookie properties explorer
router.get('/cookie-info', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Cookie Explorer</title>
      <style>
        body { font-family: Arial; padding: 20px; max-width: 800px; margin: 0 auto; }
        .cookie-demo { background: #f0f0f0; padding: 15px; margin: 10px 0; border-radius: 5px; }
        button { padding: 10px; margin: 5px; cursor: pointer; }
        pre { background: #fff; padding: 10px; overflow-x: auto; }
      </style>
    </head>
    <body>
      <h1>🍪 Cookie Explorer</h1>
      
      <div class="cookie-demo">
        <h3>Current Cookies:</h3>
        <pre id="cookies"></pre>
        <button onclick="showCookies()">Refresh Cookies</button>
      </div>
      
      <div class="cookie-demo">
        <h3>Set a Cookie</h3>
        <input type="text" id="cookieName" placeholder="Cookie name" value="testCookie">
        <input type="text" id="cookieValue" placeholder="Cookie value" value="helloWorld">
        <button onclick="setCookie()">Set Cookie (client-side)</button>
        <button onclick="setCookieViaServer()">Set Cookie (server-side)</button>
      </div>
      
      <div class="cookie-demo">
        <h3>Cookie Properties</h3>
        <button onclick="showCookieProperties()">Show Properties</button>
      </div>
      
      <script>
        function showCookies() {
          document.getElementById('cookies').textContent = document.cookie || '(no cookies)';
        }
        
        function setCookie() {
          const name = document.getElementById('cookieName').value;
          const value = document.getElementById('cookieValue').value;
          document.cookie = \`\${name}=\${value}; path=/\`;
          showCookies();
          alert('Cookie set! Check server console');
        }
        
        async function setCookieViaServer() {
          const name = document.getElementById('cookieName').value;
          const value = document.getElementById('cookieValue').value;
          const response = await fetch('/users/set-cookie', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, value })
          });
          const data = await response.json();
          alert(data.message);
          showCookies();
        }
        
        function showCookieProperties() {
          alert(\`Raw cookie string: "\${document.cookie}"\n\nCookies are key=value pairs separated by semicolons\nEach cookie has properties like path, domain, expires, httpOnly, secure\`);
        }
        
        showCookies();
      </script>
    </body>
    </html>
  `);
});

// Server-side cookie setting
router.post('/set-cookie', (req, res) => {
  const { name, value } = req.body;
  
  // Set cookie with options
  res.cookie(name, value, {
    maxAge: 900000, // 15 minutes (milliseconds)
    httpOnly: true, // Can't be accessed by JavaScript (security)
    path: '/'       // Available on all paths
  });
  
  res.json({
    message: `Cookie "${name}" set successfully!`,
    value: value,
    note: 'This cookie is httpOnly - JavaScript cannot read it!'
  });
});

// Get server-set cookies only
router.get('/server-cookies', (req, res) => {
  res.json({
    message: 'Cookies set by server (including httpOnly)',
    serverCookies: req.cookies,
    note: 'httpOnly cookies appear here but not in document.cookie'
  });
});

module.exports = router;