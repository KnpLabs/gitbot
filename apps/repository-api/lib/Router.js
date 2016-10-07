const express = require('express');
const logger = require('tracer').colorConsole();

import PutRepository from './controller/PutRepository';
import GetRepository from './controller/GetRepository';

export default function Router() {
  const router = express.Router();

  router.get('/repository/:name', GetRepository);
  router.put('/repository/:name', PutRepository);
  router.param('name', (req, res, next, name) => {
    if (!/^[\w\-_]+\/[\w\-_]+$/.test(name)) {
      return res.status(400).end();
    }

    next();
  });

  return router;
}
