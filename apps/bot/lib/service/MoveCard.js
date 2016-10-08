const logger = require('tracer').colorConsole();

import GithubAuthenticator from '../service/GithubAuthenticator';

export default function MoveCard(token, issue) {
  const github = GithubAuthenticator(token);
  const [user, repo] = issue.repository.full_name.split('/');
  github.repos.getProjectColumns({
    user: user,
    repo: repo,
    number: 1
  })
  .then((columns) => {
    for (var key in columns) {
      var column = columns[key];

      if (issue.label.name == column.name.toLowerCase()) {
        logger.debug(column.id);
        return github.repos.moveProjectCard({
          user: user,
          repo: repo,
          id: issue.issue.id,
          position: 'first',
          column_id: column.id
        }).then((res) => {
          console.log(res);
          logger.debug(`Issue ${issue.issue.id} has been moved.`)
        });
      }
    }
  });

}
