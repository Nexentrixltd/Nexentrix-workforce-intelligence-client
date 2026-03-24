import { PrismaClient } from "@prisma/client";
import pg from "pg";
import dotenv from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash("HeavenlyFather#110", 10);

  const user = await prisma.user.upsert({
    where: { email: "darkerman001@nexius.com" },
    update: {},
    create: {
      email: "darkerman001@nexius.com",
      name: "Darker Man",
      passwordHash: password,
      role: "ADMIN",
      departmentId: "exec",
      emailVerified: new Date(),
      isFirstLogin: true,
      remember: false,
    },
  });

  console.log("✅ Default user created:");
  console.log("Email:", user.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
