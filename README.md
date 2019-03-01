forumone-cli
============
CLI wrapper for Docker-based projects

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g forumone-cli
$ f1 COMMAND
running command...
$ f1 (-v|--version|version)
forumone-cli/1.0.0-rc.4 linux-x64 node-v10.15.1
$ f1 --help [COMMAND]
USAGE
  $ f1 COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`f1 composer`](#f-1-composer)
* [`f1 down`](#f-1-down)
* [`f1 drush`](#f-1-drush)
* [`f1 help [COMMAND]`](#f-1-help-command)
* [`f1 init`](#f-1-init)
* [`f1 new TARGET`](#f-1-new-target)
* [`f1 run SERVICE`](#f-1-run-service)
* [`f1 theme:build`](#f-1-themebuild)
* [`f1 theme:watch`](#f-1-themewatch)
* [`f1 up`](#f-1-up)

## `f1 composer`

run composer commands

```
USAGE
  $ f1 composer

OPTIONS
  -h, --help  show CLI help
  --dry-run   print command instead of running
```

_See code: [src/commands/composer.ts](https://github.com/forumone/forumone-cli/blob/v1.0.0-rc.4/src/commands/composer.ts)_

## `f1 down`

stop and optionally clean a project

```
USAGE
  $ f1 down

OPTIONS
  -h, --help  show CLI help
  --clean     remove images and volumes
  --dry-run   print command instead of running
```

_See code: [src/commands/down.ts](https://github.com/forumone/forumone-cli/blob/v1.0.0-rc.4/src/commands/down.ts)_

## `f1 drush`

run drush commands

```
USAGE
  $ f1 drush

OPTIONS
  -h, --help  show CLI help
  --dry-run   print command instead of running it
```

_See code: [src/commands/drush.ts](https://github.com/forumone/forumone-cli/blob/v1.0.0-rc.4/src/commands/drush.ts)_

## `f1 help [COMMAND]`

display help for f1

```
USAGE
  $ f1 help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src/commands/help.ts)_

## `f1 init`

create a new project in the current directory

```
USAGE
  $ f1 init

OPTIONS
  -h, --help  show CLI help
  --dry-run   print command instead of running
  --next      use prerelease generator for testing
```

_See code: [src/commands/init.ts](https://github.com/forumone/forumone-cli/blob/v1.0.0-rc.4/src/commands/init.ts)_

## `f1 new TARGET`

Create a new project in a new directory.

```
USAGE
  $ f1 new TARGET

ARGUMENTS
  TARGET  directory name to create

OPTIONS
  -h, --help  show CLI help
  --dry-run   print command instead of running
  --next      use prerelease generator for testing
```

_See code: [src/commands/new.ts](https://github.com/forumone/forumone-cli/blob/v1.0.0-rc.4/src/commands/new.ts)_

## `f1 run SERVICE`

run an arbitrary compose service

```
USAGE
  $ f1 run SERVICE

ARGUMENTS
  SERVICE  compose service name

OPTIONS
  -h, --help  show CLI help
  --dry-run   print command instead of running it
```

_See code: [src/commands/run.ts](https://github.com/forumone/forumone-cli/blob/v1.0.0-rc.4/src/commands/run.ts)_

## `f1 theme:build`

run gesso-related build tasks

```
USAGE
  $ f1 theme:build

OPTIONS
  -h, --help     show CLI help
  --css          build CSS
  --dry-run      print command instead of running
  --pattern-lab  build PL
```

_See code: [src/commands/theme/build.ts](https://github.com/forumone/forumone-cli/blob/v1.0.0-rc.4/src/commands/theme/build.ts)_

## `f1 theme:watch`

run gesso-related watch tasks

```
USAGE
  $ f1 theme:watch

OPTIONS
  -h, --help     show CLI help
  --css          watch CSS
  --dry-run      print command instead of running
  --pattern-lab  watch PL
```

_See code: [src/commands/theme/watch.ts](https://github.com/forumone/forumone-cli/blob/v1.0.0-rc.4/src/commands/theme/watch.ts)_

## `f1 up`

start a project up

```
USAGE
  $ f1 up

OPTIONS
  -f, --foreground  run compose in the foreground
  -h, --help        show CLI help
  --dry-run         print command instead of running
  --xdebug          enable xdebug in the container
```

_See code: [src/commands/up.ts](https://github.com/forumone/forumone-cli/blob/v1.0.0-rc.4/src/commands/up.ts)_
<!-- commandsstop -->
