import { execSync } from "child_process";
import { exit } from "process";

try {
  console.log("Prisma schema loaded from prisma/schema.prisma");
  execSync("npx prisma generate", { stdio: "inherit" });
  console.log("Prisma client generated successfully");
  exit(0);
} catch (e) {
  console.error("Prisma CLI validation error");
  console.error("Please ensure you have valid credentials in DATABASE_URL environment variable");
  console.error("\nYou can set up a local PostgreSQL database or update prisma/schema.prisma datasource block.");
  exit(1);
}