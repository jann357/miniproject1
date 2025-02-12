

const express = require('express');
const cors = require('cors');
const app= express();
require('dotenv').config()
const db = require("./config/db");

app.use(cors());
app.use(express.json());
const userRoute = require('./routes/userRoute');
app.use('/api/user',userRoute);
const medicineRoute = require('./routes/medicineRoute');
app.use('/api/', medicineRoute);
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000',  // Allow React app to make requests to the backend
    methods: 'GET,POST',  // Allow specific HTTP methods
    allowedHeaders: 'Authorization, Content-Type',
}));
app.listen(port, () => console.log(`listening  ${port}`));