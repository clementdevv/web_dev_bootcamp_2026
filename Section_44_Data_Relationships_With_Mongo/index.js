

require('dotenv').config();

const connectDB = require('./config/db');

const demoOneToFew = require('./demos/oneToFew');
const demoOneToMany = require('./demos/oneToMany');
const demoPopulateFeatures = require('./demos/populate');
const demoOneToBajillions = require('./demos/oneToBajillions');

async function run() {
  await connectDB();

  await demoOneToFew();
  await demoOneToMany();
  await demoPopulateFeatures();
  await demoOneToBajillions();

  console.log('\n✅ All demos completed');
  process.exit(0);
}

run();