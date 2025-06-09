const express = require('express');
const router = express.Router();
const { createPaymentIntent, handleWebhook } = require('../controllers/payments');

// Create a payment intent
router.post('/create-payment-intent', createPaymentIntent);

// Handle Stripe webhook
router.post('/webhook', handleWebhook);

module.exports = router;