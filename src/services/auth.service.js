const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/prismaClient");

const SALT_ROUNDS = 10;

const signup = async ({ name, email, password }) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    const err = new Error("Este email já está registado.");
    err.status = 409;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const signin = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  const invalidError = new Error("Credenciais inválidas.");
  invalidError.status = 401;

  if (!user) throw invalidError;

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw invalidError;

  // Inclui o role no payload para o middleware de autorização poder validar
  const payload = { userId: user.id, email: user.email, role: user.role };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });

  return { token };
};

const getProfile = async (userId) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    const err = new Error("Utilizador não encontrado.");
    err.status = 404;
    throw err;
  }
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

module.exports = { signup, signin, getProfile };