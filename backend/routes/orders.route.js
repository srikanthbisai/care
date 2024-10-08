// routes/orders.route.js
import express from 'express';
import Order from '../models/order.model.js';

const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
  const { customerName, service } = req.body;

  if (!customerName || !service) {
    return res.status(400).json({ error: 'Customer name and service are required' });
  }

  try {
    const newOrder = new Order({ customerName, service });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

export default router;
