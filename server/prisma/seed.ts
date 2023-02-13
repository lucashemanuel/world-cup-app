import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Fulano de Tal",
      email: "fulano@gmail.com",
      avatarUrl: "https://github.com/lucashemanuel.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Bolão para teste",
      code: "POOL10",
      ownerId: user.id,
      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2023-02-11T17:04:39.883Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "BR",
    },
  });

  await prisma.game.create({
    data: {
      date: "2023-02-15T17:04:39.883Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "AR",
      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 0,
          participant: {
            connect: {
              poolId_userId: {
                poolId: pool.id,
                userId: user.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
