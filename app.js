const cookieParser = require('cookie-parser');
const express = require('express');
const httpErrors = require('http-errors');
const logger = require('morgan');
const path = require('path');
const { connect } = require('mongoose');

const authRouter = require('./routes/auth');
const venuesRouter = require('./routes/venues');
const reservationsRouter = require('./routes/reservations');
const keyRouter = require('./routes/key');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require('dotenv').config();
// db
const uri = process.env.DB_URI;
connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const corsMiddleware = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
};

app.use(corsMiddleware);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRouter);
app.use('/api/venues', venuesRouter);
app.use('/api/reservations', reservationsRouter);
app.use('/api/key', keyRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});


module.exports = app;
