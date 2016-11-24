const logger = require('tracer').colorConsole();
const _ = require('underscore');

import GithubAuthenticator from '../service/GithubAuthenticator';

export default function FindCardId(token, issue) {
  const github = GithubAuthenticator(token);
  const [user, repo] = issue.repository.full_name.split('/');

  return github().repos.getProjectCards({
    user: user,
    repo: repo,
    id: 186520
  }).then((res) => {
    console.log(res);
    const card = _.find(res, card => (card.content_url || null) === issue.issue.url);

    if (!card) {
      throw new Error('No matching card found.');
    }

    return card;
  });
}
