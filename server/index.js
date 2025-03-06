const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Sample product data with updated descriptions
const products = [
  {
    id: 1,
    name: 'Smartphone',
    price: 699.99,
    description: 'A high-end smartphone with a powerful processor, OLED display, and a long-lasting battery.',
    imageUrl: 'https://m.media-amazon.com/images/I/619oqSJVY5L.jpg'
  },
  {
    id: 2,
    name: 'Laptop',
    price: 999.99,
    description: 'A sleek and powerful laptop suitable for gaming, programming, and professional work.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkehjv32LAW4hWuvRAfKUY8EKEqNxXW-r5Wg&s'
  },
  {
    id: 3,
    name: 'Headphones',
    price: 199.99,
    description: 'Premium wireless noise-canceling headphones with deep bass and crystal-clear sound quality.',
    imageUrl: 'https://shop.zebronics.com/cdn/shop/files/Zeb-Havoc-pic1.jpg?v=1717221774&width=1200'
  },
  {
    id: 4,
    name: 'Earphones',
    price: 99.99,
    description: 'Compact and comfortable wireless earphones with excellent sound quality and long battery life.',
    imageUrl: 'https://www.seasonbazaar.com/wp-content/uploads/2019/08/X18-With-Charging-Box-Bluetooth-Earphone-TWS-Sport-Headset-in-Ear-Wireless-Earphones-Earpiece-mini-Tws.jpg'
  },
  {
    id: 5,
    name: 'Washing Machine',
    price: 899.99,
    description: 'A fully automatic washing machine with multiple wash programs and energy-efficient technology.',
    imageUrl: 'https://darlingretail.com/cdn/shop/products/1_9f9a71e5-1d1a-478a-92d7-e5c2b8be2865_800x.jpg?v=1698924682'
  },
  {
    id: 6,
    name: 'Air Conditioner',
    price: 599.99,
    description: 'A powerful split air conditioner with fast cooling technology and low energy consumption.',
    imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2022/2/GN/HV/NF/94784602/hair-1-5-ton-air-conditioner-500x500.jpg'
  },
  {
    id: 7,
    name: 'Television',
    price: 1199.99,
    description: 'A 55-inch 4K UHD smart TV with vibrant colors, HDR support, and built-in streaming apps.',
    imageUrl: 'https://i.insider.com/64cbea270f3dff0019568869?width=1200&format=jpeg'
  },
  {
    id: 8,
    name: 'Computer',
    price: 1199.99,
    description: 'A high-performance desktop computer with a powerful GPU, SSD storage, and multi-tasking capabilities.',
    imageUrl: 'https://m.media-amazon.com/images/I/61tbHvnaByL.jpg'
  }
];

// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
