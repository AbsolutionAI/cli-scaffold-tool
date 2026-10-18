// Run a command (e.g. the Prisma CLI) with the same .env resolution as the API.
import '../src/env.js';
import { spawnSync } from 'node:child_process';

const [cmd, ...args] = process.argv.slice(2);
const r = spawnSync(cmd, args, { stdio: 'inherit', env: process.env, shell: process.platform === 'win32' });
process.exit(r.status ?? 1);
