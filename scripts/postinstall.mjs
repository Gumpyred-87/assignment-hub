import { execSync } from "child_process";

if (process.env.DATABASE_URL) {
  try {
    execSync("npx prisma generate", { stdio: "inherit" });
  } catch (e) {
    console.error("prisma generate failed in postinstall");
    console.error("Please ensure you have DATABASE_URL set and valid PostgreSQL credentials");
  }
}