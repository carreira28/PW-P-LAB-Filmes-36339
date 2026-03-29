const prisma = require("../prisma/prismaClient");

const getAllDirector = async (skip, take, sortField) => {
    return await prisma.director.findMany({
    skip,
    take,
    orderBy: { [sortField]: "asc" },
    include: { _count: { select: { movies: true } } }
  });
};