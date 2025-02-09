const jwt = require('jsonwebtoken');

// module.exports = (req, res, next)=>{
// try{
//     const token = req.headers['authorization'].split(' ')[1];
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
//         if(err){
//             return res.status(401).send({
//                 message:'auth failed',
//                 success: false
//             });
//         }
//         else{
//             req.body.userId = decoded._id;
//             next();
//         }

//     });
// }
// catch(error){
//     return res.status(401).send({
//         message:'auth failed',
//         success: false
//     });
// }
// };

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).send({
                message: 'Authorization header is missing',
                success: false
            });
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) 
            {
                return res.status(401).send({
                    message: 'Auth failed',
                    success: false,
                });
            } else {
                req.body.userId = decoded.id;  // You can also use req.user if you'd prefer
                next();
            }
        });
    } catch (error) {
        return res.status(401).send({
            message: 'Auth failed',
            success: false,
        });
    }
};
