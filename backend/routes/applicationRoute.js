const mongoose = require('mongoose');
const Application = require('../models/Application');
const express = require('express');

const router = express.Router();

// @route GET /api/applications
// @desc Get all applications
// @access Public
router.get('/', async (req, res) => {
    try {
        const applications = await Application.find();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    } 
});

// @route POST /api/applications
// @desc Create a new application
// @access Public
router.post('/', async (req, res) => {
    const { company, role, status, dateOfApplication, link } = req.body;

    const newApplication = new Application({
        company,
        role,
        status,
        dateOfApplication,
        link,
    });

    try {
        const savedApplication = await newApplication.save();
        res.status(201).json(savedApplication);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route DELETE /api/applications/:id
// @desc Delete an application
// @access Public
router.delete('/:id', async (req, res) => {
    try {
        const deletedApplication = await Application.findByIdAndDelete(req.params.id);
        if (!deletedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json(deletedApplication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route PUT /api/applications/:id
// @desc Update an application
// @access Public
router.put('/:id', async (req, res) => {
    const { company, role, status, dateOfApplication, link } = req.body;

    try {
        const updatedApplication = await Application.findByIdAndUpdate(
            req.params.id,
            { company, role, status, dateOfApplication, link },
            { new: true }
        );
        if (!updatedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json(updatedApplication);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;