import Repository from '../model/Repository';
import Store from '../service/Store';

export default function GetRepository(req, res, next) {
  const name  = req.params.name;

  const repository = new Repository({name});

  Store
    .find(repository)
    .then(repository => res.status(200).json(repository))
    .catch(err => next(err))
  ;
}
