const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');

// Get all assignments
router.get('/', async (req, res) => {
  const assignments = await Assignment.find();
  res.json(assignments);
});

// Get assignment by ID
router.get('/:id', async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  res.json(assignment);
});

// Create assignment
router.post('/', async (req, res) => {
  const assignment = new Assignment(req.body);
  await assignment.save();
  res.status(201).json(assignment);
});

// Update assignment
router.put('/:id', async (req, res) => {
  const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(assignment);
});

// Delete assignment
router.delete('/:id', async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.json({ message: 'Assignment deleted' });
});

module.exports = router; 