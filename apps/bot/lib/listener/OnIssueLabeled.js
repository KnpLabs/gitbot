const logger = require('tracer').colorConsole();

import TokenFetcher from '../service/TokenFetcher';
import MoveCard from '../service/MoveCard';

export default function OnIssueLabeled(issue) {
  TokenFetcher(issue.repository.full_name)
    .then((token) => {
      logger.debug(`Token for "${issue.repository.full_name}" is "${token}".`);

      return MoveCard(token, issue);
    })
    .catch((err) => {
      logger.error(`An error happened while movinga card.`, err);
    })
  ;
}
