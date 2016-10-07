const logger = require('tracer').colorConsole();

import GithubAuthenticator from '../service/GithubAuthenticator';

export default function ImportIssue(token, issue) {
  const github = GithubAuthenticator(token);
  const [user, repo] = issue.repository.full_name.split('/');

  return github.repos.createProjectCard({
    user: user,
    repo: repo,
    id: 186520,
    content_id: issue.issue.id,
    content_type: 'Issue'
  }).then((res) => {
    console.log(res);
    logger.debug(`Issue ${issue.issue.id} has been added to your project.`)
  });
}
