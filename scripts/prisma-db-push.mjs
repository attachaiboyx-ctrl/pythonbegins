import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const prismaCli = resolve("node_modules", "prisma", "build", "index.js");

const dbPath = resolve("prisma", "dev.db").replace(/\\/g, "/");
const args = ["db", "push"];

if (process.argv.includes("--force-reset")) {
  args.push("--force-reset");
}

const result = spawnSync(process.execPath, [prismaCli, ...args], {
  env: {
    ...process.env,
    CHECKPOINT_DISABLE: "1",
    DATABASE_URL: `file:${dbPath}`
  },
  shell: false,
  stdio: "inherit"
});

if (result.error) {
  console.error(result.error);
}

process.exit(result.status ?? 1);
