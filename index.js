const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config/db');
const routes = require('./routers');
const mongoose = require('mongoose');
const createError = require('http-errors');
require('./config/passport');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', routes);//

//db connection
mongoose.connect(config.db, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log('Error! ' + err);
  } else {
    console.log('Connected to mongodb');
  }
});

app.get('/', (req, res) => {
  res.json("Hi, this is EZrest APIs!!");
});


app.use((req, res, next) => {
  next(createError(404));
});

// app.use('/listing', listingRoutes);


// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  // render the error page
  res.status(statusCode);
  res.json({
    message: err.message,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
