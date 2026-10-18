import './env.js';

const PLACEHOLDERS = new Set(['', 'change-me', 'dev-secret', 'docker-secret', 'change-me-in-production']);
const DEV_FALLBACK = 'insecure-dev-only-secret';

export function resolveJwtSecret(env = process.env) {
  const s = env.JWT_SECRET ?? '';
  if (!PLACEHOLDERS.has(s) && s.length >= 32) return s;
  if (env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET is missing, a placeholder, or shorter than 32 characters; refusing to start with NODE_ENV=production.');
  }
  if (env.NODE_ENV !== 'test') console.warn('[config] WARNING: weak or missing JWT_SECRET; set 32+ random characters before deploying.');
  return s && !PLACEHOLDERS.has(s) ? s : DEV_FALLBACK;
}

export const jwtSecret = resolveJwtSecret();
