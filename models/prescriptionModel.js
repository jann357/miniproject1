const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  doctorId: { type: String,required: true },
  medicines: [{
    medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'medicines', required: true },
    name:{type: String, required: true },
    dosage: { type: String, required: true },
    shift: { type: String, required: true },
    price: { type: Number, required: true },
  }],
  totalCost: { type: Number, required: true },
  qrCodeData: { type: String, required: true}, // Can be a string representing QR code data or a link to an image
}, { timestamps: true });

const Prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports = Prescription;



