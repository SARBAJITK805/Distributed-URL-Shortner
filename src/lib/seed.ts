import {UserTier } from "@prisma/client";
import { randomBytes } from "crypto";
import prisma from "./prisma.js";

function generateApiKey(): string {
  return randomBytes(32).toString("hex");
}

function generateShortCode(length: number = 6): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

async function main() {
  console.log("🌱 Starting seed...");
  console.log("📡 Connecting to database...");

  // Clean existing data
  await prisma.url.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const freeUser = await prisma.user.create({
    data: {
      email: "free@example.com",
      apiKey: generateApiKey(),
      tier: UserTier.FREE,
    },
  });

  const proUser = await prisma.user.create({
    data: {
      email: "pro@example.com",
      apiKey: generateApiKey(),
      tier: UserTier.PRO,
    },
  });

  console.log("✅ Created users:");
  console.log(`   Free: ${freeUser.email}`);
  console.log(`   Pro: ${proUser.email}`);

  // Create URLs
  await prisma.url.createMany({
    data: [
      {
        shortCode: "github",
        originalUrl: "https://github.com",
        isCustom: true,
        userId: freeUser.id,
        clickCount: 150n,
      },
      {
        shortCode: "docs",
        originalUrl: "https://prisma.io/docs",
        isCustom: true,
        userId: proUser.id,
        clickCount: 500n,
      },
      {
        shortCode: generateShortCode(),
        originalUrl: "https://twitter.com",
        isCustom: false,
        clickCount: 89n,
      },
    ],
  });

  const totalUsers = await prisma.user.count();
  const totalUrls = await prisma.url.count();

  console.log("\n📊 Summary:");
  console.log(`   Users: ${totalUsers}`);
  console.log(`   URLs: ${totalUrls}`);
  console.log("\n✨ Seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });