const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const Statements = require('../models/Statements');
const PendingOrders = require('../models/PendingOrders');
const OpenPositions = require('../models/OpenPositions');
const ClosedPositions = require('../models/ClosedPositions');
const AccountSummaries = require('../models/AccountSummaries');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { account_id, password } = req.body;
  try {
    const user = await Users.findOne({ account_id });
    if (!user) return res.status(400).json({ message: 'User not found' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    const tableInfo = {
      statements: await Statements.find({account_id}),
      pendingOrders: await PendingOrders.find({account_id}),
      openPositions: await OpenPositions.find({account_id}),
      closedPositions: await ClosedPositions.find({account_id}),
      accountSummaries: await AccountSummaries.find({account_id}),
    }
    
    res.json({ 
      token,
      user,
      tableInfo,
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
