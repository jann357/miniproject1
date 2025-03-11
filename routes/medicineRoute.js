const express = require('express');
const router = express.Router();
const Medicine = require('../models/medicineModel');
const MedicineController = require('../controllers/medicineController'); // Import the controller

// Route to add a new medicine
router.post('/add', async (req, res) => {
    try {
        const { name, description, price, manufacturer, stock } = req.body;

        const newMedicine = new Medicine({ name, description, price, manufacturer, stock });
        await newMedicine.save();

        res.status(201).json({ success: true, data: newMedicine });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding medicine' });
    }
});

// // Route to get all medicines
// router.get('/get-all', async (req, res) => {
//     try {
//         const medicines = await Medicine.find();
//         res.status(200).json({ success: true, data: medicines });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Error fetching medicines' });
//     }
// });
router.get('/get-all-medicines', MedicineController.getAllMedicines);

module.exports = router;

