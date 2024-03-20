const jwt = require('jsonwebtoken');

const SECRET = 'helpDask';

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const {tecnicoId} = jwt.verify(authorization, SECRET);
    if (!tecnicoId) return res.status(401).json("Não autorizado!");
    req.tecnicoId = tecnicoId;
    return next();
  } catch (error) {
    return res.status(401).json("Não autorizado!");
  }
};

module.exports = verifyToken;