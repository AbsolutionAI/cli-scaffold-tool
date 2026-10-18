import test from 'node:test';
import assert from 'node:assert/strict';

process.env.NODE_ENV = 'test';
const { resolveJwtSecret } = await import('../src/config.js');

test('strong JWT_SECRET is used as-is', () => {
  const s = 'a'.repeat(40);
  assert.equal(resolveJwtSecret({ JWT_SECRET: s, NODE_ENV: 'production' }), s);
});

for (const bad of [undefined, '', 'change-me', 'dev-secret', 'docker-secret', 'short']) {
  test(`production refuses JWT_SECRET=${JSON.stringify(bad)}`, () => {
    assert.throws(() => resolveJwtSecret({ JWT_SECRET: bad, NODE_ENV: 'production' }), /JWT_SECRET/);
  });
}

test('dev never falls back to a published placeholder', () => {
  assert.ok(!['change-me', 'dev-secret'].includes(resolveJwtSecret({ JWT_SECRET: 'change-me' })));
});
