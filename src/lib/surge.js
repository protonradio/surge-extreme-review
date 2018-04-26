const path = require('path');
const {spawnSync} = require('child_process');

const surgeBin = path.resolve(require.resolve('surge'), '..', 'cli.js');

module.exports = {deploy, tearDown, getDeployedPRs};

function deploy(login, token, domain) {
  process.env.SURGE_LOGIN = login;
  process.env.SURGE_TOKEN = token;
  runSurgeCommand('.', domain);
}

function tearDown(login, token, domain) {
  process.env.SURGE_LOGIN = login;
  process.env.SURGE_TOKEN = token;
  runSurgeCommand('teardown', domain);
}

function getDeployedPRs(login, token, domainTemplate) {
  process.env.SURGE_LOGIN = login;
  process.env.SURGE_TOKEN = token;
  const surgeOutput = runSurgeCommand('list');
  const regex = getRegex(domainTemplate);

  let m;
  const deployedPRs = [];

  while ((m = regex.exec(surgeOutput)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex += 1;
    }

    m.forEach((match, groupIndex) => {
      if (groupIndex === 1) {
        deployedPRs.push(parseInt(match, 10));
      }
    });
  }

  return deployedPRs;
}

function runSurgeCommand(...args) {
  const child = spawnSync(...['node', [surgeBin, ...args]]);
  if (child.error) {
    throw child.error;
  }

  return child.stdout.toString();
}

function getRegex(domainTemplate) {
  return new RegExp(domainTemplate.replace('#{PR}', '(\\d+)'), 'g');
}
