const router = require('express').Router();

const restricted = require('../auth/requires.auth.middleware.js');

const authRouter = require('../auth/auth.router.js');
const strainsRouter = require('../strains/strains.router.js');
const favoritesRouter = require('../favorites/favorites.router.js');
const treatmentsRouter = require('../treatments/treatments.router.js');

router.get('/', (req, res) => {
  res.status(200).json({ message: `api is up` });
});

router.use('/auth', authRouter);
router.use('/strains', restricted, strainsRouter);
router.use('/favorites', restricted, favoritesRouter);
router.use('/treatments', restricted, treatmentsRouter);

module.exports = router;
