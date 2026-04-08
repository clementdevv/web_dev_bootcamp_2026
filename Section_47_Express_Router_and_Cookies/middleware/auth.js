
// Authentication middleware
const requireAuth = (req, res, next) => {
  // Check for auth token in headers or cookies
  const authToken = req.headers['authorization'] || req.cookies?.authToken;
  
  if (!authToken) {
    return res.status(401).json({
      error: 'Authentication required',
      message: 'Please provide an authorization token'
    });
  }
  
  // Simple token validation (in real app, verify JWT)
  if (authToken === 'secret123') {
    req.user = { id: 1, name: 'John Doe', role: 'user' };
    next();
  } else {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Role-based middleware
const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin access required' });
  }
};

// Rate limiting per router
const rateLimit = (maxRequests, windowMs) => {
  const requests = new Map();
  
  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    
    if (!requests.has(ip)) {
      requests.set(ip, []);
    }
    
    const timestamps = requests.get(ip).filter(t => now - t < windowMs);
    timestamps.push(now);
    requests.set(ip, timestamps);
    
    if (timestamps.length > maxRequests) {
      return res.status(429).json({ error: 'Too many requests' });
    }
    
    next();
  };
};

module.exports = { requireAuth, requireAdmin, rateLimit };