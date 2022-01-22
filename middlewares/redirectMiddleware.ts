import {RequestHandler} from "express"

//* Chech if user already logged in when tries to log in
export const redirect : RequestHandler  = (req, res, next) => {
  if (req.session.userID) {
    return res.redirect('/');
  }
  next();
};
