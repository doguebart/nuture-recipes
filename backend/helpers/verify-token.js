const jwt = require("jsonwebtoken");
const getToken = require("../helpers/get-token");

const checkToken = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({
      message: "Acesso negado!",
    });
    return;
  }

  const token = getToken(req);

  if (!token) {
    res.status(401).json({
      message: "Acesso negado!",
    });
    return;
  }

  try {
    const verified = jwt.verify(token, "jasogfiuasfgauisfuiGSOgad9o8uGSGasas");
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({
      message: "Token inválido!",
    });
  }
};

module.exports = checkToken;
