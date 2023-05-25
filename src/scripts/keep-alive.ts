import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};
 const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:["query", "error", "warn"]
  });

const runQuery = async function() {
  await prisma.post.create({ data :{ authorId: 'user_2PQvKL1HvZ4dyalz0bGOfjP7EPX', content:'⏳' }})

}
const start = async function() {
 await runQuery();
}

// Call start
start();

