const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const directorRoutes = require("./routes/director.routes");
const movieRoutes = require("./routes/movies.routes");
const statsRoutes = require("./routes/stats.routes");

const { authenticateToken } = require("./middlewares/auth.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/auth", authRoutes);
app.use("/directors", directorRoutes);
app.use("/movies", movieRoutes);
app.use("/stats", statsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

app.use(errorMiddleware);

module.exports = app;
