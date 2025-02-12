const mongoose = require('mongoose');

// Prescription Schema in MongoDB
const prescriptionSchema = new mongoose.Schema({
  patientDetails: {
    name: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    contact: { type: String, required: true },
    patientID: { type: String, required: true },
    allergies: { type: String, default: '' },
  },
  // Linking doctorDetails to the users collection (doctor)
  doctorDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',  // This will reference the users collection
    required: true,
  },
  diagnosis: { type: String, required: true },
  medications: [
    {
      medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },  // Reference to the Medicine schema
      dosage: { type: String, required: true },  // Dosage instructions
      quantity: { type: Number, required: true },  // Quantity prescribed
      price: { type: Number, required: true },  // Total price for the medication (calculated on the frontend)
    }
  ],
  qrCodeUrl: { type: String, default: '' },  // URL of the QR code generated for the prescription
}, { timestamps: true });

const Prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports = Prescription;

