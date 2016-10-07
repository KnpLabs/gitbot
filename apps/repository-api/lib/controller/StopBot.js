import {default as Store, NotFoundError} from '../service/Store';
import HookManager from '../service/HookManager';

export default function StopBot(req, res, next) {
  const name = req.params.name;

  Store
    .find(name)
    .then((repository) => {
      HookManager.deleteHook(repository);
      delete repository.hookId;
      repository.save();

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
