// const express = require('express');
// const router = express.Router();
// const { generatePrescription, sendPrescription } = require('../controllers/prescriptionController');
// // const { verifyToken } = require('../middleware/authMiddleware'); // You can remove this for now

// // Route for generating and saving the prescription
// router.post('/generate', generatePrescription);

// // Route for sending the prescription (via SMS/Email)
// router.post('/send-prescription', sendPrescription);

// module.exports = router;
const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController'); // Ensure this path is correct

// Route to generate and store prescription
router.post('/generate', prescriptionController.generateAndStorePrescription);

// Route to send prescription via Twilio
router.post('/send-prescription', prescriptionController.sendPrescription);

module.exports = router;

