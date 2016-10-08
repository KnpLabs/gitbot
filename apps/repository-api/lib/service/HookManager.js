const github = require('github')();
const logger = require('tracer').colorConsole();

import {default as Store} from './Store';

export default class HookManager {
  constructor(hookUrl) {
    this._hookUrl = hookUrl;
  }

  createHook(repository) {
    github.authenticate({
      type: "token",
      token: repository.token
    });

    const [user, repositoryName] = repository.name.split('/');

    github.repos.createHook({
      user: user,
      repo: repositoryName,
      name: "web",
      config: {
        url: this._hookUrl,
        "content_type": "json"
      },
      active: true,
      events: ["*"]
    })
    .then(response => {
      logger.info(`Hook ${response.id} created.`);

      repository.hookId = response.id;
      repository.save();
    })
    .catch(err => { logger.debug(this._hookUrl, err); });
  }

  deleteHook(repository) {
    if (false === ('hookId' in repository)) {
      return;
    }

    github.authenticate({
      type: "token",
      token: repository.token
    });

    const [user, repositoryName] = repository.name.split('/');

    github.repos.deleteHook({
      user: user,
      repo: repositoryName,
      id: repository.hookId
    })
  }
}
