
const express = require('express');
const router = express.Router();
const { requireAuth, requireAdmin } = require('../middleware/auth');
const { routerLogger, timingMiddleware, addTimingHeader } = require('../middleware/logger');

// Apply middleware to ALL routes in this router
router.use(routerLogger('ADMIN'));
router.use(timingMiddleware);
router.use(addTimingHeader);

// Public admin route (no auth)
router.get('/info', (req, res) => {
  res.json({
    message: 'Admin system info',
    version: '1.0.0',
    endpoints: ['/dashboard', '/users', '/settings']
  });
});

// Protected admin routes
router.use(requireAuth); // All routes below this require auth
router.use(requireAdmin); // And require admin role

router.get('/dashboard', (req, res) => {
  res.json({
    message: 'Admin Dashboard',
    admin: req.user,
    stats: {
      users: 1250,
      products: 342,
      revenue: '$45,231'
    }
  });
});

router.get('/users', (req, res) => {
  res.json({
    message: 'User management',
    users: [
      { id: 1, name: 'Alice', role: 'user' },
      { id: 2, name: 'Bob', role: 'admin' }
    ]
  });
});

module.exports = router;