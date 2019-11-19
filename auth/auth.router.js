const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const Users = require('../users/users.model.js');

router.post(
  '/register',
  [check('email').isEmail(), check('password').isLength({ min: 8 })],
  async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    console.log(req.body);
    console.log(errors);

    if (!errors.isEmpty()) {
      res.status(422).json({
        message: `One or more`,
        errors: errors.array(),
      });
    }

    // candidate for custom middleware
    const duplicateUser = await Users.findBy({ email }).first();
    if (duplicateUser) {
      res
        .status(400)
        .json({ message: `A user with that email address already exists.`, duplicateUser });
    } else {
      try {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, async (err, hash) => {
            const user = await Users.create({
              email,
              password: hash,
            });
            const token = getJwtToken(email);
            res.status(200).json({ user, token });
          });
        });
      } catch (error) {
        res.status(500).json({
          message: `There was an error saving the user to the database. Retry the register request.`,
          error,
        });
      }
    }
  }
);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findBy({ email }).first();
    if (!user) {
      res
        .status(404)
        .json({ message: `User with provided credentials not found`, user: { email, password } });
    } else {
      bcrypt.compare(password, user.password, async (err, match) => {
        if (match) {
          const token = getJwtToken(user.email);
          const userData = await Users.findById(user.id);
          res
            .status(200)
            .json({ message: `Welcome back ${user.email}!`, user: { ...userData }, token });
        } else {
          res.status(401).json({ message: `You shall not pass!` });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: `error retrieving user from db`, error });
  }
});

function getJwtToken(email) {
  const payload = {
    email,
  };
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
