const mongoose = require('mongoose');

const bootcampSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  maxParticipants: {
    type: Number,
    required: [true, 'Please add max participants'],
    min: [1, 'Must allow at least 1 participant']
  },
  photos: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: 'Bootcamp photo'
    }
  }],
  activityPlan: [{
    time: {
      type: String,
      required: true
    },
    activity: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }],
  category: {
    type: String,
    enum: ['military', 'koh-lanta', 'adventure', 'team-building'],
    default: 'adventure'
  },
  duration: {
    type: String,
    required: [true, 'Please add duration']
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  location: {
    type: String,
    default: 'Rue Saint Quentin 36 – AKVMOVE'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add indexes for better query performance
bootcampSchema.index({ category: 1, isActive: 1 });
bootcampSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Bootcamp', bootcampSchema);