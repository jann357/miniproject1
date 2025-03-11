const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patientId: { type: String, unique: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    allergies: { type: String, default: 'None' },  
    address: { type: String },
    
}, {
    timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;

// const mongoose = require('mongoose');

// const patientSchema = new mongoose.Schema({
//     patientId: { type: String, unique: true },  // Added Patient ID
//     name: { type: String, required: true },
//     dateOfBirth: { type: Date, required: true },  // Added Date of Birth
//     gender: { type: String, required: true },
//     phoneNumber: { type: String, required: true },
//     emergencyContact: {
//         name: { type: String },
//         phoneNumber: { type: String },
//     },  // Added Emergency Contact
//     allergies: { type: String, default: 'None' },  // Can store a list of allergies or 'None'
//     medicalHistory: { type: String },  // Added Medical History
//     currentMedications: { type: String },  // Added Current Medications
//     bloodType: { type: String },  // Added Blood Type
//     insuranceInfo: { type: String },  // Added Insurance Information
//     address: { type: String },  // Added Address
//     primaryPhysician: { type: String },  // Added Primary Physician
//     firstVisitDate: { type: Date },  // Added First Visit Date
//     notes: { type: String },  // Added Notes
// }, {
//     timestamps: true
// });

// const Patient = mongoose.model('Patient', patientSchema);

// module.exports = Patient;

