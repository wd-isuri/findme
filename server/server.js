import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db.js';
import itemRoutes from './routes/itemRoutes.js';
import authRoutes from './routes/authRoutes.js';



dotenv.config();

// Connect to MongoDB
connectDB();


const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads',express.static('uploads'));

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/auth', authRoutes);


// Test route to check if server is working
app.get('/', (req, res) => {
  res.send('FindMe Backend Server is running successfully!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
