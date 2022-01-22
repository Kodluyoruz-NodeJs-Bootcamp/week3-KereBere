import User from '../models/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { RequestHandler } from 'express';

//* JWT token - 3 days
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id: any) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: '15s',
  });
};

export const register :RequestHandler = async (req, res) => {
  try {
    // const { name, username, email, password, password2 } = req.body;
    //* Create the user
    const user = await User.create(req.body);
    const token = createToken(user._id);
    req.session.userID = user._id;
    req.session.token = token;
    //* httpOnly: true add to cookie for security
    //* Set jwt cookie
    res.cookie('jwt', token);
    res.status(201).redirect('/');
  } catch (err) {
    //* Error handling
    const errors = validationResult(req);
    console.log(errors);
    for (let i = 0; i < errors.array().length; i++) {
      req.flash('error', `${errors.array()[i].msg}`);
    }
    res.status(400).redirect('/auth');
  }
};
export const login :RequestHandler  = async (req, res) => {
  try {
    const { email, password } = req.body;

    User.findOne({ email }, (err: any, user: { password: any; _id: any; }) => {
      if (user) {
        bcrypt.compare(password, user.password, (err: any, same: any) => {
          if (same) {
            req.session.userID = user._id;
            const token = createToken(user._id);
            //* httpOnly: true add to cookie for security
            res.cookie('jwt', token);
            req.session.token = token;
            res.status(200).redirect('/');
          } else {
            req.flash('error', 'Wrong Password');
            res.status(400).redirect('/auth');
          }
        });
      } else {
        req.flash('error', 'User does not exist');
        res.status(400).redirect('/auth');
      }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', err });
  }
};


//* Clear cookies, destros session & logout
export const logout :RequestHandler  = (req, res) => {
  req.session.destroy(() => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/auth');
  });
};
