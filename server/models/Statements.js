const mongoose = require('mongoose');

const StatementSchema = new mongoose.Schema({
  account_id : {
    type: String,
  },
  open_time: {
    type: Date
  },
  action: {
    type: String,
  },
  more_details: {
    type: String,
  },
  amount: {
    type: Number,
  },
});

module.exports = mongoose.model('Statements', StatementSchema);
