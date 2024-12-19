import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export function createPrismaClient(dbUrl: string) {
  return new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
  }).$extends(withAccelerate());
}
