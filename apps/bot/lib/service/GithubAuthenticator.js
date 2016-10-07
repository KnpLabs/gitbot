const GithubApi = require('github');

const headers = {
  "Accept": "application/vnd.github.squirrel-girl-preview"
};

export default function GithubAuthenticator(token) {
  const github = new GithubApi({headers: {
    "Accept": "application/vnd.github.inertia-preview+json"
  }});
  github.authenticate({type: 'token', token: token});

  return github;
}
