
const mongoose = require('mongoose');

const bootcampRequestSchema = new mongoose.Schema({
  customerInfo: {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    company: {
      type: String,
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters']
    }
  },
  requirements: {
    groupSize: {
      type: Number,
      required: [true, 'Group size is required'],
      min: [1, 'Group size must be at least 1']
    },
    preferredDate: {
      type: Date,
      validate: {
        validator: function(date) {
          return !date || date > new Date();
        },
        message: 'Preferred date must be in the future'
      }
    },
    duration: {
      type: String,
      trim: true,
      maxlength: [50, 'Duration cannot exceed 50 characters']
    },
    location: {
      type: String,
      trim: true,
      maxlength: [200, 'Location cannot exceed 200 characters']
    },
    budget: {
      type: String,
      trim: true,
      maxlength: [50, 'Budget cannot exceed 50 characters']
    },
    objectives: {
      type: String,
      required: [true, 'Objectives are required'],
      maxlength: [1000, 'Objectives cannot exceed 1000 characters']
    },
    specialRequests: {
      type: String,
      maxlength: [1000, 'Special requests cannot exceed 1000 characters']
    }
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'quoted', 'approved', 'rejected'],
    default: 'pending'
  },
  adminNotes: {
    type: String,
    maxlength: [1000, 'Admin notes cannot exceed 1000 characters']
  },
  quotedPrice: {
    type: Number,
    min: [0, 'Quoted price cannot be negative']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
bootcampRequestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Add indexes
bootcampRequestSchema.index({ 'customerInfo.email': 1 });
bootcampRequestSchema.index({ status: 1 });
bootcampRequestSchema.index({ createdAt: -1 });

module.exports = mongoose.model('BootcampRequest', bootcampRequestSchema);