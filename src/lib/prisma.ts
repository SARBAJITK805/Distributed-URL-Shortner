import { PrismaClient } from "../generated/prisma/client.js";

const prismaClientSingleton = () => {
  return new PrismaClient({
    accelerateUrl: process.env.PRISMA_ACCELERATE_URL ?? "",
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
};

declare global {
  var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export default prisma;