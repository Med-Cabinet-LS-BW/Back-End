const router = require('express').Router();

const restricted = require('../auth/requires.auth.middleware.js');

const authRouter = require('../auth/auth.router.js');
const strainsRouter = require('../strains/strains.router.js');

router.get('/', (req, res) => {
  res.status(200).json({ message: `api is up` });
});

router.use('/auth', authRouter);
router.use('/strains', restricted, strainsRouter);

module.exports = router;
