import {default as Store, NotFoundError} from '../service/Store';
import HookManager from '../service/HookManager';

const logger = require('tracer').console();

export default function StartBot(req, res, next) {
  const name = req.params.name;

  Store
    .find(name)
    .then((repository) => {
      HookManager.createHook(repository);

      res.status(201).end();
    })
    .catch((err) => {
      if (err instanceof NotFoundError) {
        return res.status(404).end();
      }

      next(err);
    })
  ;
}
