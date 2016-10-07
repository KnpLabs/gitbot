const github = require('github')();
const logger = require('tracer').console();

export default class HookManager {
  static createHook(repository) {
    github.authenticate({
      type: "token",
      token: repository.token
    });

    const [user, repositoryName] = repository.name.split('/');
    logger.debug(user, repositoryName);

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
    }).then(() => {
      logger.debug('test');
    })
      .catch(err => { logger.debug(err); });
  }

  static deleteHook() {

  }
}
