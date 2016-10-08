import {default as Store} from './Store';

const github = require('github')({
  headers: {
    "Accept": "application/vnd.github.inertia-preview+json"
  }
});
const logger = require('tracer').colorConsole();

export default class SynchronizeLabels {
  static synchronize(repository) {
    github.authenticate({
      type: "token",
      token: repository.token
    });

    const [user, repositoryName] = repository.name.split('/');

    github.repos.getProjectColumns({
      user: user,
      repo: repositoryName,
      number: 1
    })
    .then((columns) => {
      for (var key in columns) {
        var column = columns[key];

        github.issues.createLabel({
          user: user,
          repo: repositoryName,
          name: column.name.toLowerCase(),
          color: "FFFFFF"
        });
      }
    });
  }
}
