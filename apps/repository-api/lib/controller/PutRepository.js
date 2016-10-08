import Repository from '../model/Repository';
import Store from '../service/Store';

const logger = require('tracer').colorConsole();

export default function PutRepository(req, res, next) {
  const name = req.params.name;
  const token = req.body.token || null;
  logger.debug(token);

  if (token === null) {
    return res.status(400).end();
  }

  const repository = new Repository({name, token});

  Store
    .createOrUpdate(repository)
    .then((repository) => {
      res.status(200).json(repository);
    })
    .catch(err => next(err))
  ;
}
