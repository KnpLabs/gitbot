const express = require('express');

import PostHook from './controller/PostHook';

export default function Router(publisher) {
  const router = express.Router();

  const postHook = new PostHook(publisher);

  router.post('/hook', postHook.handleRequest.bind(postHook));

  return router;
};
