const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(403).send({ message: 'Acesso negado' });
  }

  const token = authorization.replace('Bearer ', '');

  const { NODE_ENV, JWT_SECRET } = process.env;

  try {
    const payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
    );

    req.user = payload;
    next();
  } catch (err) {
    return res.status(403).send({ message: 'Acesso negado' });
  }
};