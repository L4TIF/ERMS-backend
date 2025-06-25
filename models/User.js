const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['engineer', 'manager'], required: true },
    skills: [{ type: String }],
    seniority: { type: String, enum: ['junior', 'mid', 'senior'] },
    maxCapacity: { type: Number, default: 100 }, // 100 for full-time, 50 for part-time
    department: { type: String },
});

module.exports = mongoose.model('User', userSchema); 