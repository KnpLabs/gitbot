const express = require('express');
const logger = require('tracer').colorConsole();

import PutRepository from './controller/PutRepository';
import GetRepository from './controller/GetRepository';
import StartBot from './controller/StartBot';
import StopBot from './controller/StopBot';

export default function Router() {
  const router = express.Router();

  router.get('/repository/:name', GetRepository);
  router.put('/repository/:name', PutRepository);
  router.post('/repository/:name/start', StartBot);
  router.post('/repository/:name/stop', StopBot);

  router.param('name', (req, res, next, name) => {
    if (!/^[\w\-_]+\/[\w\-_]+$/.test(name)) {
      return res.status(400).end();
    }

    next();
  });

  return router;
}
