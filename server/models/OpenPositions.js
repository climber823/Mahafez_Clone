const mongoose = require('mongoose');

const OpenPositionSchema = new mongoose.Schema({
  account_id : {
    type: String,
  },
  deal_id: {
    type: Number,
    unique: true,
  },
  open_time: {
    type: Date,
  },
  deal_type: {
    type: String,
  },
  open_rate: {
    type: Number,
  },
  market_rate: {
    type: Number,
  },
  p_l : {
    type: Number,
  },
  stop_loss: {
    type: Number
  },
  take_profit: {
    type: Number
  },
  actions: {
    type: String,
  },
});

module.exports = mongoose.model('OpenPositions', OpenPositionSchema);
