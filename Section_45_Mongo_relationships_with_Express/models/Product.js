
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name required'],
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative'],
    get: v => (v / 100).toFixed(2),  // Store in cents, display in dollars
    set: v => v * 100
  },
  category: {
    type: String,
    enum: ['fruit', 'vegetable', 'dairy', 'meat', 'grain', 'poultry'],
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  },
  // Reference back to Farm (the "many" side of one-to-many)
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farm',
    required: true,
    index: true  // Index for faster queries
  },
  harvestDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { getters: true }  // Apply getters when converting to JSON
});

// Instance method - mark as out of stock
productSchema.methods.markAsOutOfStock = async function() {
  this.inStock = false;
  await this.save();
  return this;
};

// Static method - find products by category
productSchema.statics.findByCategory = function(category) {
  return this.find({ category, inStock: true });
};

module.exports = mongoose.model('Product', productSchema);