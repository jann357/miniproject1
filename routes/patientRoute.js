// const express = require('express');
// const router = express.Router();
// const Patient = require('../models/patientModel');
// const PatientController = require('../controllers/patientController');

// // Route to add a new patient
// router.post('/add', async (req, res) => {
//     try {
//         const { name, age, gender, phoneNumber, allergies, address } = req.body;

//         const newPatient = new Patient({ name, age, gender, phoneNumber, allergies, address });
//         await newPatient.save();

//         res.status(201).json({ success: true, data: newPatient });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Error adding patient' });
//     }
// });

// // Route to get a patient by ID
// router.post('/get-patient-info', async (req, res) => {
//     try {
//         const { patientId } = req.body;
        
//         const patient = await Patient.findById(patientId);
      
//         if (!patient) {
//             return res.status(404).json({ success: false, message: 'Patient not found' });
//         }

//         res.status(200).json({ success: true, data: patient });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Error fetching patient info' });
//     }
// });
// router.get('/get-patient-info', PatientController.getPatientInfo);
// module.exports = router;
const express = require('express');
const router = express.Router();
const Patient = require('../models/patientModel');
const PatientController = require('../controllers/patientController');

// Route to add a new patient
// router.post('/add', async (req, res) => {
//     try {
//         const {patientId, name, age, gender, phoneNumber, allergies, address } = req.body;

//         const newPatient = new Patient({ patientId,name, age, gender, phoneNumber, allergies, address });
//         await newPatient.save();

//         res.status(201).json({ success: true, data: newPatient });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Error adding patient' });
//     }
// });
// router.post('/add', async (req, res) => {
//     try {
//       const { patientId, name, age, gender, allergies } = req.body;
//       console.log('Received data:', req.body);  // Log the incoming request body to verify it
//       // Logic to save patient
//     } catch (error) {
//       console.error('Error adding patient:', error);
//       res.status(500).json({ success: false, message: 'Error adding patient' });
//     }
//   });

router.post('/add', async (req, res) => {
    try {
      const { patientId, name,phoneNumber, age, gender, allergies,address } = req.body;
  
      // Check if patient already exists
      const existingPatient = await Patient.findOne({ patientId });
      if (existingPatient) {
        return res.status(400).json({ success: false, message: 'Patient already exists' });
      }
  
      // Create a new patient
      const newPatient = new Patient({
        patientId,
        name,
        phoneNumber,
        age,
        gender,
        allergies,
        address
      });
  
      await newPatient.save();
  
      res.status(200).json({ success: true, data: newPatient });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to add patient' });
    }
  });
  
  
// Route to get a patient by patientId (GET request with URL parameter)
router.get('/get-patient-info/:patientId', async (req, res) => {
    try {
        const { patientId } = req.params; // Use params to extract patientId from the URL
        
        // Find the patient by patientId
        const patient = await Patient.findOne({ patientId }); // Assuming patientId is a unique field

        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }

        res.status(200).json({ success: true, data: patient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching patient info' });
    }
});

module.exports = router;

