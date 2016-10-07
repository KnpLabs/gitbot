const logger = require('tracer').colorConsole();

export default class Publisher {
  constructor(exchange) {
    this._exchange = exchange;
  }

  publish(type, event) {
    logger.debug(`Event "${type}" sent with data: "${JSON.stringify(event)}.`);

    this._exchange.publish(type, event, {deliveryMode: 2, contentType: 'application/json'});
  }
}
