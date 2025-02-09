const express = require('express');
const cors = require('cors');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const authMiddleware = require('../middlewares/authMiddleware');
router.post('/register', async (req, res)=>{
    try {
        const userExists = await User.findOne({email: req.body.email});
        if(userExists){
             return res.status(200).send({
                message:'user already exists',success:false});
        }
       const password = req.body.password;
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);
       req.body.password = hashedPassword;
       const newuser = new User(req.body);
       await newuser.save();
       res.status(200).send({message:'user craeted successfully',success:true});
    }
    catch (error){
        console.log(error);
         res.status(500).send({message:'error creating user',success:false});
    }

    });
// router.post('/login', async (req, res) => {
//         try {
//             // Check if request body has email and password
//             if (!req.body.email || !req.body.password) {
//                 return res.status(400).send({
//                     message: 'Email and password are required',
//                     success: false
//                 });
//             }
    
//             // Find the user by email
//             const user = await User.findOne({ email: req.body.email });
//             if (!user) {
//                 return res.status(404).send({
//                     message: 'User does not exist',
//                     success: false
//                 });
//             }
    
//             // console.log('Found user:', user);
    
//             // Compare the password with the stored hash
//             const isMatch = await bcrypt.compare(req.body.password, user.password);
//             if (!isMatch) {
//                 return res.status(401).send({
//                     message: 'Incorrect password',
//                     success: false
//                 });
//             }
    
//             // Create a JWT token
//             const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//                 expiresIn: '1d',
//             });
    
//             res.status(200).send({
//                 message: 'Login successful',
//                 success: true,
//                 data: token
//             });
//         } catch (error) {
//             console.error('Error during login process:', error);
//             res.status(500).send({
//                 message: 'Login not successful',
//                 success: false,
//                 error: error.message,
//                 stack: error.stack  // Providing more insight into the error
//             });
//         }
//     });
    
router.post('/login',cors(), async (req, res) => {
    try {
        // Check if request body has email and password
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({
                message: 'Email and password are required',
                success: false
            });
        }

        // Find the user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({
                message: 'User does not exist',
                success: false
            });
        }

        // Compare the password with the stored hash
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                message: 'Incorrect password',
                success: false
            });
        }

        // Create a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(200).send({
            message: 'Login successful',
            success: true,
            data: token
        });
    } catch (error) {
        console.error('Error during login process:', error);
        res.status(500).send({
            message: 'Login not successful',
            success: false,
            error: error.message,
            stack: error.stack // Providing more insight into the error
        });
    }
});

// Connect your router to the app


// Set the server to listen on a port

// 1===== router.post('/login', async (req, res)=>{
    // try {
    //   const user = await User.findOne({email : req.body.email});
    // if(!user){
    //     return res.status(200).send({message:'user does not exsit',success: false});
    //   }
    // const isMatch = await bcrypt.compare(req.body.password,user.password);
    // if(!isMatch){
    //         return res.status(200).send({message:'passwoed is incorrect',success: false});
    // }
    // else{
    //     const token = jwt.sign({id : user._id},process.env.JWT_SECRET,{
    //         expiresIn:'1d',
    //     });
    //     res.status(200).send({message:'login succsssful',success:true, data:token});
    // }
    // }
    // catch (error){
    //     console.log(error);
    // res.status(500).send({message:'login not  succsssful',success: false, error});}
    // });
    //===================================
// router.post('get-user-info-by-id',authMiddleware, async(req,res)=>{
// try{
//     const user = await User.findOne({ _id : req.body.userId});
//     if(!user){
//         return res.status(200).send({
//             message:'user does not exsist',
//             success:false
//         });
//     }
//     else{
//         res.status(200).send({
//             success:true ,
//             data:{
//                 name : user.name,
//                 email:user.email,
//             },
//         });
//     }
// }
// catch(error){
// res.status(500).send({
//     message:'Error getting user info',success:false,error
// });
// }
// });  1
//==============
router.post('/get-user-info-by-id', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        if (!user) {
            return res.status(200).send({
                message: 'User does not exist',
                success: false
            });
        } else {
            res.status(200).send({
                success: true,
                data: {
                    name: user.name,
                    email: user.email,
                    
                

                },
            });
        }
    } catch (error) {
        res.status(500).send({
            message: 'Error getting user info',
            success: false,
            error,
        });
    }
});


// app.use('/api/user', router);

module.exports = router;