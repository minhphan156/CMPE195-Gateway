/**
 * Defines all secret runtime variables.
 * @module RuntimeVars
 */

var yaml = require('js-yaml');
const fs = require('fs');
const manifestLocation = 'build/manifest/manifest.yaml';

// If safeloading fails, it will throw an exception. No need to catch it here,
// since we shouldn't attempt to run the microservice anyway.
const manifest = yaml.safeLoad(fs.readFileSync(manifestLocation, 'utf8'));

module.exports = Object.freeze({
  API: Object.freeze({
    HOST:             manifest.api.host,
    PORT:             manifest.api.port
  }),
  GATEWAY: Object.freeze({
    HOST:             manifest.gateway.host,
    PORT:             manifest.gateway.port
  }),
  RENDERING_ENGINE: Object.freeze({
    HOST:             manifest.rendering_engine.host,
    PORT:             manifest.rendering_engine.port
  }),
  OTHER: Object.freeze({
    DOCKER_GATEWAY: manifest.other.docker_gateway,
    ENV_NAME: manifest.other.ENV_NAME
  })
});