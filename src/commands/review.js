const {Command, flags} = require('@oclif/command');

const {deploy} = require('../lib/surge');
const {postComment} = require('../lib/github');

class ReviewCommand extends Command {
  async run() {
    const {flags} = this.parse(ReviewCommand);
    [
      'ghToken',
      'ghOwner',
      'ghProject',
      'ghPullRequest',
      'surgeLogin',
      'surgeToken',
      'surgeCustomDomain',
    ].forEach(f => {
      if (!flags[f]) this.error(`'${f}' is required`);
    });

    const {
      ghToken,
      ghOwner,
      ghProject,
      ghPullRequest,
      surgeLogin,
      surgeToken,
      surgeCustomDomain,
    } = flags;

    this.log('Deploying to Surge.sh...');
    deploy(surgeLogin, surgeToken, surgeCustomDomain);
    this.log(`Successfully deployed at ${surgeCustomDomain}`);

    this.log('Posting link to Github PR...');
    postComment(ghToken, ghOwner, ghProject, ghPullRequest, surgeCustomDomain);
    this.log('Successfully posted link to Github PR!');
  }
}

ReviewCommand.description = `
Publishes the PR code to to Surge.sh and comments the deployment URL on the Github PR.
`;

ReviewCommand.flags = {
  ghToken: flags.string({env: 'GH_TOKEN'}),
  ghOwner: flags.string({env: 'GH_OWNER'}),
  ghProject: flags.string({env: 'GH_PROJECT'}),
  ghPullRequest: flags.string(),

  surgeLogin: flags.string({env: 'SURGE_LOGIN'}),
  surgeToken: flags.string({env: 'SURGE_TOKEN'}),
  surgeCustomDomain: flags.string(),
};

module.exports = ReviewCommand;
