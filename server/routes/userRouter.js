const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const path = require('path');

const User = require('../models/models.js');
const userController = require('../controllers/userController.js');
const shelterController = require('../controllers/shelterController.js');
const humanController = require('../controllers/humanController.js');

const router = express.Router();

// const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecretkey';
router.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname,'../../src/index.html'))
});

//generic login on landing page
router.post('/signup', 
    userController.signup,
    (req, res) => {
      return res.status(200).json(res.locals.body);
      //inside the client side, after the fetch request we .then(data => if data.isOrg then fetch post shelter request else fetch post human request)
});

router.post('/login', 
  userController.login, 
  async (req, res, next) => {
    if (res.locals.isOrg) { return shelterController.login(req, res, next); }
    else { return humanController.login(req, res, next); }
  },
  (req, res) => {
    console.log(res.locals);
    return res.status(200).json(res.locals);
  }
);


module.exports = router;