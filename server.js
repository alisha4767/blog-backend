const express = require('express');
const app = express();

const connectDB = require('./config/db');

app.use(express.json());

// connect DB
connectDB();

// routes
app.use('/api', require('./routes/authRoutes'));
app.use('/api', require('./routes/postRoutes'));

app.listen(3000, () => console.log("Server running 🚀"));