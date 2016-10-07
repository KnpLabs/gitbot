const express = require('express');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const logger = require('tracer').colorConsole();
const amqp = require('amqp');
const bodyParser = require('body-parser');

import router from './Router';
import Publisher from './service/Publisher';

export default class App {
  constructor(config) {
    this._config = config;
    this._express = express();

    const connection = amqp.createConnection({
      host: config.amqp.host,
      port: config.amqp.port,
      login: config.amqp.user,
      password: config.amqp.password,
      vhost: config.amqp.vhost
    });
    connection.on('error', (err) => {
      logger.error(err);
      process.exit(1);
    });
    connection.on('ready', () => {
      logger.info('AMQP connection ready to be used.');
      this._boot(connection.exchange('amq.direct', {type: 'direct'}));
    });
  }

  _boot(exchange) {
    const publisher = new Publisher(exchange);

    this._express.use(morgan('combined'));
    this._express.use(bodyParser.json());
    this._express.use(router(publisher));
    this._express.use(errorhandler());
  }

  run() {
    this._express.listen(this._config.httpPort, () => {
      logger.info(`Start listening on ${this._config.httpPort}.`);
    });
  }
}
