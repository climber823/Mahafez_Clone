const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

const Users = require('../models/Users');
const Statements = require('../models/Statements');
const PendingOrders = require('../models/PendingOrders');
const OpenPositions = require('../models/OpenPositions');
const ClosedPositions = require('../models/ClosedPositions');
const AccountSummaries = require('../models/AccountSummaries');

const userData = require('../mock/UserData');
const statementData = require('../mock/StatementData');
const pendingOrderData = require('../mock/PendingOrderData');
const openPositionData = require('../mock/OpenPositionData');
const closedPositionData = require('../mock/ClosedPositionData');
const accountSummaryData = require('../mock/AccountSummaryData');

dotenv.config();

const feedData = async () => {
  for (let user of userData) {
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = new Users(user)
    try { await newUser.save() } catch(err) {}
  }
  for (let statement of statementData) {
    console.log(statement)
    const newStatement = new Statements(statement)
    try { await newStatement.save() } catch(err) {}
  }
  for (let pendingOrder of pendingOrderData) {
    const newPendingOrder = new PendingOrders(pendingOrder)
    try { await newPendingOrder.save() } catch(err) {}
  }
  for (let openPosition of openPositionData) {
    const newOpenPosition = new OpenPositions(openPosition)
    try { await newOpenPosition.save() } catch(err) {}
  }
  for (let closedPosition of closedPositionData) {
    const newClosedPosition = new ClosedPositions(closedPosition)
    try { await newClosedPosition.save() } catch(err) {}
  }
  for (let accountSummary of accountSummaryData) {
    const newAccountSummary = new AccountSummaries(accountSummary)
    try { await newAccountSummary.save() } catch(err) {}
  }
  
  console.log('Database feeding completed');
}

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI_CLOUD)
    await mongoose.connect(process.env.MONGO_URI_CLOUD, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
    await feedData();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
