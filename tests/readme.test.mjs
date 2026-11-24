import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');

test('README points readers at the repository that actually holds the source', () => {
  assert.doesNotMatch(readme, /flisk-cli-core/);
  assert.match(readme, /\[flisk-sh\/flisk\]\(https:\/\/github\.com\/flisk-sh\/flisk\)/);
  assert.match(readme, /get the source from \[flisk-sh\/flisk\]/);
});

test('README does not advertise the retired binaries zip as a current asset', () => {
  assert.doesNotMatch(readme, /flisk-cli-<version>-binaries\.zip/);
});
