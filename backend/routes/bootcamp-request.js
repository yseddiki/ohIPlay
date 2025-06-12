// ================================
// BOOTCAMP REQUEST ROUTES
// backend/routes/bootcamp-requests.js
// ================================

const express = require('express');
const router = express.Router();
const BootcampRequest = require('../models/BootcampRequest');
const { validateRequest } = require('../middleware/validation');
const { body } = require('express-validator');

// Validation rules for bootcamp requests
const validateBootcampRequest = [
  body('customerInfo.fullName')
    .isLength({ min: 1, max: 100 })
    .withMessage('Full name must be between 1 and 100 characters'),
  body('customerInfo.email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('customerInfo.phone')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('requirements.groupSize')
    .isInt({ min: 1 })
    .withMessage('Group size must be at least 1'),
  body('requirements.objectives')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Objectives must be between 10 and 1000 characters'),
  validateRequest
];

// @desc    Create a new bootcamp request
// @route   POST /api/bootcamp-requests
// @access  Public
router.post('/', validateBootcampRequest, async (req, res) => {
  try {
    const request = new BootcampRequest(req.body);
    await request.save();
    
    // TODO: Send notification email to admin
    console.log(`New bootcamp request from ${request.customerInfo.fullName}`);
    
    res.status(201).json({
      success: true,
      message: 'Bootcamp request submitted successfully',
      data: request
    });
  } catch (error) {
    console.error('Error creating bootcamp request:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to submit request',
      error: error.message
    });
  }
});

// @desc    Get bootcamp request by ID
// @route   GET /api/bootcamp-requests/:id
// @access  Public (customer can check their request)
router.get('/:id', async (req, res) => {
  try {
    const request = await BootcampRequest.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found'
      });
    }
    
    res.json({
      success: true,
      data: request
    });
  } catch (error) {
    console.error('Error fetching bootcamp request:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;
