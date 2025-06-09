const express = require('express');
const router = express.Router();
const Bootcamp = require('../models/Bootcamp');

// @desc    Get all bootcamps
// @route   GET /api/bootcamps
router.get('/', async (req, res) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json(bootcamps);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get a single bootcamp
// @route   GET /api/bootcamps/:id
router.get('/:id', async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return res.status(404).json({ message: 'Bootcamp not found' });
    }
    res.status(200).json(bootcamp);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Create a bootcamp
// @route   POST /api/bootcamps
router.post('/', async (req, res) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json(bootcamp);
  } catch (error) {
    res.status(400).json({ message: 'Bad Request' });
  }
});

// @desc    Update a bootcamp
// @route   PUT /api/bootcamps/:id
router.put('/:id', async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) {
      return res.status(404).json({ message: 'Bootcamp not found' });
    }
    res.status(200).json(bootcamp);
  } catch (error) {
    res.status(400).json({ message: 'Bad Request' });
  }
});

// @desc    Delete a bootcamp
// @route   DELETE /api/bootcamps/:id
router.delete('/:id', async (req, res) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res.status(404).json({ message: 'Bootcamp not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;