surge-extreme-review
============

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage
<!-- usage -->
```sh-session
$ npm install -g surge-extreme-review

$ surge-extreme-review COMMAND
running command...

$ surge-extreme-review --help [COMMAND]
VERSION
  surge-extreme-review/1.0.0 darwin-x64 node-v8.11.1

USAGE
$ surge-extreme-review [COMMAND]

COMMANDS
  review
  cleanup
  help
```

<!-- usagestop -->
# Commands
<!-- commands -->
* [`surge-extreme-review review`](#surge-extreme-review-review)
* [`surge-extreme-review cleanup`](#surge-extreme-review-cleanup)
* [`surge-extreme-review help [COMMAND]`](#surge-extreme-review-help-command)

## `surge-extreme-review review`

Publishes the PR code to Surge.sh and posts the deployment URL on the Github PR.

```
USAGE
  $ surge-extreme-review review

OPTIONS
  --ghOwner=ghOwner
  --ghProject=ghProject
  --ghPullRequest=ghPullRequest
  --ghToken=ghToken
  --surgeCustomDomain=surgeCustomDomain
  --surgeLogin=surgeLogin
  --surgeToken=surgeToken

DESCRIPTION
  Publishes the PR code to Surge.sh and posts the deployment URL on the Github PR.
```

## `surge-extreme-review cleanup`

Removes all Surge.sh deployments that have been merged.

```
USAGE
  $ surge-extreme-review cleanup

OPTIONS
  --ghOwner=ghOwner
  --ghProject=ghProject
  --ghToken=ghToken
  --surgeCustomDomainTemplate=surgeCustomDomainTemplate
  --surgeLogin=surgeLogin
  --surgeToken=surgeToken

DESCRIPTION
  Removes all Surge.sh deployments that have been merged.
```

## `surge-extreme-review help [COMMAND]`

Display help for surge-extreme-review

```
USAGE
  $ surge-extreme-review help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

<!-- commandsstop -->
