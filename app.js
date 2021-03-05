require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');

const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

require('./configs/passport');

mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: 'none',
      secure: true,
      // sameSite: true, //back and front in the same host -> localhost
      // secure: false, //not using https
      httpOnly: true, // site only on http
      maxAge: 60000 //cookie time to live
    },
    rolling: true //session gets refreshed
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_HOSTNAME]
  })
);

const index = require('./routes/index');
app.use('/', index);

const project = require('./routes/project');
app.use('/api', project);

const auth = require('./routes/auth-routes');
app.use('/api', auth);

module.exports = app;
