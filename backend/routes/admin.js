// ================================
// ADMIN AUTHENTICATION ROUTES
// backend/routes/admin.js
// ================================

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const Bootcamp = require('../models/Bootcamp');
const Booking = require('../models/Booking');
const Contact = require('../models/Contact');

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if user is admin
    if (!user.roles.includes('admin')) {
      return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, roles: user.roles },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        roles: user.roles
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private (Admin)
router.get('/dashboard', auth, async (req, res) => {
  try {
    // Check admin role
    const user = await User.findById(req.user.userId);
    if (!user || !user.roles.includes('admin')) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Get dashboard statistics
    const totalBootcamps = await Bootcamp.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const confirmedBookings = await Booking.countDocuments({ status: 'confirmed' });
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });

    // Recent bookings
    const recentBookings = await Booking.find()
      .populate('bootcampId', 'title')
      .sort({ createdAt: -1 })
      .limit(5);

    // Revenue calculation
    const paidBookings = await Booking.find({ paymentStatus: 'paid' });
    const totalRevenue = paidBookings.reduce((sum, booking) => sum + booking.totalAmount, 0);

    res.json({
      stats: {
        totalBootcamps,
        totalBookings,
        pendingBookings,
        confirmedBookings,
        totalContacts,
        newContacts,
        totalRevenue
      },
      recentBookings
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get all bootcamps for admin
// @route   GET /api/admin/bootcamps
// @access  Private (Admin)
router.get('/bootcamps', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || !user.roles.includes('admin')) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const bootcamps = await Bootcamp.find().sort({ createdAt: -1 });
    res.json(bootcamps);
  } catch (error) {
    console.error('Error fetching bootcamps:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Create bootcamp
// @route   POST /api/admin/bootcamps
// @access  Private (Admin)
router.post('/bootcamps', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || !user.roles.includes('admin')) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json(bootcamp);
  } catch (error) {
    console.error('Error creating bootcamp:', error);
    res.status(400).json({ message: 'Failed to create bootcamp', error: error.message });
  }
});

// @desc    Update bootcamp
// @route   PUT /api/admin/bootcamps/:id
// @access  Private (Admin)
router.put('/bootcamps/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || !user.roles.includes('admin')) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const bootcamp = await Bootcamp.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!bootcamp) {
      return res.status(404).json({ message: 'Bootcamp not found' });
    }

    res.json(bootcamp);
  } catch (error) {
    console.error('Error updating bootcamp:', error);
    res.status(400).json({ message: 'Failed to update bootcamp' });
  }
});

// @desc    Delete bootcamp
// @route   DELETE /api/admin/bootcamps/:id
// @access  Private (Admin)
router.delete('/bootcamps/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || !user.roles.includes('admin')) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res.status(404).json({ message: 'Bootcamp not found' });
    }

    res.json({ message: 'Bootcamp deleted successfully' });
  } catch (error) {
    console.error('Error deleting bootcamp:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get all bookings for admin
// @route   GET /api/admin/bookings
// @access  Private (Admin)
router.get('/bookings', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || !user.roles.includes('admin')) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const bookings = await Booking.find()
      .populate('bootcampId', 'title category')
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update booking status
// @route   PUT /api/admin/bookings/:id/status
// @access  Private (Admin)
router.put('/bookings/:id/status', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user || !user.roles.includes('admin')) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('bootcampId', 'title');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

// ================================
// CREATE ADMIN USER SCRIPT
// backend/create-admin.js
// ================================

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('❌ Admin user already exists');
      process.exit(0);
    }

    // Hash password
    const password = 'admin123'; // Change this to a secure password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin user
    const admin = new User({
      username: 'admin',
      password: hashedPassword,
      roles: ['admin', 'user']
    });

    await admin.save();
    
    console.log('🎉 Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('⚠️  Please change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  createAdmin();
}