require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 A iniciar seed...");

  await prisma.movie.deleteMany();
  await prisma.director.deleteMany();

  const kubrick = await prisma.director.create({
    data: { name: "Stanley Kubrick", birthYear: 1928 },
  });
  const nolan = await prisma.director.create({
    data: { name: "Christopher Nolan", birthYear: 1970 },
  });
  const villeneuve = await prisma.director.create({
    data: { name: "Denis Villeneuve", birthYear: 1967 },
  });
  const scorsese = await prisma.director.create({
    data: { name: "Martin Scorsese", birthYear: 1942 },
  });

  await prisma.movie.createMany({
    data: [
      { title: "2001: A Space Odyssey", releaseYear: 1968, directorId: kubrick.id },
      { title: "A Clockwork Orange",    releaseYear: 1971, directorId: kubrick.id },
      { title: "The Shining",           releaseYear: 1980, directorId: kubrick.id },
      { title: "Inception",             releaseYear: 2010, directorId: nolan.id },
      { title: "Interstellar",          releaseYear: 2014, directorId: nolan.id },
      { title: "The Dark Knight",       releaseYear: 2008, directorId: nolan.id },
      { title: "Memento",               releaseYear: 2000, directorId: nolan.id },
      { title: "Arrival",               releaseYear: 2016, directorId: villeneuve.id },
      { title: "Blade Runner 2049",     releaseYear: 2017, directorId: villeneuve.id },
      { title: "Dune",                  releaseYear: 2021, directorId: villeneuve.id },
      { title: "Goodfellas",            releaseYear: 1990, directorId: scorsese.id },
      { title: "The Departed",          releaseYear: 2006, directorId: scorsese.id },
    ],
  });

  console.log("✅ Seed concluído com sucesso!");
  console.log(`   → ${await prisma.director.count()} directores criados`);
  console.log(`   → ${await prisma.movie.count()} filmes criados`);
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
