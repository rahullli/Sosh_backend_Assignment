// Schema file add krni h 
const users = require("../models/userSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();


// Register Logic
exports.user_register = async ( req , res)=>{
    
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new users({
          username: req.body.username,
          email: req.body.email,
          password: hashedPass,
        }); 
        const user = await newUser.save();
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ user, token });
    } 
    catch (err) {
        res.status(500).json(err);
     }
}

// Login Logic 

exports.user_login = async ( req , res)=>{
    
    try {
        const user = await users.findOne({ username: req.body.username });
        if (!user) {
          return res.status(400).json({ error: "Username Not Matched !" });
        }

        const validated = await bcrypt.compare(req.body.password, user.password);
        if(!validated){
          res.status(400).json({ error: "Wrong Password!"});
        }

        // console.log(user._id);
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const { password, ...others } = user._doc;
        res.status(200).header("Authorization", token).json({ ...others, token });
      } catch (err) {
        res.status(500).json(err);
      }
}
