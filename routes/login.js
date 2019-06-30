const express = require('express');
const router = express.Router();
const Models = require('../models');
const passport = require('passport')

//show login form
router.get("/", (req, res) => res.render('login/index',{layout: false}));

router.post('/login',(req,res,next) => {
  passport.authenticate('local', { 
      successRedirect: '/invoices',
      failureRedirect: '/'
    })(req,res,next);
});

router.get("/random", (req, res) => res.render('login/register',{layout: false}));

router.post('/random',(req,res,next) => {
  console.log(req.body)
  let { firstName,lastName,email,userStatus,password } = req.body
  Models.User.create({firstName,lastName,email,userStatus,password})
  .then((user) => {res.send({message: user})})
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;