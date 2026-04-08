
// General logging middleware
const logger = (req, res, next) => {
  console.log(`📝 ${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};

// Router-specific logger
const routerLogger = (routerName) => {
  return (req, res, next) => {
    console.log(`🔷 [${routerName}] Processing ${req.method} ${req.path}`);
    next();
  };
};

// Route timing middleware
const timingMiddleware = (req, res, next) => {
  req.startTime = Date.now();
  next();
};

// Add to response to see timing
const addTimingHeader = (req, res, next) => {
  const oldJson = res.json;
  res.json = function(data) {
    const duration = Date.now() - req.startTime;
    data.responseTime = `${duration}ms`;
    oldJson.call(this, data);
  };
  next();
};

module.exports = { logger, routerLogger, timingMiddleware, addTimingHeader };