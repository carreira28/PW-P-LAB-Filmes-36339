const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido" });
        }
        req.user = user;
        next();
    });
};

module.exports = (err, req, res, next) => {
  console.error("[ERRO]", err);

  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err.code === "P2002") {
    return res.status(409).json({ message: "Registo duplicado: campo único já existe." });
  }

  if (err.code === "P2025") {
    return res.status(404).json({ message: "Registo não encontrado." });
  }

  res.status(500).json({ message: "Erro interno no servidor." });
};
