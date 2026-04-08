
const express = require('express');
const router = express.Router();

// Session cookie (deletes when browser closes)
router.get('/session', (req, res) => {
  res.cookie('sessionId', Math.random().toString(36), {
    // No maxAge - session cookie
    httpOnly: true
  });
  res.json({
    message: 'Session cookie set',
    expires: 'When browser closes',
    cookie: req.cookies
  });
});

// Persistent cookie with expiration
router.get('/persistent', (req, res) => {
  res.cookie('rememberMe', 'true', {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true
  });
  res.json({
    message: 'Persistent cookie set for 30 days',
    maxAge: '30 days'
  });
});

// Cookie with specific path
router.get('/path-test', (req, res) => {
  res.cookie('pathSpecific', 'only-on-this-path', {
    path: '/users/cookies-demo',
    httpOnly: true
  });
  res.json({
    message: 'Cookie only available on /users/cookies-demo path',
    path: '/users/cookies-demo'
  });
});

// Secure cookie (HTTPS only - for production)
router.get('/secure', (req, res) => {
  res.cookie('secureCookie', 'value', {
    secure: true,  // Only sent over HTTPS
    httpOnly: true
  });
  res.json({
    message: 'Secure cookie set (will only work over HTTPS)',
    note: process.env.NODE_ENV === 'production' ? 'Works in production' : 'Will not work in development (no HTTPS)'
  });
});

// Domain cookie (subdomain access)
router.get('/domain', (req, res) => {
  res.cookie('domainCookie', 'shared-across-subdomains', {
    domain: '.localhost',  // Works on subdomains in production
    path: '/'
  });
  res.json({
    message: 'Domain cookie set',
    domain: '.localhost (for subdomain access)'
  });
});

// Multiple cookies at once
router.get('/multiple', (req, res) => {
  res.cookie('pref1', 'dark-mode', { maxAge: 86400000 });
  res.cookie('pref2', 'language-en', { maxAge: 86400000 });
  res.cookie('pref3', 'notifications-on', { maxAge: 86400000 });
  
  res.json({
    message: '3 cookies set simultaneously',
    cookies: ['pref1', 'pref2', 'pref3']
  });
});

// Clear/delete cookies
router.get('/clear', (req, res) => {
  res.clearCookie('sessionId');
  res.clearCookie('rememberMe');
  res.clearCookie('pathSpecific');
  res.clearCookie('pref1');
  res.clearCookie('pref2');
  res.clearCookie('pref3');
  
  res.json({
    message: 'Cookies cleared',
    remainingCookies: req.cookies
  });
});

// User preference demo (practical use)
router.get('/preferences/:theme', (req, res) => {
  const theme = req.params.theme;
  res.cookie('theme', theme, { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year
  
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Theme Preference</title>
      <style>
        body {
          background: ${theme === 'dark' ? '#333' : '#fff'};
          color: ${theme === 'dark' ? '#fff' : '#333'};
          font-family: Arial;
          padding: 20px;
          transition: all 0.3s;
        }
        button {
          padding: 10px 20px;
          margin: 5px;
          cursor: pointer;
        }
      </style>
    </head>
    <body>
      <h1>Theme: ${theme}</h1>
      <p>Your theme preference has been saved in a cookie!</p>
      <button onclick="location.href='/users/cookies-demo/preferences/light'">Light Mode</button>
      <button onclick="location.href='/users/cookies-demo/preferences/dark'">Dark Mode</button>
      <button onclick="location.href='/users/cookie-info'">Back to Explorer</button>
      
      <script>
        console.log('Theme cookie set to:', '${theme}');
      </script>
    </body>
    </html>
  `);
});

module.exports = router;