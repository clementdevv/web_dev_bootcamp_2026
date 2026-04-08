
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Error:', err));

// Routes (we'll add these)
const farmRoutes = require('./routes/farms');
const productRoutes = require('./routes/products');

app.use('/farms', farmRoutes);
app.use('/products', productRoutes);

// Home route
app.get('/', (req, res) => {
  res.redirect('/farms');
});

// Add after routes, before app.listen

// 404 Handler
// app.use((req, res) => {
//   res.status(404).send(`
//     <h1>404 - Page Not Found</h1>
//     <a href="/farms">Return to Farms</a>
//   `);
// });

// // Error Handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send(`
//     <h1>Something went wrong!</h1>
//     <p>${err.message}</p>
//     <a href="/farms">Go back to farms</a>
//   `);
// });

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});