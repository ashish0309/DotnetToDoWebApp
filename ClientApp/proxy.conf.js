const { env } = require('process');

const target = 'http://localhost:5052';

const PROXY_CONFIG = [
  {
    context: [
      "/api/**"
    ],
    proxyTimeout: 10000,
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  }
]

module.exports = PROXY_CONFIG;
