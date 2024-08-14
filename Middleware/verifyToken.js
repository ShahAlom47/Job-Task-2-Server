const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).send({ message: 'Unauthorized access' });
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).send({ message: 'Unauthorized access' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).send({ message: 'Token expired' });
        }
        return res.status(403).send({ message: 'Forbidden access' });
      }
      req.email = decoded.data;
      next();
    });
  };

  module.exports = verifyToken;