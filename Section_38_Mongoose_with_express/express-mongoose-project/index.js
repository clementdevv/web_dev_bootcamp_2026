const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => console.log("Mongo connection Open!!!"))
    .catch(err => {
        console.log("OH NO, MONGO CONNECTION ERROR!!!");
        console.log(err);
    });

app.set('views', path.join(__dirname, 'views')); // FIXED
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // needed for POST/PUT form data


// PRODUCT INDEX
app.get('/products', async (req, res) => {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.render('products/index', { products, category: category || 'All' });
});


// PRODUCT DETAILS
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/show', { product });
});


// NEW PRODUCT FORM
const categories = ['fruit', 'vegetable', 'dairy']; // we'll reuse this

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
});


// CREATE PRODUCT
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
});


// EDIT PRODUCT FORM
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories });
});


// UPDATE PRODUCT
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
        runValidators: true,
        new: true
    });
    res.redirect(`/products/${product._id}`);
});


// DELETE PRODUCT
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
});

app.listen(3000, () => console.log('Server running on port 3000'));