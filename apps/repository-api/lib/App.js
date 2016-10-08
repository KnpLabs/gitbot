const express = require('express');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const mongoose = require('mongoose');
const logger = require('tracer').colorConsole();
const bodyParser = require('body-parser');

import router from './Router';
import HookManager from './service/HookManager';

export default class App {
  constructor(config) {
    this._config = config;
    this._express = express();

    this._boot();
  }

  _boot() {
    mongoose.connect(`${this._config.mongo.uri}/${this._config.mongo.dbname}`);

    this._express.use(morgan('combined'));
    this._express.use(bodyParser.urlencoded({ extended: true }));
    this._express.use(bodyParser.json());
    this._express.use(router(new HookManager(this._config.hookUrl)));
    this._express.use(errorhandler()); // Should be last
  }

  run() {
    this._express.listen(this._config.httpPort, () => {
      logger.info(`Start listening on ${this._config.httpPort}.`);
    });
  }
}
