const mongoose = require('mongoose');

const PendingOrderSchema = new mongoose.Schema({
  account_id : {
    type: String,
  },
  open_time: {
    type: Date
  },
  deal_type: {
    type: String,
  },
  order_rate: {
    type: Number,
  },
  market_rate: {
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

module.exports = mongoose.model('PendingOrders', PendingOrderSchema);
