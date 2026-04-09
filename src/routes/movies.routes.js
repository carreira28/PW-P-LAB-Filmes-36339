const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movies.controller");
const { authorizeRole } = require("../middlewares/auth.middleware");

router.get("/search", movieController.searchMovies);

router.get("/", movieController.getAllMovies);

router.get("/:id", movieController.getMovieById);

router.post("/", movieController.createMovie);

router.put("/:id", movieController.updateMovie);

// Apenas utilizadores com role ADMIN podem eliminar filmes
router.delete("/:id", authorizeRole("ADMIN"), movieController.deleteMovie);

module.exports = router;