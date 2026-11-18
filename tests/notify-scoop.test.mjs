import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const workflow = readFileSync(new URL('../.github/workflows/notify-scoop.yml', import.meta.url), 'utf8');

test('published Flisk releases notify the Scoop bucket with the release tag', () => {
  assert.match(workflow, /release:\s*\r?\n\s+types:\s*\[published\]/);
  assert.match(workflow, /SCOOP_BUCKET_DISPATCH_TOKEN/);
  assert.match(workflow, /repos\/flisk-sh\/scoop-bucket\/dispatches/);
  assert.match(workflow, /flisk-release-published/);
  assert.match(workflow, /client_payload.*tag/);
});
