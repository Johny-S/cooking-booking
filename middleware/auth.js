const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  // Check for token
  if (!token) return res.status(401).json({ msg: 'User is unauthorized' });
  try {
    // Verify token
    const decoded = jwt.verify(token, 'myJwtSecret');
    // add user to payload
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(400).json({ msg: 'Token is not valid' });
  }
}

module.exports = auth;
