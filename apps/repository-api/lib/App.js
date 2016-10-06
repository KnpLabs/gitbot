const express = require('express');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const mongoose = require('mongoose');
const logger = require('tracer').colorConsole();

export default class App {
  constructor(config) {
    this._config = config;
    this._express = express();

    this._boot();
  }

  _boot() {
    mongoose.connect(`${this._config.mongo.uri}/${this._config.mongo.dbname}`);

    this._express.use(morgan('combined'));
    this._express.use(errorhandler()); // Should be last
  }

  run() {
    this._express.listen(this._config.httpPort, () => {
      logger.info(`Start listening on ${this._config.httpPort}.`);
    });
  }
}
