

const express = require('express');
const cors = require('cors');
const app= express();
require('dotenv').config()
const db = require("./config/db");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
const userRoute = require('./routes/userRoute');
app.use('/api/user',userRoute);
const prescriptionRoutes = require('./routes/prescriptionRoute'); // import the routes
app.use('/api/prescription', prescriptionRoutes);
const medicineRoutes = require('./routes/medicineRoute');
app.use('/api/medicine', medicineRoutes);
const patientRoutes = require('./routes/patientRoute');
app.use('/api/patient', patientRoutes);
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000',  // Allow React app to make requests to the backend
    methods: 'GET,POST',  // Allow specific HTTP methods
    allowedHeaders: 'Authorization, Content-Type',
}));
app.listen(port, () => console.log(`listening  ${port}`));