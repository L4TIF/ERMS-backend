const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Assignment = require('../models/Assignment');
const mongoose = require('mongoose');

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Get user by ID
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

// Create user
router.post('/', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
});

// Update user
router.put('/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
});

// Delete user
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    // Cascade delete assignments for this engineer (ensure ObjectId match)
    await Assignment.deleteMany({ engineerId: mongoose.Types.ObjectId(userId) });
    res.json({ message: 'User and related assignments deleted' });
});

module.exports = router; 