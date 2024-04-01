const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const passport = require('passport');
const Userlandlords = require('../models/userlandlords');

// router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.get('/getUser',  passport.authenticate("jwt", { session: false }), AuthController.getUser);

router.post('/signup', async (req, res, next) => {
    try {
      const userlandlords = new Userlandlords(req.body);
      await userlandlords.save();
      res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
      next(createError(500, error.message)); 
    }
  });

module.exports = router;

//test