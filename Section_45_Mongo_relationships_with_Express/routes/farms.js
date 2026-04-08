
const express = require('express');
const router = express.Router();
const Farm = require('../models/Farm');

// INDEX - Show all farms
router.get('/', async (req, res) => {
  try {
    const farms = await Farm.find().sort('-createdAt');
    res.render('farms/index', { farms, title: 'All Farms' });
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

// NEW - Show form to create farm
router.get('/new', (req, res) => {
  res.render('farms/new', { title: 'Add New Farm' });
});

// CREATE - Add new farm to database
router.post('/', async (req, res) => {
  try {
    const farm = new Farm(req.body);
    await farm.save();
    console.log(`✅ Created farm: ${farm.name}`);
    res.redirect(`/farms/${farm._id}`);
  } catch (err) {
    console.error(err);
    res.redirect('/farms/new');
  }
});

// SHOW - Display specific farm with its products
router.get('/:id', async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id)
      .populate('products')  // Populate all products!
      .exec();
    
    if (!farm) {
      return res.redirect('/farms');
    }
    
    res.render('farms/show', { farm, title: farm.name });
  } catch (err) {
    console.error(err);
    res.redirect('/farms');
  }
});

// EDIT - Show edit form
router.get('/:id/edit', async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);
    res.render('farms/edit', { farm, title: 'Edit Farm' });
  } catch (err) {
    res.redirect('/farms');
  }
});

// UPDATE - Update farm
router.put('/:id', async (req, res) => {
  try {
    const farm = await Farm.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.redirect(`/farms/${farm._id}`);
  } catch (err) {
    res.redirect(`/farms/${req.params.id}/edit`);
  }
});





// // DELETE - Remove farm and all its products (using middleware)
// router.delete('/:id', async (req, res) => {
//   try {
//     const farm = await Farm.findById(req.params.id);
    
//     if (!farm) {
//       return res.redirect('/farms');
//     }
    
//     // This triggers the pre('remove') middleware
//     await farm.remove();
    
//     console.log(`🗑️ Farm deleted: ${farm.name}`);
//     res.redirect('/farms');
//   } catch (err) {
//     console.error(err);
//     res.redirect(`/farms/${req.params.id}`);
//   }
// });


module.exports = router;