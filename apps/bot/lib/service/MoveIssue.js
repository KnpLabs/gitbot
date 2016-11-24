const logger = require('tracer').colorConsole();

import GithubAuthenticator from '../service/GithubAuthenticator';
import FindCardId from '../service/FindCardId';

export default function MoveIssue(token, issue) {
  const github = GithubAuthenticator(token);
  const [user, repo] = issue.repository.full_name.split('/');

  return FindCardId(token, issue)
    .then((card) => {
      return github().repos.moveProjectCard({
        user: user,
        repo: repo,
        id: card.id,
        position: 'bottom',
        column_id: 186521
      });
    })
    .then(() => {
      logger.info(`Issue ${issue.issue.id} has been moved to the last column of the project.`);
    })
  ;
}
