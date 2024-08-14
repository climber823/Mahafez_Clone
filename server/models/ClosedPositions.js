const mongoose = require('mongoose');

const ClosedPositionSchema = new mongoose.Schema({
  account_id : {
    type: String,
  },
  deal_id: {
    type: Number,
    unique: true,
  },
  commission: {
    type: Number
  },
  asset: {
    type: String,
  },
  direction: {
    type: String,
  },
  deal_amount: {
    type: Number,
  },
  open_time: {
    type: Date,
  },
  closing_date: {
    type: Date,
  },
  open_rate: {
    type: Number,
  },
  close_rate: {
    type: Number,
  },
  p_l : {
    type: Number,
  }
});

module.exports = mongoose.model('ClosedPositions', ClosedPositionSchema);
