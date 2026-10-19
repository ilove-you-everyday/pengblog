'use strict';
const assert = require('node:assert/strict');
const Module = require('node:module');
const originalLoad = Module._load;
const handler = async () => 'twikoo-handler';
Module._load = function(request, parent, isMain) {
  if (request === 'twikoo-vercel') return handler;
  return originalLoad.call(this, request, parent, isMain);
};
try {
  delete require.cache[require.resolve('../api/twikoo.js')];
  assert.equal(require('../api/twikoo.js'), handler, 'Twikoo API should directly export the official Vercel handler');
  console.log('Twikoo adapter test passed: official handler is forwarded unchanged.');
} finally {
  Module._load = originalLoad;
}
