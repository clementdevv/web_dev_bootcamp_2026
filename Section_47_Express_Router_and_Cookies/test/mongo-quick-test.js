
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

async function quickMongoTest() {
  console.log('\n🔍 QUICK MONGO DB RELATIONSHIPS TEST\n');
  
  const tests = [];
  
  // Test 1: Connection
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ 1. Database connected');
    tests.push({ name: 'Connection', passed: true });
  } catch (err) {
    console.log('❌ 1. Database connection failed:', err.message);
    tests.push({ name: 'Connection', passed: false });
    return;
  }
  
  // Test 2: Farm Model exists
  try {
    const Farm = require('../models/Farm');
    const farm = new Farm({ name: 'Test', location: 'Test' });
    console.log('✅ 2. Farm model loaded');
    tests.push({ name: 'Farm Model', passed: true });
  } catch (err) {
    console.log('❌ 2. Farm model error:', err.message);
    tests.push({ name: 'Farm Model', passed: false });
  }
  
  // Test 3: Product Model exists
  try {
    const Product = require('../models/Product');
    const product = new Product({ name: 'Test', price: 10, category: 'fruit', farm: new mongoose.Types.ObjectId() });
    console.log('✅ 3. Product model loaded');
    tests.push({ name: 'Product Model', passed: true });
  } catch (err) {
    console.log('❌ 3. Product model error:', err.message);
    tests.push({ name: 'Product Model', passed: false });
  }
  
  // Test 4: Create and relate data
  try {
    const Farm = require('../models/Farm');
    const Product = require('../models/Product');
    
    const testFarm = await Farm.create({
      name: `Test Farm ${Date.now()}`,
      location: 'Test Location'
    });
    
    const testProduct = await Product.create({
      name: 'Test Product',
      price: 9.99,
      category: 'fruit',
      farm: testFarm._id
    });
    
    testFarm.products.push(testProduct._id);
    await testFarm.save();
    
    const populated = await Farm.findById(testFarm._id).populate('products');
    
    if (populated.products.length === 1 && populated.products[0].name === 'Test Product') {
      console.log('✅ 4. Farm-Product relationship works');
      tests.push({ name: 'Relationship', passed: true });
    } else {
      throw new Error('Population failed');
    }
    
    // Cleanup
    await testFarm.remove();
    
  } catch (err) {
    console.log('❌ 4. Relationship error:', err.message);
    tests.push({ name: 'Relationship', passed: false });
  }
  
  // Summary
  console.log('\n📊 RESULTS:');
  const passed = tests.filter(t => t.passed).length;
  console.log(`${passed}/${tests.length} tests passed`);
  
  await mongoose.disconnect();
  return tests;
}

quickMongoTest();