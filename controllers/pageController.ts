import { RequestHandler } from 'express';


export const getIndexPage :RequestHandler = (req, res) => {
  res.status(200).render('index', {
    pageName: 'Homepage',
    token: req.session.token,
  });
};

export const getAuthPage:RequestHandler = (req, res) => {
  res.status(200).render('auth', {
    pageName: 'Auth',
  });
};

export const getDashboardPage:RequestHandler = (req, res) => {
  res.status(200).render('dashboard', {
    pageName: 'Dashboard',
  });
};
