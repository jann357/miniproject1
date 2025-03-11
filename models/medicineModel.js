const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    manufacturer: { type: String, required: true },
    stock: { type: Number, default: 0 },
    // You can add more fields as needed, such as expiration date, etc.
}, {
    timestamps: true
});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;



