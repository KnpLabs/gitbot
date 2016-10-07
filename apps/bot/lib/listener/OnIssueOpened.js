const logger = require('tracer').colorConsole();

import TokenFetcher from '../service/TokenFetcher';
import ImportIssue from '../service/ImportIssue';

export default function OnIssueOpened(issue) {
  TokenFetcher(issue.repository.full_name)
    .then((token) => {
      logger.debug(`Token for "${issue.repository.full_name}" is "${token}".`);

      return ImportIssue(token, issue);
    })
    .catch((err) => {
      logger.error(`An error happened while importing an issue.`, err);
    })
  ;
}
