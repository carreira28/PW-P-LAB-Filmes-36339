require("dotenv").config();

const app = require("./app");

const PORT = process.env.SERVER_PORT || 3000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`✅ Servidor a correr em http://localhost:${PORT}`);
  });
}

module.exports = app;