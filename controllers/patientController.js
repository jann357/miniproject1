// const Patient = require('../models/patientModel');

// // Add a new patient
// const addPatient = async (req, res) => {
//     try {
//         const { patientId ,name, age, gender, phoneNumber, allergies, address } = req.body;
//         const newPatient = new Patient({ patientId,name, age, gender, phoneNumber, allergies, address });

//         await newPatient.save();

//         res.status(201).json({ success: true, data: newPatient });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Error adding patient' });
//     }
// };

// // Get patient info by ID
// const getPatientInfo = async (req, res) => {
//     try {
//         const { patientId } = req.body;
//         const patient = await Patient.findById(patientId);
//         if (!patient) {
//             return res.status(404).json({ success: false, message: 'Patient not found' });
//         }

//         res.status(200).json({ success: true, data: patient });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Error fetching patient info' });
//     }
// };

// module.exports = { addPatient, getPatientInfo };

const Patient = require('../models/patientModel');

// Add a new patient
// const addPatient = async (req, res) => {

//     try {
//         const { patientId, name, age, gender, phoneNumber, allergies, address } = req.body;
       
//         // Check if patientId already exists
//         const existingPatient = await Patient.findOne({ patientId });
//         if (existingPatient) {
//             return res.status(400).json({ success: false, message: 'Patient ID already exists' });
//         }

//         // Create and save new patient
//         const newPatient = new Patient({ patientId, name, age, gender, allergies});
//         await newPatient.save();

//         res.status(201).json({ success: true, data: newPatient });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Error adding patient' });
//     }
// };


// Add a new patient
const addPatient = async (req, res) => {
    try {
        const { patientId, name, age, gender, phoneNumber, allergies, address } = req.body;

        // Check if patientId already exists
        const existingPatient = await Patient.findOne({ patientId });
        if (existingPatient) {
            return res.status(400).json({ success: false, message: 'Patient ID already exists' });
        }

        // Create and save new patient with phoneNumber and address
        const newPatient = new Patient({
            patientId,
            name,
            age,
            gender,
            phoneNumber,   // Ensure phoneNumber is included
            allergies,
            address        // Ensure address is included
        });

        // Save the new patient document to the database
        await newPatient.save();

        res.status(201).json({ success: true, data: newPatient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error adding patient' });
    }
};


// Get patient info by patientId from the URL
const getPatientInfo = async (req, res) => {
    try {
        const { patientId } = req.params;  // Using patientId from the URL parameters

        // Find the patient by patientId
        const patient = await Patient.findOne({ patientId });
        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }

        res.status(200).json({ success: true, data: patient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching patient info' });
    }
};

module.exports = { addPatient, getPatientInfo };

