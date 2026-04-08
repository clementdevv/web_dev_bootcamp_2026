
// test/express-api-test.js
const request = require('supertest');
const express = require('express');

// Import your app (you'll need to export it from index.js)
// For testing, modify your index.js to export app:
// module.exports = app;

const app = require('../index');

describe('Express Router & Cookies Tests', () => {
  let agent;
  
  beforeAll(() => {
    agent = request.agent(app);
  });
  
  describe('Router Organization', () => {
    test('GET /users/profile should return user data', async () => {
      const res = await agent.get('/users/profile');
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toContain('User profile');
    });
    
    test('GET /products should return products array', async () => {
      const res = await agent.get('/products');
      expect(res.statusCode).toBe(200);
      expect(res.body.products).toBeInstanceOf(Array);
    });
    
    test('API versioning works', async () => {
      const v1 = await agent.get('/api/v1/users');
      const v2 = await agent.get('/api/v2/users');
      
      expect(v1.body.version).toBe('v1');
      expect(v2.body.version).toBe('v2');
      expect(v2.body.data).toBeDefined();
    });
  });
  
  describe('Cookie Operations', () => {
    test('Can set and read unsigned cookies', async () => {
      const setRes = await agent.get('/users/cookies-demo/session');
      expect(setRes.headers['set-cookie']).toBeDefined();
      
      const getRes = await agent.get('/users/cookies');
      expect(getRes.body.cookies).toBeDefined();
    });
    
    test('Can set multiple cookies at once', async () => {
      const res = await agent.get('/users/cookies-demo/multiple');
      expect(res.headers['set-cookie']).toHaveLength(3);
    });
    
    test('Can clear cookies', async () => {
      await agent.get('/users/cookies-demo/multiple');
      const clearRes = await agent.get('/users/cookies-demo/clear');
      expect(clearRes.body.message).toContain('Cookies cleared');
    });
  });
  
  describe('Signed Cookies', () => {
    test('Can set signed cookies', async () => {
      const res = await agent.get('/signed-cookies/signed');
      const cookieHeader = res.headers['set-cookie'][0];
      expect(cookieHeader).toContain('signed');
    });
    
    test('Signed cookies are verified on read', async () => {
      await agent.get('/signed-cookies/signed');
      const readRes = await agent.get('/signed-cookies/read');
      expect(readRes.body.signedCookies).toBeDefined();
    });
    
    test('User session with signed cookies works', async () => {
      await agent.post('/signed-cookies/login');
      const profileRes = await agent.get('/signed-cookies/profile');
      expect(profileRes.body.user).toBeDefined();
      
      await agent.post('/signed-cookies/logout');
      const loggedOutRes = await agent.get('/signed-cookies/profile');
      expect(loggedOutRes.statusCode).toBe(401);
    });
  });
  
  describe('Middleware Chain', () => {
    test('Authentication middleware blocks unauthorized', async () => {
      const res = await agent.get('/admin/dashboard');
      expect(res.statusCode).toBe(401);
    });
    
    test('Authentication middleware allows valid token', async () => {
      const res = await agent
        .get('/admin/dashboard')
        .set('Authorization', 'secret123');
      expect(res.statusCode).toBe(200);
      expect(res.body.admin).toBeDefined();
    });
    
    test('Rate limiting works', async () => {
      const requests = [];
      for (let i = 0; i < 12; i++) {
        requests.push(agent.get('/api/v1/users'));
      }
      
      const responses = await Promise.all(requests);
      const rateLimited = responses.some(res => res.statusCode === 429);
      expect(rateLimited).toBe(true);
    });
    
    test('Timing middleware adds response time', async () => {
      const res = await agent.get('/admin/info');
      expect(res.body.responseTime).toBeDefined();
      expect(res.body.responseTime).toMatch(/^\d+ms$/);
    });
  });
  
  describe('Cookie Parser Features', () => {
    test('Raw vs parsed cookies', async () => {
      await agent.get('/users/cookies-demo/session');
      
      const rawRes = await agent.get('/users/cookie-parser-demo/raw');
      const parsedRes = await agent.get('/users/cookie-parser-demo/parsed');
      
      expect(rawRes.body['cookie-header']).toBeDefined();
      expect(parsedRes.body.parsedCookies).toBeDefined();
    });
    
    test('Complex data in cookies', async () => {
      const res = await agent.get('/users/cookie-parser-demo/complex');
      expect(res.body.warning).toContain('always strings');
    });
  });
  
  describe('HMAC Implementation', () => {
    test('Manual signing works', async () => {
      const res = await agent.get('/hmac/manual-vs-parser');
      expect(res.body.manuallyVerified).toBe('✅ Valid');
    });
    
    test('Performance comparison', async () => {
      const res = await agent.get('/hmac/performance');
      expect(res.body.overhead).toBeDefined();
      expect(parseFloat(res.body.overhead)).toBeLessThan(50); // Less than 50% overhead
    });
  });
});