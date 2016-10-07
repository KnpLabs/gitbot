import Repository from '../model/Repository';

export default class Store {
  static createOrUpdate(repository) {
    return Repository
      .findOneAndUpdate({name: repository.name}, {name: repository.name, token: repository.token}, {upsert: true})
      .then(() => {
        return repository;
      })
    ;
  }

  static find(name) {
    return Repository
      .findOne({name})
      .then((repository) => {
        if (null === repository) {
          throw new NotFoundError({ name });
        }

        return repository;
      })
    ;
  }
}

export class NotFoundError extends Error {};
