const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

// Middleware to check if user is manager
const requireManager = (req, res, next) => {
    if (req.user.role !== 'manager') {
        return res.status(403).json({ message: 'Manager access required' });
    }
    next();
};

// Middleware to check if user is engineer
const requireEngineer = (req, res, next) => {
    if (req.user.role !== 'engineer') {
        return res.status(403).json({ message: 'Engineer access required' });
    }
    next();
};

module.exports = { authenticateToken, requireManager, requireEngineer }; 