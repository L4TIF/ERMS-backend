const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/erms';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const assignmentRoutes = require('./routes/assignments');
const authRoutes = require('./routes/auth');
const { authenticateToken, requireManager } = require('./middleware/auth');

app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/projects', authenticateToken, projectRoutes);
app.use('/api/assignments', authenticateToken, assignmentRoutes);

app.get('/', (req, res) => {
    res.send('ERMS Backend Running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 