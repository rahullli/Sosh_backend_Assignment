require('dotenv').config();
const jwt = require("jsonwebtoken");

 exports.authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({error: "Access denied. No token provided."});
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded;
        console.log(" decoded value : " , decoded);
        next();
    } catch (err) {
        res.status(400).json({error : "Invalid token."});
    }
};