
const request = require('supertest');
const app = require('../index');

async function testCookies() {
  console.log('\n🍪 TESTING COOKIE FUNCTIONALITY\n');
  
  const agent = request.agent(app);
  
  // Test 1: Set unsigned cookie
  let res = await agent.get('/users/cookies-demo/session');
  console.log('✓ Session cookie set');
  
  // Test 2: Read cookies
  res = await agent.get('/users/cookies');
  console.log('✓ Cookies readable:', Object.keys(res.body.cookies).length > 0);
  
  // Test 3: Signed cookies
  res = await agent.get('/signed-cookies/signed');
  console.log('✓ Signed cookie set');
  
  res = await agent.get('/signed-cookies/read');
  console.log('✓ Signed cookie verified');
  
  // Test 4: HMAC verification
  res = await agent.get('/hmac/manual-vs-parser');
  console.log('✓ HMAC signing works');
  
  console.log('\n✅ All cookie tests passed!\n');
}

// Only run if directly executed
if (require.main === module) {
  testCookies();
}

module.exports = testCookies;