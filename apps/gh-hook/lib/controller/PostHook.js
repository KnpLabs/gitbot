const logger = require('tracer').colorConsole();

export default class PostHook {
  constructor(publisher) {
    this._publisher = publisher;
  }

  handleRequest(req, res) {
    const event = req.header('X-Github-Event');
    if (!event) {
      res.status(400).json();
    }

    logger.info(`Webhook "${event}" triggered.`);
    this._publisher.publish(event, req.body);

    res.sendStatus(200);
  }
}
