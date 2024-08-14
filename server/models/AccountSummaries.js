const mongoose = require('mongoose');

const AccountSummarySchema = new mongoose.Schema({
  account_id : {
    type: String,
  },
  deposits: {
    type: Number,
  },
  withdrawals: {
    type: Number,
  },
  cancelled_withdrawals: {
    type: Number,
  },
  closed_trade_profit: {
    type: Number,
  },
  closed_trade_loss: {
    type: Number,
  },
});

module.exports = mongoose.model('AccountSummaries', AccountSummarySchema);
