const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON in POST requests
app.use(express.json());

// Sample products matching your frontend structure
const products = [
  { id: 1, title: 'T-shirt', category: 'Topwear', color: 'Beige', description: 'Soft cotton t-shirt', price: 20, stock_remaining: 10 },
  { id: 2, title: 'Jeans', category: 'Bottomwear', color: 'Dark Blue', description: 'Slim fit jeans', price: 50, stock_remaining: 5 },
  { id: 3, title: 'Sneakers', category: 'Footwear', color: 'White', description: 'Comfortable sneakers', price: 80, stock_remaining: 8 }
];

// Route to get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Route to handle purchases
app.post('/api/purchase/:id', (req, res) => {
  const id = Number(req.params.id);
  const quantity = req.body.quantity || 1;
  const product = products.find(p => p.id === id);

  if (!product) return res.status(404).json({ error: 'Product not found' });
  if (product.stock_remaining < quantity) return res.status(400).json({ error: 'Not enough stock' });

  product.stock_remaining -= quantity;
  res.json({ success: true });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});  
