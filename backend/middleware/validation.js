const { body, validationResult } = require('express-validator');

// Validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Bootcamp validation rules
const validateBootcamp = [
  body('title')
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('description')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('maxParticipants')
    .isInt({ min: 1 })
    .withMessage('Max participants must be at least 1'),
  body('category')
    .isIn(['military', 'koh-lanta', 'adventure', 'team-building'])
    .withMessage('Invalid category'),
  body('difficulty')
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Invalid difficulty level'),
  validateRequest
];

// Booking validation rules
const validateBooking = [
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
  body('numberOfParticipants')
    .isInt({ min: 1 })
    .withMessage('Number of participants must be at least 1'),
  body('bookingDate')
    .isISO8601()
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Booking date must be in the future');
      }
      return true;
    }),
  validateRequest
];

// Contact validation rules
const validateContact = [
  body('fullName')
    .isLength({ min: 1, max: 100 })
    .withMessage('Full name must be between 1 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('message')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
  validateRequest
];

module.exports = {
  validateBootcamp,
  validateBooking,
  validateContact,
  validateRequest
};
