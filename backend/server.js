const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const billRoutes = require('./routes/billRoutes');
const shareRoutes = require('./routes/shareRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5174',
  'https://expense-splitter-ruby.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/bills', billRoutes);
app.use('/api/shares', shareRoutes);
app.use('/api/auth', authRoutes); 

app.get("/", (req, res) => {
  res.send("Expense Splitter backend is running ✅");
});

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
