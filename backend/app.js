import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import axios from 'axios';
import Redis from 'ioredis';
import dotenv from 'dotenv';
import { createServer } from 'http'; // Add for socket.io
import { Server } from 'socket.io'; // Add for socket.io
import authRoute from './routes/auth.route.js';
import { setupWebRTCSignaling } from './signalling.js'; // Import your signaling setup (WebRTC)

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app); // Use for socket.io setup

// MongoDB connection
await mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err.message));

// Enable CORS for both localhost and production frontend
app.use(cors({
  origin: ['http://localhost:3000'],  // or the live URL if deployed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

// Redis setup
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || '',
});

redis.on('error', (err) => {
  console.error('Redis error:', err.message);
});

// WebRTC signaling with Socket.io
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://care-nest.vercel.app'],
    methods: ['GET', 'POST'],
  },
});

// WebRTC signaling setup
setupWebRTCSignaling(io);

// Blogs endpoint using Redis caching
app.get('/blogs', async (req, res) => {
  const cacheKey = 'blogs_cache';
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log('Serving from cache');
      return res.send(JSON.parse(cachedData));
    }

    const response = await axios.get("https://newsapi.org/v2/everything?q=elderly%20care&pageSize=100&apiKey=6436854ddb794baabca16d5311af927c");
    const data = response.data;

    await redis.set(cacheKey, JSON.stringify(data), 'EX', 3600); // Cache for 1 hour

    res.send(data);
  } catch (error) {
    console.error('Error getting Blog data:', error.message);
    res.status(500).send({ error: 'Failed to fetch blog data' });
  }
});

// Authentication routes
app.use('/auth', authRoute);

// Gemini API route
app.post('/gemini', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).send({ error: 'Prompt is required' });
  }

  try {
    const geminiResponse = await axios.post('https://your-gemini-api.com/endpoint', { prompt });
    res.send({ response: geminiResponse.data.response });
  } catch (error) {
    console.error('Error fetching Gemini API response:', error.message);
    res.status(500).send({ error: 'Failed to fetch response from Gemini API' });
  }
});

// Start the server with Socket.io
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
