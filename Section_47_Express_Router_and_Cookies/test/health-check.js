// test/health-check.js
const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();

async function healthCheck() {
  console.log('\n🏥 SYSTEM HEALTH CHECK\n');
  console.log('=' .repeat(50));
  
  const results = {
    server: false,
    database: false,
    routes: [],
    cookies: false
  };
  
  // 1. Server Check
  try {
    const serverCheck = await new Promise((resolve) => {
      const req = http.get('http://localhost:3000', (res) => {
        resolve(res.statusCode === 200);
      });
      req.on('error', () => resolve(false));
      req.setTimeout(3000, () => resolve(false));
    });
    
    results.server = serverCheck;
    console.log(`\n🖥️  Server: ${serverCheck ? '✅ Running' : '❌ Not responding'}`);
  } catch (err) {
    console.log('\n🖥️  Server: ❌ Error');
  }
  
  // 2. Database Check
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
    results.database = true;
    console.log(`💾 Database: ✅ Connected`);
    await mongoose.disconnect();
  } catch (err) {
    console.log(`💾 Database: ❌ ${err.message}`);
  }
  
  // 3. Route Checks
  const routesToCheck = [
    '/users/profile',
    '/products',
    '/api/v1/users',
    '/signed-cookies/read'
  ];
  
  console.log('\n🔗 Routes:');
  for (const route of routesToCheck) {
    try {
      const check = await new Promise((resolve) => {
        const req = http.get(`http://localhost:3000${route}`, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            try {
              const json = JSON.parse(data);
              resolve(res.statusCode === 200 && json);
            } catch {
              resolve(res.statusCode === 200);
            }
          });
        });
        req.on('error', () => resolve(false));
        req.setTimeout(3000, () => resolve(false));
      });
      
      results.routes.push({ route, working: check });
      const status = check ? '✅' : '❌';
      console.log(`   ${status} ${route}`);
    } catch (err) {
      console.log(`   ❌ ${route} (error)`);
    }
  }
  
  // 4. Summary
  console.log('\n📊 SUMMARY:');
  const allPassed = results.server && results.database && 
    results.routes.every(r => r.working);
  
  if (allPassed) {
    console.log('✅ SYSTEM HEALTHY - All tests passed!');
  } else {
    console.log('⚠️ ISSUES DETECTED:');
    if (!results.server) console.log('   - Server not running (run: nodemon index.js)');
    if (!results.database) console.log('   - Database not connected (check MongoDB service)');
    results.routes.filter(r => !r.working).forEach(r => {
      console.log(`   - Route ${r.route} not responding`);
    });
  }
  
  console.log('\n' + '=' .repeat(50) + '\n');
}

healthCheck();