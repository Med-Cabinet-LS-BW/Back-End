const router = require('express').Router();

const restricted = require('../auth/requires.auth.middleware.js');

const authRouter = require('../auth/auth.router.js');
const strainsRouter = require('../strains/strains.router.js');
const usersRouter = require('../users/users.router.js');

router.get('/', (req, res) => {
  res.status(200).json({ message: `api is up` });
});

router.use('/auth', authRouter);
router.use('/strains', restricted, strainsRouter);
router.use('/users', restricted, usersRouter);

module.exports = router;
