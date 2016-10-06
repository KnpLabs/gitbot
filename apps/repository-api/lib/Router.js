const express = require('express');
const logger = require('tracer').colorConsole();

import PutRepository from './controller/PutRepository';

export default function Router() {
  const router = express.Router();

  router.use('/repository/:name', PutRepository);
  router.param('name', (req, res, next, name) => {
    logger.debug(`name => ${name}`, /^\w+\/\w+$/.test(name));

    if (!/^\w+\/\w+$/.test(name)) {
      return res.status(400).end();
    }

    next();
  });

  return router;
}
