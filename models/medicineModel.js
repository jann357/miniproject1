// Filename: models/medicineModel.js
const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    form: { type: String, enum: ['syrup', 'pill', 'injection'], required: true },
});

const Medicine = mongoose.model('Medicine', medicineSchema);
module.exports = Medicine;



