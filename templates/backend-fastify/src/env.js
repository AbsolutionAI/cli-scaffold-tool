// Load .env into process.env (Node >= 20.12 built-in, no dependency).
// Order: apps/api/.env, then the project-root .env created by `cp .env.example .env`.
// Real environment variables always win; the first file to set a key wins.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const apiRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const files = process.env.ENV_FILE
  ? [process.env.ENV_FILE]
  : [path.join(apiRoot, '.env'), path.join(apiRoot, '..', '..', '.env')];

if (typeof process.loadEnvFile === 'function') {
  for (const f of files) if (fs.existsSync(f)) process.loadEnvFile(f);
} else if (files.some((f) => fs.existsSync(f))) {
  console.warn('[env] Node < 20.12 cannot load .env; export variables in your shell instead.');
}
