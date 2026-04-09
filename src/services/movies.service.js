const prisma = require("../prisma/prismaClient");

const getAllMovies = async ({ page = 1, limit = 10, sort, userId } = {}) => {
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const allowedSortFields = ["id", "title", "releaseYear", "directorId"];
  const orderBy = sort && allowedSortFields.includes(sort)
    ? { [sort]: "asc" }
    : { id: "asc" };

  // Se userId for fornecido, filtra apenas os filmes desse utilizador
  const where = userId ? { userId } : {};

  const [movies, total] = await prisma.$transaction([
    prisma.movie.findMany({
      skip,
      take: limitNum,
      orderBy,
      where,
      include: { director: true },
    }),
    prisma.movie.count({ where }),
  ]);

  return {
    data: movies,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    },
  };
};

const getMovieById = async (id) => {
  return await prisma.movie.findUnique({
    where: { id },
    include: { director: true },
  });
};

const searchMovies = async (title) => {
  return await prisma.movie.findMany({
    where: {
      title: { contains: title, mode: "insensitive" },
    },
    include: { director: true },
    orderBy: { title: "asc" },
  });
};

const createMovie = async (data) => {
  return await prisma.movie.create({
    data,
    include: { director: true },
  });
};

const updateMovie = async (id, data) => {
  return await prisma.movie.update({
    where: { id },
    data,
    include: { director: true },
  });
};

const deleteMovie = async (id) => {
  return await prisma.movie.delete({ where: { id } });
};

module.exports = {
  getAllMovies,
  getMovieById,
  searchMovies,
  createMovie,
  updateMovie,
  deleteMovie,
};