import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import axios from 'axios';
import Redis from 'ioredis';
import dotenv from 'dotenv';
import { createServer } from 'http'; 
import { Server } from 'socket.io'; 
import authRoute from './routes/auth.route.js';
import { setupWebRTCSignaling } from './signalling.js'; 
import cron from "node-cron";


dotenv.config();

const app = express();
const server = createServer(app); 

await mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err.message));

app.use(cors({
  origin: ['http://localhost:3000', 'https://care-nest.vercel.app'],  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || '',
});

redis.on('error', (err) => {
  console.error('Redis error:', err.message);
});


const preloadBlogsCache = async () => {
  const cacheKey = 'blogs_cache';
  try {
    console.log('Preloading blogs cache...');
    const response = await axios.get(`https://newsapi.org/v2/everything?q=elderly%20care&pageSize=100&apiKey=${process.env.NEWS_API_KEY}`);
    const data = response.data;
    await redis.set(cacheKey, JSON.stringify(data), 'EX', 3600); // Cache for 1 hour
    console.log('Blogs cache preloaded');
  } catch (error) {
    console.error('Error preloading blogs cache:', error.message);
  }
};

preloadBlogsCache();

app.get('/blogs', async (req, res) => {
  const cacheKey = 'blogs_cache';
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log('Serving blogs from cache');
      return res.send(JSON.parse(cachedData));
    }

    console.log('Cache miss, fetching data from API...');
    const start = Date.now(); 
    const response = await axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=cures+AND+medications+AND+health&retmode=xml`);
    console.log(`API response time: ${Date.now() - start}ms`); 

    const data = response.data;

    // Cache the response in Redis for 1 hour
    await redis.set(cacheKey, JSON.stringify(data), 'EX', 3600); 
    console.log('Blogs data cached for 1 hour');

    res.send(data);
  } catch (error) {
    console.error('Error getting blogs data:', error.message);
    res.status(500).send({ error: 'Failed to fetch blog data' });
  }
});

cron.schedule("* * * * *", ()=> {
  
})

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
