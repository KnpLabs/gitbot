const logger = require('tracer').colorConsole();
const amqp = require('amqp');
const EventEmitter = require('events');

import OnIssueOpened from './listener/OnIssueOpened';
import OnIssueLabeled from './listener/OnIssueLabeled';

export default class Bot {
  constructor(config) {
    const emitter = new EventEmitter();
    this._config = config;

    this._connection = amqp.createConnection({
      host: config.amqp.host,
      port: config.amqp.port,
      login: config.amqp.user,
      password: config.amqp.password,
      vhost: config.amqp.vhost
    });

    this._connection.on('error', (err) => {
      logger.error(err);
      process.exit(1);
    });

    this._connection.on('ready', () => {
      logger.info('AMQP connection ready to be used.');

      this._connection.queue('issues', {durable: true, "autoDelete": false}, (queue) => {
        logger.info('Queue "issues" is open');
        queue.bind('amq.direct', 'issues');

        queue.subscribe(message => emitter.emit(`issues.${message.action}`, message));
      });
    });

    emitter.on('issues.opened', OnIssueOpened);
    emitter.on('issues.labeled', OnIssueLabeled);
  }
}
