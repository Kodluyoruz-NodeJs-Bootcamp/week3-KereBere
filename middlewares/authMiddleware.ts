import jwt from 'jsonwebtoken';
import User from '../models/User';
import {RequestHandler} from "express"

//*Check & verify jwt validation
export const requireAuth : RequestHandler  =  (req, res, next) => {
  const token = req.cookies.jwt;
    try{
     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
      req.body = decoded
      next()
    }
    catch(err){
      req.flash(
      'error',
      'You have no token or your token expired, please login or register'
    ); 
    req.session.userID = ""
    res.redirect('/auth');
  }
   
};
 