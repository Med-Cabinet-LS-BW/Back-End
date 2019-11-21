const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: `hello from ${req.originalUrl}` });
});

module.exports = router;
