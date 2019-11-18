const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const secret = process.env.JWT_SECRET;
    jwt.verify(token, secret, (err, decoded) => {
      if (err) res.status(401).json({ message: `Invalid Credentials` });
      else {
        req.docodedToken = decoded;
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};
