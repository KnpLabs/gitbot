const logger = require('tracer').colorConsole();

import TokenFetcher from '../service/TokenFetcher';
import MoveIssue from '../service/MoveIssue';

export default function OnIssueClosed(issue) {
  const repositoryName = issue.repository.full_name;

  TokenFetcher(repositoryName)
    .then(token => MoveIssue(token, issue))
    .catch(err => logger.error(err));
}
