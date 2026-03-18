import { PrismaClient } from "@prisma/client";
import pg from "pg";
import dotenv from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";

dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });
export const departments = [
  {
    id: "exec",
    name: "Executive / Management",
    code: "EXEC",
    createdAt: new Date().toISOString(),
  },
  {
    id: "ops",
    name: "Operations",
    code: "OPS",
    createdAt: new Date().toISOString(),
  },
  {
    id: "fin",
    name: "Finance and Accounting",
    code: "FIN",
    createdAt: new Date().toISOString(),
  },
  {
    id: "hr",
    name: "Human Resources (HR)",
    code: "HR",
    createdAt: new Date().toISOString(),
  },
  {
    id: "csm",
    name: "Customer Support / Marketing",
    code: "CSM",
    createdAt: new Date().toISOString(),
  },
  {
    id: "legal",
    name: "Legal Compliance & Risk Management",
    code: "LEGAL",
    createdAt: new Date().toISOString(),
  },
];

async function main() {
  await prisma.department.createMany({
    data: departments,
    skipDuplicates: true,
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
