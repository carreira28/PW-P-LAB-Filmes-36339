const authService = require("../services/auth.service");

const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Os campos 'name', 'email' e 'password' são obrigatórios.",
      });
    }

    if (String(password).length < 6) {
      return res.status(400).json({
        message: "A password deve ter pelo menos 6 caracteres.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Formato de email inválido." });
    }

    const user = await authService.signup({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      password,
    });

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};


const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Os campos 'email' e 'password' são obrigatórios.",
      });
    }

    const result = await authService.signin({
      email: String(email).trim().toLowerCase(),
      password,
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await authService.getProfile(req.user.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, signin, getProfile };
