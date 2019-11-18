const router = require('express').Router();

const authRouter = require('../auth/auth.router.js');

router.get('/', (req, res) => {
  res.status(200).json({ message: `api is up` });
});

router.use('/auth', authRouter);

module.exports = router;
