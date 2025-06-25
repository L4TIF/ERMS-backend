const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects
router.get('/', async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

// Get project by ID
router.get('/:id', async (req, res) => {
    const project = await Project.findById(req.params.id);
    res.json(project);
});

// Create project
router.post('/', async (req, res) => {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
});

// Update project
router.put('/:id', async (req, res) => {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
});

// Delete project
router.delete('/:id', async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
});

module.exports = router; 