

const mongoose = require('mongoose'); 
const poppler = require('pdf-poppler');
const Prescription = require('../models/prescriptionModel'); // Import the Prescription model
const QRCode = require('qrcode');
const twilio = require('twilio');

// Initialize Twilio client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


const Doctor = require('../models/userModel');
const Patient = require('../models/patientModel');
const PDFDocument = require('pdfkit');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'du1gx4wyj', // Replace with your Cloudinary cloud name
  api_key: '429677958359478', // Replace with your Cloudinary API key
  api_secret: 'uuxywx9XY6fGUju-pF3jKzLzH9k', // Replace with your Cloudinary API secret
});

const pdf2image = require('pdf2image');
const path = require('path'); 



const generateAndStorePrescription = async (req, res) => {
  const { patientId, doctorId, selectedMedicines, totalCost } = req.body;

  try {
    // Fetch patient details from the database
    const patient = await Patient.findOne({ patientId: patientId });
    if (!patient) {
      console.error('Patient not found:', patientId);
      return res.status(404).json({ success: false, error: 'Patient not found' });
    }

    // Fetch doctor details from the database
    const doctor = await Doctor.findOne({ email: doctorId }); // Assuming doctorId is the email
    if (!doctor) {
      console.error('Doctor not found:', doctorId);
      return res.status(404).json({ success: false, error: 'Doctor not found' });
    }

    // Map selectedMedicines to include medicineId
    const medicinesWithIds = selectedMedicines.map(medicine => ({
      medicineId: new mongoose.Types.ObjectId(medicine._id),
      name: medicine.name,
      dosage: medicine.dosage,
      shift: medicine.shift,
      price: medicine.price,
    }));

    // Create a new PDF document
    const doc = new PDFDocument();

    // Ensure the folder exists
    const dirPath = path.join(__dirname, 'prescriptions');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log('Prescriptions folder created:', dirPath);
    }

    // Set file path for the PDF
    const pdfPath = path.join(dirPath, `${patientId}-prescription.pdf`);

    // Pipe the PDF document to a file
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    // Add content to the PDF
    doc.fontSize(20).font('Helvetica-Bold').text('Prescription', { align: 'center' });
    doc.moveDown(1);

    // Patient Information
    doc.fontSize(12).font('Helvetica').text(`Patient ID: ${patient.patientId}`);
    doc.text(`Patient Name: ${patient.name}`);
    doc.text(`Patient Phone: ${patient.phoneNumber}`);
    doc.moveDown(1);

    // Doctor Information
    doc.text(`Doctor ID: ${doctor.email}`);
    doc.text(`Doctor Name: ${doctor.name}`);
    doc.text(`Doctor Specialization: ${doctor.specialization}`);
    doc.text(`Doctor Phone: ${doctor.phoneNumber}`);
    doc.moveDown(1);

    // Add a line for separation
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(1);

    // Medicines section title
    doc.fontSize(14).font('Helvetica-Bold').text('Medicines:', { underline: true });
    doc.moveDown(0.5);

    // Medicines table
    doc.fontSize(12).font('Helvetica');
    doc.text('Medicine', 50, doc.y, { width: 200, align: 'left' });
    doc.text('Dosage', 250, doc.y, { width: 100, align: 'left' });
    doc.text('Shift', 350, doc.y, { width: 100, align: 'left' });
    doc.text('Price', 450, doc.y, { width: 100, align: 'left' });
    doc.moveDown(0.5);

    selectedMedicines.forEach(medicine => {
      doc.text(medicine.name, 50, doc.y);
      doc.text(medicine.dosage, 250, doc.y);
      doc.text(medicine.shift, 350, doc.y);
      doc.text(`$${medicine.price}`, 450, doc.y);
      doc.moveDown(0.5);
    });

    // Total cost
    doc.moveDown(1);
    doc.text(`Total Cost: $${totalCost}`, { align: 'right' });

    // Footer with generated date
    doc.moveDown(1);
    doc.fontSize(10).text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });

    // End the document to finalize the PDF creation
    doc.end();

    // Wait for the PDF to finish writing
    writeStream.on('finish', async () => {
      try {
        // Upload the PDF to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(pdfPath, {
          folder: 'prescriptions',
          public_id: `prescription-${patientId}-${Date.now()}`,
        });

        console.log('Cloudinary upload response:', uploadResponse);

        if (!uploadResponse.secure_url) {
          throw new Error('Cloudinary upload did not return a valid secure_url');
        }

        // Generate a QR code for the Cloudinary URL
        const qrCodePath = path.join(dirPath, `prescription-${patientId}-qrcode.png`);
        await QRCode.toFile(qrCodePath, uploadResponse.secure_url);

        console.log('QR code generated:', qrCodePath);

        // Upload the QR code to Cloudinary
        const qrCodeUploadResponse = await cloudinary.uploader.upload(qrCodePath, {
          folder: 'prescriptions/qrcodes',
          public_id: `prescription-${patientId}-qrcode-${Date.now()}`,
        });

        console.log('QR code uploaded to Cloudinary:', qrCodeUploadResponse.secure_url);

        // Save prescription data in the database
        const prescription = new Prescription({
          patientId,
          doctorId,
          medicines: medicinesWithIds,
          totalCost,
          qrCodeData: qrCodeUploadResponse.secure_url, // Store the QR code URL
        });

        await prescription.save();
        console.log('Prescription saved to database');

        // Send the QR code via Twilio MMS
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

        const message = await client.messages.create({
          body: 'Your prescription is ready. Scan the QR code below to view it:',
          mediaUrl: [qrCodeUploadResponse.secure_url], // Send QR code as an image
          from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
          to: patient.phoneNumber, // Patient's phone number
        });

        console.log('Twilio Response:', message.sid);

        // Send success response
        res.status(201).json({
          success: true,
          message: 'Prescription QR code generated and sent successfully',
          qrCodeData: qrCodeUploadResponse.secure_url,
        });

        // Cleanup: Delete local files
        fs.unlinkSync(pdfPath);
        fs.unlinkSync(qrCodePath);
        console.log('Deleted local files:', pdfPath, qrCodePath);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: error.message || 'Failed to process prescription' });
      }
    });

    // Handle errors during PDF writing
    writeStream.on('error', (error) => {
      console.error('Error writing PDF file:', error);
      res.status(500).json({ success: false, error: 'Failed to generate PDF' });
    });
  } catch (error) {
    console.error('Error generating prescription:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to generate prescription' });
  }
};

