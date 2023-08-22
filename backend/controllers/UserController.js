const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, password, cfPassword } = req.body;

    if (!name && !email && !password && !cfPassword) {
      res.status(422).json({
        message: "Preencha todos os campos antes de continuar! REGISTER",
      });
      return;
    }

    if (!name) {
      res.status(422).json({
        message: "Informe o seu Nome antes de continuar!",
      });
      return;
    }

    if (!email) {
      res.status(422).json({
        message: "Informe o seu E-mail antes de continuar!",
      });
      return;
    }

    if (!password) {
      res.status(422).json({
        message: "Você deve criar uma nova senha!",
      });
      return;
    }

    if (!cfPassword) {
      res.status(422).json({
        message: "Você deve confirmar a sua senha!",
      });
      return;
    }

    if (cfPassword !== password) {
      res.status(422).json({
        message: "As senhas não coincidem!",
      });
      return;
    }

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res.status(422).json({
        message: "Este E-mail já esta sendo utilizado!",
      });
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    try {
      const newUser = await user.save();
      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email && password) {
      res.status(422).json({
        message: "Preencha todos os campos antes de continuar! LOGIN",
      });
      return;
    }

    if (!email) {
      res.status(422).json({
        message: "Informe o e-mail antes de continuar!",
      });
      return;
    }

    if (!password) {
      res.status(422).json({
        message: "Informe a sua senha antes de continuar!",
      });
      return;
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(422).json({
        message: "Usuário não encontrado!",
      });
      return;
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      res.status(422).json({
        message: "Senha inválida!",
      });
      return;
    }

    await createUserToken(user, req, res);
  }

  static async getUserById(req, res) {
    const id = req.params.id;

    const user = await User.findOne({ _id: id }).select("-password");

    if (!user) {
      res.status(404).json({
        message: "Este usuário não existe!",
      });
    }

    res.status(200).json({
      user,
    });
  }

  static async checkuser(req, res) {
    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, "jasogfiuasfgauisfuiGSOgad9o8uGSGasas");

      currentUser = await User.findById(decoded.id).select("-password");
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  }

  static async editUser(req, res) {
    const id = req.params.id;

    const token = getToken(req);
    const user = await getUserByToken(token);

    const { name, email } = req.body;

    if (!name && !email) {
      res.status(422).json({
        message: "Preencha todos os campos antes de continuar! REGISTER",
      });
      return;
    }

    if (!name) {
      res.status(422).json({
        message: "Informe o seu nome antes de continuar!",
      });
      return;
    }

    if (!email) {
      res.status(422).json({
        message: "Informe o seu e-mail antes de continuar!",
      });
      return;
    }

    const userExist = await User.findOne({ email: email });

    if (user.email !== email && userExist) {
      res.status(422).json({
        message: "Este e-mail já está em uso!",
      });
      return;
    }

    user.name = name;
    user.email = email;

    try {
      await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      );
      res.status(200).json({
        message: "Usuário atualizado com sucesso!",
      });
    } catch (error) {
      res.status(500).json({
        message: error,
      });
      return;
    }
  }
};
