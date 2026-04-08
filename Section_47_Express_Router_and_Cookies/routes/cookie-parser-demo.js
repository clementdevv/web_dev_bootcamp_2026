
    const express = require('express');
const router = express.Router();

// Raw cookie header (without parser)
router.get('/raw', (req, res) => {
  res.json({
    message: 'Raw Cookie Header',
    'cookie-header': req.headers.cookie || '(no cookies)',
    note: 'Without cookie-parser, you would need to parse this string manually'
  });
});

// Parsed cookies (with cookie-parser)
router.get('/parsed', (req, res) => {
  res.json({
    message: 'Parsed Cookies (thanks to cookie-parser)',
    parsedCookies: req.cookies,
    note: 'cookie-parser automatically converts the header string to an object'
  });
});

// Complex cookie parsing
router.get('/complex', (req, res) => {
  // Set multiple cookies with different types
  res.cookie('number', 123);
  res.cookie('boolean', true);
  res.cookie('object', { foo: 'bar' });
  res.cookie('array', [1, 2, 3]);
  
  res.json({
    message: 'Cookie values are always strings!',
    warning: 'Numbers, booleans, objects become strings',
    tip: 'Use JSON.parse() and JSON.stringify() for complex data',
    example: `
      // Setting object cookie:
      res.cookie('user', JSON.stringify({ name: 'John', age: 30 }));
      
      // Reading object cookie:
      const user = JSON.parse(req.cookies.user);
    `
  });
});

// Cookie options demo
router.get('/options', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Cookie Options Explorer</title>
      <style>
        body { font-family: Arial; padding: 20px; max-width: 900px; margin: 0 auto; }
        .option { background: #f9f9f9; margin: 15px 0; padding: 15px; border-left: 4px solid #007bff; }
        code { background: #eee; padding: 2px 5px; border-radius: 3px; }
        pre { background: #eee; padding: 10px; overflow-x: auto; }
      </style>
    </head>
    <body>
      <h1>🍪 Cookie Options Reference</h1>
      
      <div class="option">
        <h3>maxAge</h3>
        <p>Cookie lifetime in milliseconds</p>
        <code>res.cookie('name', 'value', { maxAge: 900000 }); // 15 minutes</code>
      </div>
      
      <div class="option">
        <h3>expires</h3>
        <p>Specific expiration date</p>
        <code>res.cookie('name', 'value', { expires: new Date('2025-12-31') });</code>
      </div>
      
      <div class="option">
        <h3>httpOnly</h3>
        <p>Prevents JavaScript access (security)</p>
        <code>res.cookie('name', 'value', { httpOnly: true });</code>
      </div>
      
      <div class="option">
        <h3>secure</h3>
        <p>Only sent over HTTPS</p>
        <code>res.cookie('name', 'value', { secure: true });</code>
      </div>
      
      <div class="option">
        <h3>sameSite</h3>
        <p>CSRF protection</p>
        <code>res.cookie('name', 'value', { sameSite: 'strict' }); // 'lax' or 'none'</code>
      </div>
      
      <div class="option">
        <h3>domain</h3>
        <p>Specify domain for cookie</p>
        <code>res.cookie('name', 'value', { domain: '.example.com' });</code>
      </div>
      
      <div class="option">
        <h3>path</h3>
        <p>Specify URL path</p>
        <code>res.cookie('name', 'value', { path: '/admin' });</code>
      </div>
      
      <h2>Practical Example: Session Management</h2>
      <pre>
// Login endpoint
app.post('/login', (req, res) => {
  // Authenticate user...
  
  res.cookie('sessionId', 'unique-session-id', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });
  
  res.json({ message: 'Logged in!' });
});

// Protected route
app.get('/profile', (req, res) => {
  const sessionId = req.cookies.sessionId;
  if (!sessionId) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  // Fetch user data...
  res.json({ user: 'John' });
});
      </pre>
      
      <button onclick="location.href='/users/cookie-info'">Back to Explorer</button>
    </body>
    </html>
  `);
});

module.exports = router;