const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// 🔥 Load env
dotenv.config();

// 🔥 Connect DB
connectDB();

const app = express();

// 🔥 Middleware
app.use(
  cors({
    origin:["http://localhost:3000", "https://smartgram-digital-grampanchayat.vercel.app"],
    credentials: true
  })
);
app.use(express.json());

// 🔥 Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/complaints', require('./routes/complaintRoutes'));
app.use('/api/taxes', require('./routes/taxRoutes'));
app.use('/api/notices', require('./routes/noticeRoutes'));
app.use('/api/support', require('./routes/supportRoutes'));
app.use('/api/receipts', require('./routes/receiptRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// 🔥 Test route
app.get('/', (req, res) => {
  res.send('Backend is working 🚀');
});

// 🔥 Global error handler (important)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Something went wrong' });
});

// 🔥 Start server using ENV PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});