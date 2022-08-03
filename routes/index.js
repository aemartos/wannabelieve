import express from 'express';
import { isLoggedOut, isLoggedIn } from '../middlewares/isLogged.js';

const router = express.Router();

/* GET home page */
router.get('/', isLoggedOut('/map'), (req, res, next) => {
  res.render('index', { actual_page: 'initial_page' });
});


router.get('/info', isLoggedIn("/auth/login"), (req, res, next) => {
  res.render('info-page', { actual_page: 'info_page' });
});

export default router;
