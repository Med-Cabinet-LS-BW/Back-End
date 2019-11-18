const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: `api is up` });
});

module.exports = router;
