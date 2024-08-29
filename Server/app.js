const express = require('express');
const connectDb = require('./config/dbConnection')
const errorHandler = require("./middleware/errorHandler")
const dotenv = require("dotenv").config();
const authRoutes = require('./routes/auth');
const inputRoutes = require('./routes/input')
const agenda = require('./agenda');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { protect } = require('./middleware/authMiddleware');


connectDb();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;



app.use(express.json());

// Use authentication routes
app.use('/api/auth', authRoutes);

// Protect other routes
app.use('/api', protect, inputRoutes);

app.use(errorHandler); 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
