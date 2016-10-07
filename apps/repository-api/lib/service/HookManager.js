import {default as Store} from './Store';

const github = require('github')();

export default class HookManager {
  static createHook(repository) {
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
        url: "http://gitbot.antoinelelaisant.ultrahook.com/hook",
        "content_type": "json"
      },
      active: true,
      events: ["*"]
    })
    .then(response => {
      repository.hookId = response.id;
      repository.save();
    })
    .catch(err => { logger.debug(err); });
  }

  static deleteHook(repository) {
    if (!'hookId' in repository) {
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
