// test/inspect-database.js
const mongoose = require('mongoose');
require('dotenv').config();

async function inspectDatabase() {
  console.log('\n🔍 DATABASE INSPECTION REPORT\n');
  console.log('=' .repeat(50));
  
  await mongoose.connect(process.env.MONGODB_URI);
  
  // Get all collections
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log('\n📚 Collections:');
  collections.forEach(col => console.log(`   - ${col.name}`));
  
  // Check Farm collection
  const Farm = require('../models/Farm');
  const farms = await Farm.find().populate('products');
  console.log(`\n🌾 Farms (${farms.length}):`);
  farms.forEach(farm => {
    console.log(`   - ${farm.name} (${farm.location})`);
    console.log(`     Products: ${farm.products.length}`);
    console.log(`     Organic: ${farm.isOrganic ? 'Yes' : 'No'}`);
  });
  
  // Check Product collection
  const Product = require('../models/Product');
  const products = await Product.find().populate('farm');
  console.log(`\n📦 Products (${products.length}):`);
  products.forEach(product => {
    console.log(`   - ${product.name} ($${product.price})`);
    console.log(`     Farm: ${product.farm?.name || 'Orphaned!'}`);
    console.log(`     Category: ${product.category}`);
  });
  
  // Check for orphaned products (referencing non-existent farms)
  const orphaned = products.filter(p => !p.farm);
  if (orphaned.length > 0) {
    console.log(`\n⚠️ WARNING: ${orphaned.length} orphaned products found!`);
  } else {
    console.log('\n✅ No orphaned products - referential integrity maintained');
  }
  
  // Check indexes
  console.log('\n📊 Indexes:');
  const farmIndexes = await Farm.collection.indexes();
  const productIndexes = await Product.collection.indexes();
  
  console.log('   Farm indexes:');
  farmIndexes.forEach(idx => console.log(`     - ${Object.keys(idx.key).join(', ')}`));
  console.log('   Product indexes:');
  productIndexes.forEach(idx => console.log(`     - ${Object.keys(idx.key).join(', ')}`));
  
  await mongoose.disconnect();
  console.log('\n' + '=' .repeat(50));
  console.log('✅ Database inspection complete\n');
}

inspectDatabase().catch(console.error);