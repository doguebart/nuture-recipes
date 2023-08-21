const jwt = require("jsonwebtoken");

const createUserToken = async (user, req, res) => {
  const token = jwt.sign(
    {
      name: user.name,
      id: user._id,
    },
    "jasogfiuasfgauisfuiGSOgad9o8uGSGasas"
  );

  res.status(200).json({
    message: "Você esta autenticado!",
    token,
    userId: user._id,
  });
};

module.exports = createUserToken;
