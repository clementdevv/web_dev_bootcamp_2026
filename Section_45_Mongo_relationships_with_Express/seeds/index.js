
// const mongoose = require('mongoose');
// require('dotenv').config();
// const Farm = require('../models/Farm');
// const Product = require('../models/Product');

// const seedData = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     await Farm.deleteMany();
//     await Product.deleteMany();
    
//     const farms = await Farm.insertMany([
//       { name: 'Sunny Meadows', location: 'Vermont', isOrganic: true, establishedYear: 1985 },
//       { name: 'Green Valley Ranch', location: 'California', isOrganic: false, establishedYear: 1992 },
//       { name: 'Happy Hen Farm', location: 'Iowa', isOrganic: true, establishedYear: 2001 }
//     ]);
    
//     for (let farm of farms) {
//       await farm.addSampleProducts();
//     }
    
//     console.log('✅ Database seeded!');
//     process.exit();
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

// seedData();