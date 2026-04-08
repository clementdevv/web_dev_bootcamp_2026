
const express = require('express');
const router = express.Router();
const { rateLimit } = require('../middleware/auth');

// Nested routers (router of routers!)
const v1Router = express.Router();
const v2Router = express.Router();

// Rate limiting for API
router.use(rateLimit(10, 60000)); // 10 requests per minute

// Version 1 routes
v1Router.get('/users', (req, res) => {
  res.json({ version: 'v1', users: ['Alice', 'Bob'] });
});

v1Router.get('/products', (req, res) => {
  res.json({ version: 'v1', products: ['Laptop', 'Mouse'] });
});

// Version 2 routes (different response format)
v2Router.get('/users', (req, res) => {
  res.json({
    version: 'v2',
    data: {
      users: [
        { name: 'Alice', email: 'alice@example.com' },
        { name: 'Bob', email: 'bob@example.com' }
      ]
    },
    meta: { total: 2 }
  });
});

// Mount version routers
router.use('/v1', v1Router);
router.use('/v2', v2Router);

// Dynamic router mounting
router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

module.exports = router;