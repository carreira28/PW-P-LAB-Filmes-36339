const prisma = require("../prisma/prismaClient");

const getAllDirectors = async () => {
  return await prisma.director.findMany({
    include: { _count: { select: { movies: true } } },
    orderBy: { name: "asc" },
  });
};

const getDirectorById = async (id) => {
  return await prisma.director.findUnique({
    where: { id },
    include: { _count: { select: { movies: true } } },
  });
};

const createDirector = async (data) => {
  return await prisma.director.create({ data });
};

const updateDirector = async (id, data) => {
  return await prisma.director.update({ where: { id }, data });
};

const deleteDirector = async (id) => {
  return await prisma.director.delete({ where: { id } });
};

const getDirectorMovies = async (directorId) => {
  return await prisma.movie.findMany({
    where: { directorId },
    orderBy: { releaseYear: "asc" },
  });
};

module.exports = {
  getAllDirectors,
  getDirectorById,
  createDirector,
  updateDirector,
  deleteDirector,
  getDirectorMovies,
};
