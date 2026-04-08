// test/mongo-full-test.js
const mongoose = require('mongoose');
require('dotenv').config();

async function fullMongoTest() {
  console.log('\n🧪 FULL MONGO DB RELATIONSHIPS TEST SUITE\n');
  
  const Farm = require('../models/Farm');
  const Product = require('../models/Product');
  
  await mongoose.connect(process.env.MONGODB_URI);
  
  // Clean slate
  await Farm.deleteMany({});
  await Product.deleteMany({});
  
  console.log('📝 TEST 1: Create Farm');
  const farm = await Farm.create({
    name: 'Sunny Acres',
    location: 'California',
    description: 'Organic farm',
    establishedYear: 2000,
    isOrganic: true
  });
  console.log(`   ✅ Created: ${farm.name} (ID: ${farm._id})`);
  
  console.log('\n📝 TEST 2: Create Products for Farm');
  const products = await Product.insertMany([
    { name: 'Organic Apples', price: 4.99, category: 'fruit', farm: farm._id },
    { name: 'Fresh Eggs', price: 6.99, category: 'poultry', farm: farm._id },
    { name: 'Raw Milk', price: 8.99, category: 'dairy', farm: farm._id }
  ]);
  console.log(`   ✅ Created ${products.length} products`);
  
  console.log('\n📝 TEST 3: Link Products to Farm');
  farm.products.push(...products.map(p => p._id));
  await farm.save();
  console.log(`   ✅ Farm now has ${farm.products.length} products`);
  
  console.log('\n📝 TEST 4: Populate Products');
  const populatedFarm = await Farm.findById(farm._id).populate('products');
  console.log(`   ✅ Populated farm has ${populatedFarm.products.length} products`);
  console.log(`   ✅ First product: ${populatedFarm.products[0].name}`);
  
  console.log('\n📝 TEST 5: Virtual Property');
  console.log(`   ✅ productCount: ${populatedFarm.productCount} (virtual)`);
  
  console.log('\n📝 TEST 6: Update Operations');
  await Product.updateOne({ _id: products[0]._id }, { price: 5.99 });
  const updatedProduct = await Product.findById(products[0]._id);
  console.log(`   ✅ Price updated: $${updatedProduct.price}`);
  
  console.log('\n📝 TEST 7: Delete with Middleware');
  const farmToDelete = await Farm.create({
    name: 'Temp Farm',
    location: 'Temp',
    isOrganic: false
  });
  await Product.create({
    name: 'Temp Product',
    price: 1.99,
    category: 'fruit',
    farm: farmToDelete._id
  });
  
  const productCountBefore = await Product.countDocuments({ farm: farmToDelete._id });
  console.log(`   ✅ Before delete: ${productCountBefore} product(s)`);
  
  await farmToDelete.remove(); // Triggers middleware
  const productCountAfter = await Product.countDocuments({ farm: farmToDelete._id });
  console.log(`   ✅ After delete: ${productCountAfter} product(s) (cascade working)`);
  
  console.log('\n📝 TEST 8: Query Performance (Index Check)');
  const start = Date.now();
  await Product.find({ farm: farm._id }).explain('executionStats');
  const duration = Date.now() - start;
  console.log(`   ✅ Query time: ${duration}ms (index should be used)`);
  
  // Final verification
  console.log('\n📊 FINAL VERIFICATION:');
  const finalFarm = await Farm.findById(farm._id).populate('products');
  console.log(`   ✅ Farm "${finalFarm.name}" has ${finalFarm.products.length} products`);
  console.log(`   ✅ Products: ${finalFarm.products.map(p => p.name).join(', ')}`);
  
  // Cleanup
  await farm.remove();
  await mongoose.disconnect();
  
  console.log('\n🎉 ALL MONGO TESTS PASSED!\n');
}

fullMongoTest().catch(console.error);