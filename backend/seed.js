
// Generate unique booking reference
const generateBookingReference = () => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `OH${timestamp.slice(-6)}${random}`;
};

// Format price for display
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-BE', {
    style: 'currency',
    currency: 'EUR'
  }).format(price);
};

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

// Calculate booking total
const calculateBookingTotal = (basePrice, participants, discountPercent = 0) => {
  const subtotal = basePrice * participants;
  const discount = subtotal * (discountPercent / 100);
  return subtotal - discount;
};

// Check if date is in future
const isFutureDate = (date) => {
  return new Date(date) > new Date();
};

// Format date for display
const formatDate = (date, locale = 'fr-BE') => {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Sanitize user input
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

// Generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
};

module.exports = {
  generateBookingReference,
  formatPrice,
  isValidEmail,
  calculateBookingTotal,
  isFutureDate,
  formatDate,
  sanitizeInput,
  generateSlug
};
