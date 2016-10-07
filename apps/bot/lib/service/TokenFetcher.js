const request = require('request-promise-native');
const logger = require('tracer').colorConsole();

export default function TokenFetcher(name) {
  return request
    .get(`http://nginx/repository/${encodeURIComponent(name)}`)
    .then(repository => JSON.parse(repository).token)
  ;
}
