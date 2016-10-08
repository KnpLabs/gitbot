import {default as Store, NotFoundError} from '../service/Store';
import HookManager from '../service/HookManager';

export default class StartBot {
  constructor(manager) {
    this._manager = manager;
  }

  handleRequest(req, res, next) {
    const name = req.params.name;

    Store
      .find(name)
      .then((repository) => {
        this._manager.createHook(repository);

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
}
