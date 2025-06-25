const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    engineerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    allocationPercentage: { type: Number, required: true }, // 0-100
    startDate: { type: Date },
    endDate: { type: Date },
    role: { type: String }, // 'Developer', 'Tech Lead', etc.
});

module.exports = mongoose.model('Assignment', assignmentSchema); 