// const generateAndStorePrescription = async (req, res) => {
//   const { patientId, doctorId, selectedMedicines, totalCost } = req.body;

//   try {
//     // Fetch patient details from the database
//     const patient = await Patient.findOne({ patientId: patientId });
//     if (!patient) {
//       return res.status(404).json({ success: false, error: 'Patient not found' });
//     }

//     // Fetch doctor details from the database
//     const doctor = await Doctor.findOne({ email: doctorId }); // Assuming doctorId is the email
//     if (!doctor) {
//       return res.status(404).json({ success: false, error: 'Doctor not found' });
//     }

//     // Ensure selectedMedicines includes medicineId for each item
//     const medicinesWithIds = selectedMedicines.map(medicine => ({
//       medicineId: new mongoose.Types.ObjectId(medicine._id),
//       name: medicine.name,
//       dosage: medicine.dosage,
//       shift: medicine.shift,
//       price: medicine.price,
//     }));

//     // Create a new PDF document
//     const doc = new PDFDocument();

//     // Ensure the folder exists
//     const dirPath = path.join(__dirname, 'prescriptions');
//     if (!fs.existsSync(dirPath)) {
//       fs.mkdirSync(dirPath);
//       console.log('Prescriptions folder created.');
//     }

//     // Set file path for the PDF
//     const pdfPath = path.join(dirPath, `${patientId}-prescription.pdf`);

//     // Pipe the PDF document to a file
//     const writeStream = fs.createWriteStream(pdfPath);
//     doc.pipe(writeStream);

//     // Add content to the PDF
//     doc.fontSize(20).font('Helvetica-Bold').text('Prescription', { align: 'center' });
//     doc.moveDown(1);

//     // Patient Information
//     doc.fontSize(12).font('Helvetica').text(`Patient ID: ${patient.patientId}`);
//     doc.text(`Patient Name: ${patient.name}`);
//     doc.text(`Patient Phone: ${patient.phoneNumber}`);
//     doc.moveDown(1);

//     // Doctor Information
//     doc.text(`Doctor ID: ${doctor.email}`);
//     doc.text(`Doctor Name: ${doctor.name}`);
//     doc.text(`Doctor Specialization: ${doctor.specialization}`);
//     doc.text(`Doctor Phone: ${doctor.phoneNumber}`);
//     doc.moveDown(1);

//     // Add a line for separation
//     doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
//     doc.moveDown(1);

//     // Medicines section title
//     doc.fontSize(14).font('Helvetica-Bold').text('Medicines:', { underline: true });
//     doc.moveDown(0.5);

//     // Medicines table
//     doc.fontSize(12).font('Helvetica');
//     doc.text('Medicine', 50, doc.y, { width: 200, align: 'left' });
//     doc.text('Dosage', 250, doc.y, { width: 100, align: 'left' });
//     doc.text('Shift', 350, doc.y, { width: 100, align: 'left' });
//     doc.text('Price', 450, doc.y, { width: 100, align: 'left' });
//     doc.moveDown(0.5);

