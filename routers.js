const express = require('express');
const app = express();
// const listingRoutes = require('./routes/listing');
const authRoutes = require('./routes/auth');


app.use('/auth', authRoutes);
// app.use('/listing', listingRoutes);

// app.use('/reservation',reservationRoutes);

module.exports = app;
  