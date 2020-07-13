const { Command, flags } = require("@oclif/command");

const { getOpenPRs } = require("../lib/github");
const { getDeployedPRs, tearDown } = require("../lib/surge");

class CleanUpCommand extends Command {
  async run() {
    const { flags } = this.parse(CleanUpCommand);
    [
      "ghToken",
      "ghOwner",
      "ghProject",
      "surgeLogin",
      "surgeToken",
      "surgeCustomDomainTemplate",
    ].forEach((f) => {
      if (!flags[f]) this.error(`'${f}' is required`);
    });

    const {
      ghToken,
      ghOwner,
      ghProject,
      surgeLogin,
      surgeToken,
      surgeCustomDomainTemplate,
    } = flags;

    if (surgeCustomDomainTemplate.indexOf("#{PR}") < 0)
      this.error("'surgeCustomDomainTemplate' needs to have '#{PR}' in it");

    const deployedPRs = getDeployedPRs(
      surgeLogin,
      surgeToken,
      surgeCustomDomainTemplate
    );
    const openPRs = await getOpenPRs(ghToken, ghOwner, ghProject);

    deployedPRs
      .filter((pr) => openPRs.indexOf(pr) < 0)
      .map((pr) => surgeCustomDomainTemplate.replace("#{PR}", pr))
      .forEach((pr) => {
        this.log(`Removing ${pr}...`);
        tearDown(surgeLogin, surgeToken, pr);
        this.log(`Successfully removed ${pr}`);
      });
  }
}

CleanUpCommand.description = `
Removes all Surge.sh deployments that have been merged.
`;

CleanUpCommand.flags = {
  ghToken: flags.string({ env: "GH_TOKEN" }),
  ghOwner: flags.string({ env: "GH_OWNER" }),
  ghProject: flags.string({ env: "GH_PROJECT" }),

  surgeLogin: flags.string({ env: "SURGE_LOGIN" }),
  surgeToken: flags.string({ env: "SURGE_TOKEN" }),
  surgeCustomDomainTemplate: flags.string(),
};

module.exports = CleanUpCommand;
