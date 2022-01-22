const router = require('express').Router();
import {getIndexPage, getAuthPage, getDashboardPage} from '../controllers/pageController';
import {requireAuth} from '../middlewares/authMiddleware';
import {redirect} from '../middlewares/redirectMiddleware';

router.get('/', getIndexPage);
router.route('/auth').get(redirect, getAuthPage);
//* Below dashboard requires jwt validation, it will not go to dash board once jwt expires which I set on 15 seconds for trying
router.get(
  '/dashboard',
  requireAuth,
  getDashboardPage
);
 
export default router;
