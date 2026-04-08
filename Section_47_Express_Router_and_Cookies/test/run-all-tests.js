#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('\n🧪 RUNNING COMPLETE TEST SUITE\n');
console.log('=' .repeat(60));

const tests = [
  {
    name: 'MongoDB Connection',
    file: 'test/mongo-quick-test.js',
    required: true
  },
  {
    name: 'Farm-Product Relationships',
    file: 'test/mongo-full-test.js',
    required: true
  },
  {
    name: 'Database Inspection',
    file: 'test/inspect-database.js',
    required: false
  },
  {
    name: 'Health Check',
    file: 'test/health-check.js',
    required: true
  }
];

const results = [];

for (const test of tests) {
  console.log(`\n📝 Running: ${test.name}`);
  console.log('-'.repeat(40));
  
  try {
    execSync(`node ${test.file}`, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    results.push({ name: test.name, passed: true });
    console.log(`✅ ${test.name} PASSED`);
  } catch (error) {
    results.push({ name: test.name, passed: false });
    console.log(`❌ ${test.name} FAILED`);
    
    if (test.required) {
      console.log(`\n⚠️ Required test failed! Fix issues before continuing.`);
      process.exit(1);
    }
  }
}

// Final summary
console.log('\n' + '=' .repeat(60));
console.log('📊 FINAL TEST SUMMARY');
console.log('=' .repeat(60));

results.forEach(result => {
  const symbol = result.passed ? '✅' : '❌';
  console.log(`${symbol} ${result.name}`);
});

const passed = results.filter(r => r.passed).length;
const total = results.length;

console.log(`\n${passed}/${total} tests passed`);

if (passed === total) {
  console.log('\n🎉 ALL TESTS PASSED! System is fully operational.\n');
  console.log('Next steps:');
  console.log('1. Visit http://localhost:3000/test-dashboard.html for interactive testing');
  console.log('2. Run `npm test` for automated API tests');
  console.log('3. Check browser dev tools for cookie inspection');
} else {
  console.log('\n⚠️ Some tests failed. Check the output above for details.\n');
}

// Check if server is running
try {
  execSync('curl -s http://localhost:3000 > /dev/null');
  console.log('✅ Server is running');
} catch {
  console.log('⚠️ Server is NOT running. Start with: nodemon index.js');
}