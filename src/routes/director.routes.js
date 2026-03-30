const express = require("express");
const router = express.Router();
const directorController = require("../controllers/director.controller");
const { route } = require("./movies.routes");

router.get("/",directorController.getAllDirectors);

router.get("/:id",directorController.getDirectorById);

router.post("/",directorController.createDirector);

router.put("/:id",directorController.updateDirector);

router.delete("/:id",directorController.deleteDirector);

router.get("/:id/movies",directorController.getDirectorMovies);

module.exports = router;