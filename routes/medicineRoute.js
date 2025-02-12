// Filename: backend/routes/medicine.js
const express = require('express');
const router = express.Router();
const Medicine = require('../models/medicineModel'); // Import your medicine model

// GET route to fetch all medicines
router.get('/medicines', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