//     selectedMedicines.forEach(medicine => {
//       doc.text(medicine.name, 50, doc.y);
//       doc.text(medicine.dosage, 250, doc.y);
//       doc.text(medicine.shift, 350, doc.y);
//       doc.text(`$${medicine.price}`, 450, doc.y);
//       doc.moveDown(0.5);
//     });

//     // Total cost
//     doc.moveDown(1);
//     doc.text(`Total Cost: $${totalCost}`, { align: 'right' });

//     // Footer with generated date
//     doc.moveDown(1);
//     doc.fontSize(10).text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });

//     // End the document to finalize the PDF creation
//     doc.end();

//     // Wait for the PDF to finish writing
//     writeStream.on('finish', async () => {
//       try {
//         // Upload to Cloudinary
//         const uploadResponse = await cloudinary.uploader.upload(pdfPath, {
//           folder: 'prescriptions',
//           public_id: `prescription-${patientId}-${Date.now()}`,
//         });

//         console.log('Cloudinary upload response:', uploadResponse);

//         if (!uploadResponse.secure_url) {
//           throw new Error('Cloudinary upload did not return a valid secure_url');
//         }

//         // Save prescription data in the database
//         const prescription = new Prescription({
//           patientId,
//           doctorId,
//           medicines: medicinesWithIds,
//           totalCost,
//           qrCodeData: uploadResponse.secure_url, // Store the Cloudinary URL
//         });

//         await prescription.save();
//         console.log('Prescription saved to database');

//         // Send response to client
//         res.status(201).json({
//           success: true,
//           message: 'Prescription PDF generated and stored successfully',
//           qrCodeData: uploadResponse.secure_url,
//         });

//         // Cleanup: Delete local PDF file
//         fs.unlinkSync(pdfPath);
//         console.log('Deleted local PDF file');
//       } catch (error) {
//         console.error('Error uploading PDF to Cloudinary:', error);
//         res.status(500).json({ success: false, error: 'Failed to upload PDF to Cloudinary' });
//       }
//     });
//   } catch (error) {
//     console.error('Error generating prescription:', error);
//     res.status(500).json({ success: false, error: error.message || 'Failed to generate prescription' });
//   }
// };
//                   MAIN BELOW ======================================================================================
// const sendPrescription = async (req, res) => {
//   const { patientPhone, qrCodeData } = req.body;

//   // Debugging: Log the request body
//   console.log('Request Body:', req.body);

//   // Validate phone number
//   if (!parsePhoneNumberFromString(patientPhone)?.isValid()) {
//     return res.status(400).json({
//       success: false,
//       error: 'Invalid phone number. Please include the country code (e.g., +1234567890).',
//     });
//   }

//   // Validate QR code data
//   if (!qrCodeData) {
//     return res.status(400).json({
//       success: false,
//       error: 'Missing QR code data.',
//     });
//   }

//   try {
//     // Debugging: Log Twilio credentials
//     console.log('Twilio Credentials:', {
//       accountSid: process.env.TWILIO_SID,
//       authToken: process.env.TWILIO_AUTH_TOKEN,
//     });

//     // Send the PDF URL via Twilio as an MMS message
//     const message = await client.messages.create({
//       body: 'Your prescription PDF is attached.',
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: patientPhone,
//       mediaUrl: qrCodeData,
//     });

//     res.status(200).json({
//       success: true,
//       message: 'Prescription sent successfully',
//       twilioMessageId: message.sid,
//     });
//   } catch (error) {
//     console.error('Twilio Error:', error.message, error.code, error.moreInfo);
//     res.status(500).json({ success: false, error: 'Failed to send prescription' });
//   }
// };

// const { parsePhoneNumberFromString } = require('libphonenumber-js');

const sendPrescription = async (req, res) => {
  const { patientPhone, qrCodeData } = req.body;

  // Validate the request payload
  if (!patientPhone || !qrCodeData) {
    console.error('Missing required fields:', { patientPhone, qrCodeData });
    return res.status(400).json({ success: false, error: 'Missing patient phone number or QR code data' });
  }

  try {
    // Initialize Twilio client
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    // Log the payload for debugging
    console.log('Sending prescription to:', patientPhone);
    console.log('QR Code Data:', qrCodeData);

    // Send the prescription via Twilio
    const message = await client.messages.create({
      body: `Your prescription is ready. Click the link to view: ${qrCodeData}`,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      to: patientPhone, // Patient's phone number
    }).then(message => console.log('Message SID:', message.sid));

    console.log('Twilio Response:', message.sid);
    

   

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Prescription sent successfully',
      twilioMessageId: message.sid,
    });
  } catch (error) {
    console.error('Twilio Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to send prescription',
      details: error.message,
    });
  }
};


module.exports = {
     generateAndStorePrescription,
    sendPrescription,}
