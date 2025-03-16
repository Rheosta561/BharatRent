const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });
  
      const newUser = new User({ username, email, password });
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully", user: { username } });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  
  // Login
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  // Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Token from the Authorization header
  
    if (!token) {
      return res.status(401).json({ message: 'Token is missing or invalid' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
      }
  
      // Attach user info to the request object for use in the next route
      const user = await User.findById(decoded.id); // Get user by ID (from the decoded token)
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      req.user = user; // Attach the user to the request object
      next(); // Proceed to the next middleware or route handler
    });
  };
  
  // Get user details route
  router.get('/user-details', verifyToken, (req, res) => {
    // After the token is verified, the user info will be available in req.user
    const user = req.user;
  
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      // Add any other fields you want to expose from the user object
    });
  });
  

module.exports = router;
