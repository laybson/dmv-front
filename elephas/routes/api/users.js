const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const User = require('../../models/User');

// @route GET api/users/test
// @desc Tests users routes
// @access Public
router.get('/test', (req, res) => res.json({msg: "Users Works"}));

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  User.findOne({email: req.body.email}).then((user) => {
    if (user) {
      return res.status(400).json({email: 'Email already exists'});
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err
          };
          newUser.password = hash;
          newUser.save().then((user) => res.json(user))
                        .catch(err => console.log(err));
        })
      })
    }
  });
});

// @route POST api/users/login
// @desc Login User
// @access Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // FInd user
  User.findOne({email}).then(user => {
    if(!user) {
      return res.status(404).json({email: 'User not found or password incorrect'});
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // res.json({msg: 'Success'});
        const payload = {id: user.id, name: user.name, avatar: user.avatar}
        jwt.sign(
          payload,
          keys.secretOrKey,
          {expiresIn: 7200},
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer '+ token
            })
          }
        );
      } else {
        return res.status(400).json({password: 'User not found or password incorrect'})
      }
    });
  });
});
module.exports = router;