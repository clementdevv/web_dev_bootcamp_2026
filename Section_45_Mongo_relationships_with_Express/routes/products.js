
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Farm = require('../models/Farm');

// NEW - Show form to add product to specific farm
router.get('/farms/:farmId/products/new', async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.farmId);
    res.render('products/new', { farm, title: `Add Product to ${farm.name}` });
  } catch (err) {
    res.redirect('/farms');
  }
});

// CREATE - Add product to farm
router.post('/farms/:farmId/products', async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.farmId);
    const product = new Product({
      ...req.body,
      farm: farm._id
    });
    
    await product.save();
    
    // Add product reference to farm
    farm.products.push(product._id);
    await farm.save();
    
    console.log(`✅ Added ${product.name} to ${farm.name}`);
    res.redirect(`/farms/${farm._id}`);
  } catch (err) {
    console.error(err);
    res.redirect(`/farms/${req.params.farmId}/products/new`);
  }
});

// EDIT product
router.get('/:id/edit', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('farm');
    res.render('products/edit', { product, title: 'Edit Product' });
  } catch (err) {
    res.redirect('/farms');
  }
});

// UPDATE product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.redirect(`/farms/${product.farm}`);
  } catch (err) {
    res.redirect(`/products/${req.params.id}/edit`);
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    // Remove product reference from farm
    await Farm.findByIdAndUpdate(product.farm, {
      $pull: { products: product._id }
    });
    console.log(`✅ Deleted product: ${product.name}`);
    res.redirect(`/farms/${product.farm}`);
  } catch (err) {
    console.error(err);
    res.redirect('/farms');
  }
});

module.exports = router;