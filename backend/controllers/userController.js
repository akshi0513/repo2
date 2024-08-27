const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const secretKey = "hello"

const generateToken = (id) => {
   return jwt.sign({ id }, secretKey, {
      expiresIn: '30d',
   });
};



exports.registerUser = async (req, res) => {
 

  try {
   const { username, password, role } = req.body;
    
   const user = new User ({
      username : username,
      password : password,
      role : role 
      
   });
   await user.save();
   const token = generateToken(user._id)
   res.status(201).json({
      success: true,
      token: token,
      data: user
   })
} catch(err) {
      res.status(500).json({
         success: false,
         message: err.message

      })
   }
}
    
  

exports.authUser = async (req, res) => {
  const { username, password} = req.body;

  try{
   const user = await User.findOne({ username})

   if(user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      res.json({
         success: true,
         token: token,
         data: user
      })
   }
  } catch(err) {
   res.status(500).json({
      success: false,
      message: err.message
   })
  }
}
