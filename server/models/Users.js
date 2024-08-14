const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  account_id: {
    type: String,
    required: true,
    unique: true, 
  },
  account_type: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: "",
  },
  balance: {
    type: Number,
    default: 0.0,
  },
  equity: {
    type: Number,
    default: 0.0,
  },
  free_margin: {
    type: Number,
    default: 0.0,
  },
  bonuses_sum: {
    type: Number,
    default: 0.0,
  },
  email: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  market_status: {
    type: String,
    default: "OPEN",
  },
  phone: {
    type: String,
    required: true,
  },
  used_margin: {
    type: Number,
    required: true,
    default: 0,
  },
  margin_level: {
    type: Number,
    required: true,
    default: 0,
  },
  withdrawals_count: {
    type: Number,
    required: true,
    default: 0,
  },
  password: {
    type: String,
    required: true,
  },
  p_l: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Users', UserSchema);
