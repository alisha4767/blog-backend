require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
// connect DB
connectDB();
// routes
app.use('/api', require('./routes/authRoutes'));
app.use('/api', require('./routes/postRoutes'));

app.use(express.json());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
