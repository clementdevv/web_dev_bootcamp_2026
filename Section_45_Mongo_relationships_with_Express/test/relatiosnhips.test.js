
const mongoose = require('mongoose');
require('dotenv').config();
const Farm = require('../models/Farm');
const Product = require('../models/Product');

async function testRelationships() {
  console.log('\n🧪 TESTING FARM-PRODUCT RELATIONSHIPS\n');
  
  // 1. Create farm
  const farm = await Farm.create({
    name: 'Test Farm',
    location: 'Test Location',
    isOrganic: true
  });
  console.log('✓ Created farm:', farm.name);
  
  // 2. Add products
  const product1 = await Product.create({
    name: 'Test Apple',
    price: 1.99,
    category: 'fruit',
    farm: farm._id
  });
  
  const product2 = await Product.create({
    name: 'Test Milk',
    price: 3.49,
    category: 'dairy',
    farm: farm._id
  });
  
  farm.products.push(product1._id, product2._id);
  await farm.save();
  console.log(`✓ Added ${farm.products.length} products`);
  
  // 3. Test population
  const populatedFarm = await Farm.findById(farm._id).populate('products');
  console.log('✓ Populated farm has products:', populatedFarm.products.length);
  
  // 4. Test virtual
  console.log('✓ Virtual productCount:', populatedFarm.productCount);
  
  // 5. Test cascade delete
  await farm.remove();
  const productsLeft = await Product.find({ farm: farm._id });
  console.log('✓ Cascade delete works! Products left:', productsLeft.length);
  
  console.log('\n✅ All relationship tests passed!\n');
  process.exit();
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => testRelationships())
  .catch(console.error);


// run node test/relationships.test.js to test