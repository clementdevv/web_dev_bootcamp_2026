
const express = require('express');
const router = express.Router();

// Set unsigned cookie (can be tampered)
router.get('/unsigned', (req, res) => {
  res.cookie('userId', '12345', { httpOnly: true });
  res.json({
    message: 'Unsigned cookie set',
    cookie: req.cookies,
    signedCookies: req.signedCookies,
    warning: 'This cookie can be modified by the client!'
  });
});

// Set signed cookie (tamper-proof)
router.get('/signed', (req, res) => {
  res.cookie('userId', '12345', { 
    httpOnly: true,
    signed: true  // This enables signing
  });
  
  res.json({
    message: 'Signed cookie set',
    note: 'Cookie is signed with server secret',
    access: 'Use req.signedCookies to read signed cookies',
    demo: 'Try modifying this cookie in browser dev tools!'
  });
});

// Read signed cookies
router.get('/read', (req, res) => {
  res.json({
    unsignedCookies: req.cookies,
    signedCookies: req.signedCookies,  // Only shows VALID signed cookies
    difference: 'req.cookies = unsigned + signed (as strings)',
    difference2: 'req.signedCookies = ONLY verified signed cookies (as parsed values)'
  });
});

// Tamper detection demo
router.get('/tamper-demo', (req, res) => {
  // Set a signed cookie
  res.cookie('balance', '1000', { signed: true, httpOnly: true });
  
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Cookie Tamper Detection</title>
      <style>
        body { font-family: Arial; padding: 20px; max-width: 800px; margin: 0 auto; }
        .demo { background: #f0f0f0; padding: 20px; margin: 20px 0; border-radius: 5px; }
        button { padding: 10px; margin: 5px; cursor: pointer; }
        pre { background: #fff; padding: 10px; overflow-x: auto; }
        .success { color: green; }
        .error { color: red; }
      </style>
    </head>
    <body>
      <h1>🔐 Signed Cookie Tamper Detection</h1>
      
      <div class="demo">
        <h3>Step 1: Set signed cookie</h3>
        <button onclick="setCookie()">Set Balance Cookie</button>
      </div>
      
      <div class="demo">
        <h3>Step 2: Try to tamper</h3>
        <button onclick="tamperCookie()">Tamper Cookie (Client-side)</button>
        <p id="tamper-result"></p>
      </div>
      
      <div class="demo">
        <h3>Step 3: Verify cookie</h3>
        <button onclick="checkCookie()">Check Cookie Validity</button>
        <pre id="result"></pre>
      </div>
      
      <script>
        async function setCookie() {
          const response = await fetch('/signed-cookies/signed');
          const data = await response.json();
          alert('Cookie set! Check browser dev tools → Application → Cookies');
          checkCookie();
        }
        
        async function tamperCookie() {
          // Get current cookie
          const cookies = document.cookie.split(';');
          let balanceCookie = cookies.find(c => c.trim().startsWith('balance='));
          
          if (balanceCookie) {
            // Tamper with the value
            const newValue = 'balance=999999';
            document.cookie = newValue + '; path=/';
            document.getElementById('tamper-result').innerHTML = 
              '<span class="error">⚠️ Cookie tampered! Server will detect this.</span>';
            checkCookie();
          } else {
            alert('No balance cookie found. Set it first!');
          }
        }
        
        async function checkCookie() {
          const response = await fetch('/signed-cookies/read');
          const data = await response.json();
          
          document.getElementById('result').innerHTML = JSON.stringify(data, null, 2);
          
          if (data.signedCookies.balance) {
            document.getElementById('tamper-result').innerHTML += 
              '<br><span class="success">✅ Cookie is valid! Balance: ' + 
              data.signedCookies.balance + '</span>';
          } else if (data.unsignedCookies.balance) {
            document.getElementById('tamper-result').innerHTML += 
              '<br><span class="error">❌ Cookie tampered! Original signature invalid.</span>';
          }
        }
        
        checkCookie();
      </script>
    </body>
    </html>
  `);
});

// Practical: User session with signed cookies
router.post('/login', (req, res) => {
  // In real app, verify credentials
  const user = { id: 1, username: 'john_doe', role: 'user' };
  
  // Store user data in signed cookie
  res.cookie('session', JSON.stringify(user), {
    httpOnly: true,
    signed: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'strict'
  });
  
  res.json({ message: 'Logged in!', user });
});

router.get('/profile', (req, res) => {
  const sessionData = req.signedCookies.session;
  
  if (!sessionData) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  try {
    const user = JSON.parse(sessionData);
    res.json({ 
      message: 'Welcome to your profile!',
      user: user,
      note: 'This session cookie is signed - cannot be tampered'
    });
  } catch (err) {
    res.status(400).json({ error: 'Invalid session data' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('session');
  res.json({ message: 'Logged out!' });
});

module.exports = router;