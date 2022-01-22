require('dotenv').config()
import mongoose from "mongoose";
import express from 'express';
import flash from 'connect-flash';
import session from 'express-session';
import pageRoute from './routes/pageRoute';
import authRoute from './routes/authRoute';
import cookieParser from 'cookie-parser';
import ejs from 'ejs';

const app = express();

//* Connect to DB
require('./config/database').connect();

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'Speak friend and enter',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);
//* Sending errors to UI
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});

//* Template engine settings
app.set('view engine', 'ejs'); 

//* Router
app.use('/', pageRoute);
app.use('/auth', authRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Started in port ${PORT}`);
});

