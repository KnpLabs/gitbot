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

  static find(repository) {
    return Repository
      .findOne({name: repository.name})
      .then((repository) => {
        return repository;
      })
    ;
  }
}
