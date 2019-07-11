const GitHub = require('@octokit/rest');

module.exports = {getOpenPRs, postComment};

async function getOpenPRs(token, owner, repo) {
  const github = githubAuth(token);

  const res = await github.pulls.list({
    state: 'open',
    owner,
    repo,
  });

  return res.data.map(pr => pr.number);
}

async function postComment(token, owner, repo, pullRequestNumber, surgeURI) {
  const github = githubAuth(token);

  await github.issues.createComment({
    owner,
    repo,
    // eslint-disable-next-line camelcase
    issue_number: pullRequestNumber,
    body: `Deployment for QA: [${surgeURI}](http://${surgeURI})`,
  });
}

function githubAuth(token) {
  return new GitHub({
    auth: token,
  });
}
