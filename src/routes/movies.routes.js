const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movies.controller");

router.get("/search", movieController.searchMovies);

router.get("/",movieController.getAllMovies);

router.get("/:id",movieController.getMovieById);

router.post("/",movieController.createMovie);

router.put("/:id",movieController.updateMovie);

router.delete("/:id",movieController.deleteMovie);

module.exports = router;