const directorService = require("../services/director.service");

const getAllDirectors = async (req, res, next) => {
  try {
    const directors = await directorService.getAllDirectors();
    res.json(directors);
  } catch (err) {
    next(err);
  }
};

const getDirectorById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const director = await directorService.getDirectorById(id);

    if (!director) {
      return res.status(404).json({ message: "Director não encontrado." });
    }

    res.json(director);
  } catch (err) {
    next(err);
  }
};

const createDirector = async (req, res, next) => {
  try {
    const { name, birthYear } = req.body;

    if (!name || !birthYear) {
      return res.status(400).json({
        message: "Os campos 'name' e 'birthYear' são obrigatórios.",
      });
    }

    const director = await directorService.createDirector({
      name: String(name).trim(),
      birthYear: parseInt(birthYear),
    });

    res.status(201).json(director);
  } catch (err) {
    next(err);
  }
};

const updateDirector = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const existing = await directorService.getDirectorById(id);

    if (!existing) {
      return res.status(404).json({ message: "Director não encontrado." });
    }

    const { name, birthYear } = req.body;
    const data = {};
    if (name !== undefined) data.name = String(name).trim();
    if (birthYear !== undefined) data.birthYear = parseInt(birthYear);

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "É necessário fornecer pelo menos um campo para actualizar.",
      });
    }

    const director = await directorService.updateDirector(id, data);
    res.json(director);
  } catch (err) {
    next(err);
  }
};

const deleteDirector = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const existing = await directorService.getDirectorById(id);

    if (!existing) {
      return res.status(404).json({ message: "Director não encontrado." });
    }

    if (existing._count.movies > 0) {
      return res.status(409).json({
        message: `Não é possível eliminar o director "${existing.name}" porque tem ${existing._count.movies} filme(s) associado(s).`,
      });
    }

    await directorService.deleteDirector(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const getDirectorMovies = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const existing = await directorService.getDirectorById(id);

    if (!existing) {
      return res.status(404).json({ message: "Director não encontrado." });
    }

    const movies = await directorService.getDirectorMovies(id);
    res.json({ director: existing.name, movies });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllDirectors,
  getDirectorById,
  createDirector,
  updateDirector,
  deleteDirector,
  getDirectorMovies,
};
