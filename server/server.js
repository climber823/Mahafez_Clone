// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/trading-dashboard', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/api/data', (req, res) => {
  // Fetch data from the database
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
