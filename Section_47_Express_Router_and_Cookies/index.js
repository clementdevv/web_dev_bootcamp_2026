
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // We'll explore this in detail
app.use(express.static('public'));

// Add after other route imports
const cookieParser = require('cookie-parser');

// cookie-parser with options
app.use(cookieParser()); // Basic usage
// app.use(cookieParser('your-secret-key')); // For signed cookies (next section)
// app.use(cookieParser('secret', { 
//   maxAge: 900000,
//   httpOnly: true 
// }));

// Add middleware to log cookies
app.use((req, res, next) => {
  if (Object.keys(req.cookies).length > 0) {
    console.log('🍪 Cookies received:', req.cookies);
  }
  next();
});


const cookieParserDemo = require('./routes/cookie-parser-demo');
app.use('/users/cookie-parser-demo', cookieParserDemo);


const COOKIE_SECRET = 'my-super-secret-key-change-in-production';
app.use(cookieParser(COOKIE_SECRET)); // Enable signed cookies

const signedCookieRoutes = require('./routes/signed-cookies');
app.use('/signed-cookies', signedCookieRoutes);

const hmacRoutes = require('./routes/hmac-demo');
app.use('/hmac', hmacRoutes);

// Import routes (we'll create these)
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');

// Use routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

// Home route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Express Router + Cookies Demo</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <h1>🎯 Express Router & Cookies Demo</h1>
      <div class="links">
        <a href="/users/profile">User Profile</a>
        <a href="/products">Products</a>
        <a href="/admin/dashboard">Admin Dashboard</a>
        <a href="/api/data">API Data</a>
      </div>
      <div id="cookie-info"></div>
      <script>
        // Display cookies on client side
        document.getElementById('cookie-info').innerHTML = 
          '<h3>Your Cookies:</h3><pre>' + document.cookie + '</pre>';
      </script>
    </body>
    </html>
  `);
});



app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Try these routes:`);
  console.log(`   - /users/profile`);
  console.log(`   - /products`);
  console.log(`   - /admin/dashboard`);
  console.log(`   - /api/data`);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;