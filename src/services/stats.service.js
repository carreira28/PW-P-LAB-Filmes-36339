const prisma = require("../prisma/prismaClient");

const getStats = async () => {
  const [totalMovies, totalDirectors] = await prisma.$transaction([
    prisma.movie.count(),
    prisma.director.count(),
  ]);

  const avgMoviesPerDirector =
    totalDirectors > 0
      ? parseFloat((totalMovies / totalDirectors).toFixed(2))
      : 0;

  return {
    totalMovies,
    totalDirectors,
    avgMoviesPerDirector,
  };
};

module.exports = { getStats };
