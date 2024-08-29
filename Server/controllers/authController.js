const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
exports.register = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create and save the new user
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
      
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.log('Error during registration:', err.message); // Use err.message for accurate error details
      res.status(400).json({ message: 'Registration failed' });
    }
  };

  exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt:', email, password); // Add more debugging info if needed
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      
      // Check if the user exists and the password matches
      if (!user || !(await user.comparePassword(password))) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log(token)
      console.log("logijnn")
      res.json({ token });

    } catch (err) {
      console.error('Error during login:', err.message); // Log the exact error message
      res.status(500).json({ message: 'Internal server error' });
    }
  };

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
