const Medicine = require('../models/medicineModel');

// Add a new medicine
const addMedicine = async (req, res) => {
    try {
        const { name, description, price, manufacturer, stock } = req.body;

        const newMedicine = new Medicine({ name, description, price, manufacturer, stock });
        await newMedicine.save();

        res.status(201).json({ success: true, data: newMedicine });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error adding medicine' });
    }
};

// Get all medicines
const getAllMedicines = async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.status(200).json({ success: true, data: medicines });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching medicines' });
    }
};

module.exports = { addMedicine, getAllMedicines };
