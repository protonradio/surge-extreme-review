const GitHub = require('@octokit/rest');

module.exports = {getOpenPRs, postComment};

async function getOpenPRs(token, owner, repo) {
  const github = githubAuth(token);

  const res = await github.pullRequests.getAll({
    state: 'open',
    owner,
    repo,
  });

  return res.data.map(pr => pr.number);
}

async function postComment(token, owner, repo, number, surgeURI) {
  const github = githubAuth(token);

  await github.issues.createComment({
    owner,
    repo,
    number, // pull request number
    body: `Deployment for QA: [${surgeURI}](http://${surgeURI})`,
  });
}

function githubAuth(token) {
  const github = new GitHub();

  github.authenticate({
    type: 'oauth',
    token,
  });

  return github;
}
