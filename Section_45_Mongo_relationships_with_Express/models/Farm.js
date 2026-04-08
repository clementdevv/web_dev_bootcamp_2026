
const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Farm must have a name'],
    unique: true,
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Farm location is required']
  },
  description: {
    type: String,
    maxlength: [500, 'Description too long']
  },
  establishedYear: {
    type: Number,
    min: [1800, 'Year too early'],
    max: [new Date().getFullYear(), 'Year cannot be in future']
  },
  isOrganic: {
    type: Boolean,
    default: false
  },
  // One-to-Many: Farm has many Products (referenced)
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },  // Include virtuals when converting to JSON
  toObject: { virtuals: true }
});

// Virtual for counting products (not stored in DB)
farmSchema.virtual('productCount').get(function() {
  return this.products.length;
});

// Static method - find organic farms
farmSchema.statics.findOrganicFarms = function() {
  return this.find({ isOrganic: true });
};

// Instance method - add sample products
farmSchema.methods.addSampleProducts = async function() {
  const Product = mongoose.model('Product');
  const sampleProducts = [
    { name: 'Organic Apples', price: 4.99, category: 'fruit', farm: this._id },
    { name: 'Fresh Milk', price: 3.49, category: 'dairy', farm: this._id },
    { name: 'Free-range Eggs', price: 5.99, category: 'poultry', farm: this._id }
  ];
  
  const products = await Product.insertMany(sampleProducts);
  this.products.push(...products.map(p => p._id));
  await this.save();
  return products;
};



// // PRE-REMOVE MIDDLEWARE - Deletes all products when farm is deleted
// farmSchema.pre('remove', async function(next) {
//   console.log(`⚠️ Deleting farm: ${this.name} and all its products...`);
  
//   // Delete all products belonging to this farm
//   const Product = mongoose.model('Product');
//   const result = await Product.deleteMany({ farm: this._id });
  
//   console.log(`✅ Deleted ${result.deletedCount} products from farm ${this.name}`);
//   next();
// });

// // Alternative: POST middleware for logging
// farmSchema.post('remove', async function(doc) {
//   console.log(`✅ Farm "${doc.name}" and its products have been removed from database`);
// });

module.exports = mongoose.model('Farm', farmSchema);