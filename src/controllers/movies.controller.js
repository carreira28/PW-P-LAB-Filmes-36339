const movieService = require("../services/movies.service");
const directorService = require("../services/director.service");

const getAllMovies = async (req, res, next) => {
  try {
    const { page, limit, sort } = req.query;
    // Passa o userId do utilizador autenticado para filtrar os seus filmes
    const userId = req.user.userId;
    const result = await movieService.getAllMovies({ page, limit, sort, userId });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const searchMovies = async (req, res, next) => {
  try {
    const { title } = req.query;

    if (!title || String(title).trim() === "") {
      return res.status(400).json({
        message: "O parâmetro de pesquisa 'title' é obrigatório.",
      });
    }

    const movies = await movieService.searchMovies(title);
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

const getMovieById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const movie = await movieService.getMovieById(id);

    if (!movie) {
      return res.status(404).json({ message: "Filme não encontrado." });
    }

    res.json(movie);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const { title, releaseYear, directorId } = req.body;

    if (!title || !releaseYear || !directorId) {
      return res.status(400).json({
        message: "Os campos 'title', 'releaseYear' e 'directorId' são obrigatórios.",
      });
    }

    const director = await directorService.getDirectorById(parseInt(directorId));
    if (!director) {
      return res.status(404).json({ message: "Director não encontrado." });
    }

    const movie = await movieService.createMovie({
      title: String(title).trim(),
      releaseYear: parseInt(releaseYear),
      directorId: parseInt(directorId),
      userId: req.user.userId, // associa o filme ao utilizador autenticado
    });

    res.status(201).json(movie);
  } catch (err) {
    next(err);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const existing = await movieService.getMovieById(id);

    if (!existing) {
      return res.status(404).json({ message: "Filme não encontrado." });
    }

    const { title, releaseYear, directorId } = req.body;

    if (directorId !== undefined) {
      const director = await directorService.getDirectorById(parseInt(directorId));
      if (!director) {
        return res.status(404).json({ message: "Director não encontrado." });
      }
    }

    const data = {};
    if (title !== undefined) data.title = String(title).trim();
    if (releaseYear !== undefined) data.releaseYear = parseInt(releaseYear);
    if (directorId !== undefined) data.directorId = parseInt(directorId);

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "É necessário fornecer pelo menos um campo para actualizar.",
      });
    }

    const movie = await movieService.updateMovie(id, data);
    res.json(movie);
  } catch (err) {
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const existing = await movieService.getMovieById(id);

    if (!existing) {
      return res.status(404).json({ message: "Filme não encontrado." });
    }

    await movieService.deleteMovie(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllMovies,
  searchMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};