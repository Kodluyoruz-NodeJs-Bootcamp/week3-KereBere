import express from 'express';
const router = express.Router();
import {register, login, logout} from '../controllers/authController';
import { body } from 'express-validator';
import User from '../models/User';  

//* Check if user input is valid, if valid go to register
router.route('/register').post(
  [
    body('name').not().isEmpty().withMessage('Please enter your name'),
    body('username').not().isEmpty().withMessage('Please enter your username'),
    body('email')
      .isEmail()
      .withMessage('Please enter your email')
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject('Email is already taken');
          }
        });
      }),
    body('password').not().isEmpty().withMessage('Please add a passwprd'),
  ],
  register
);
router.post('/login', login);
router.route('/logout').get(logout);

export default router;
