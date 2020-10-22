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
forumone-cli/1.7.1 darwin-x64 node-v10.16.3
$ f1 --help [COMMAND]
USAGE
  $ f1 COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`f1 build`](#f1-build)
* [`f1 cap:stage`](#f1-capstage)
* [`f1 composer`](#f1-composer)
* [`f1 doctor`](#f1-doctor)
* [`f1 down`](#f1-down)
* [`f1 drush`](#f1-drush)
* [`f1 help [COMMAND]`](#f1-help-command)
* [`f1 init`](#f1-init)
* [`f1 new TARGET`](#f1-new-target)
* [`f1 run SERVICE`](#f1-run-service)
* [`f1 theme:build`](#f1-themebuild)
* [`f1 theme:watch`](#f1-themewatch)
* [`f1 up`](#f1-up)
* [`f1 wp`](#f1-wp)

## `f1 build`

build or rebuild all images

```
USAGE
  $ f1 build

OPTIONS
  -h, --help       show CLI help
  -v, --verbose    print command information prior to execution
  --dry-run        print command instead of running it
  --[no-]parallel  build in parallel (defaults to true)
  --[no-]pull      pull latest docker image versions (defaults to true)
```

_See code: [src/commands/build.ts](https://github.com/forumone/forumone-cli/blob/v1.7.1/src/commands/build.ts)_

## `f1 cap:stage`

create new capistrano stage(s)

```
USAGE
  $ f1 cap:stage

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  print command information prior to execution
  --dry-run      print command instead of running it
```

_See code: [src/commands/cap/stage.ts](https://github.com/forumone/forumone-cli/blob/v1.7.1/src/commands/cap/stage.ts)_

## `f1 composer`

run composer commands

```
USAGE
  $ f1 composer

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  print command information prior to execution
  --dry-run      print command instead of running it
```

_See code: [src/commands/composer.ts](https://github.com/forumone/forumone-cli/blob/v1.7.1/src/commands/composer.ts)_

## `f1 doctor`

diagnose potential issues

```
USAGE
  $ f1 doctor

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  print system info
```

_See code: [src/commands/doctor.ts](https://github.com/forumone/forumone-cli/blob/v1.7.1/src/commands/doctor.ts)_

## `f1 down`

stop and optionally clean a project

```
USAGE
  $ f1 down

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  print command information prior to execution
  --clean        remove images and volumes
  --dry-run      print command instead of running it
```

_See code: [src/commands/down.ts](https://github.com/forumone/forumone-cli/blob/v1.7.1/src/commands/down.ts)_

## `f1 drush`

run drush commands

```
USAGE
  $ f1 drush

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  print command information prior to execution
  --dry-run      print command instead of running it
```

_See code: [src/commands/drush.ts](https://github.com/forumone/forumone-cli/blob/v1.7.1/src/commands/drush.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `f1 init`

create a new project in the current directory

```
USAGE
  $ f1 init

OPTIONS
  -h, --help                                                show CLI help
  -v, --verbose                                             print command information prior to execution
  --dry-run                                                 print command instead of running it
  --next                                                    use prerelease generator for testing
  --sub-generator=manifest|buildkite-pipeline|code-quality  run a specific sub-generator within generator-web-starter
```

_See code: [src/commands/init.ts](https://github.com/forumone/forumone-cli/blob/v1.7.1/src/commands/init.ts)_

## `f1 new TARGET`

Create a new project in a new directory.

```
USAGE
  $ f1 new TARGET

ARGUMENTS
  TARGET  directory name to create

OPTIONS
  -h, --help                                                show CLI help
  -v, --verbose                                             print command information prior to execution
  --dry-run                                                 print command instead of running it
  --next                                                    use prerelease generator for testing
  --sub-generator=manifest|buildkite-pipeline|code-quality  run a specific sub-generator within generator-web-starter
```

_See code: [src/commands/new.ts](https://github.com/forumone/forumone-cli/blob/v1.7.1/src/commands/new.ts)_

## `f1 run SERVICE`

run an arbitrary compose service

```
USAGE
  $ f1 run SERVICE

ARGUMENTS
  SERVICE  compose service name

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  print command information prior to execution
  --dry-run      print command instead of running it
```

_See code: [src/commands/run.ts](https://github.com/forumone/forumone-cli/blob/v1.7.1/src/commands/run.ts)_

## `f1 theme:build`

[DEPRECATED] run gesso-related build tasks

```
USAGE
  $ f1 theme:build

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  print command information prior to execution
  --css          build CSS
  --dry-run      print command instead of running it
  --pattern-lab  build PL
```

_See code: [src/commands/theme/build.ts](https://github.com/forumone/forumone-cli/blob/v1.7.1/src/commands/theme/build.ts)_

## `f1 theme:watch`

[DEPRECATED] run gesso-related watch tasks

```
USAGE
  $ f1 theme:watch

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  print command information prior to execution
  --css          watch CSS
  --dry-run      print command instead of running it
  --pattern-lab  watch PL
```

_See code: [src/commands/theme/watch.ts](https://github.com/forumone/forumone-cli/blob/v1.7.1/src/commands/theme/watch.ts)_

## `f1 up`

start a project up

```
USAGE
  $ f1 up

OPTIONS
  -f, --foreground  run compose in the foreground
  -h, --help        show CLI help
  -v, --verbose     print command information prior to execution
  --dry-run         print command instead of running it
  --xdebug          enable xdebug in the container

  --xdebug-profile  Enables the triggering of xdebug's profiler. See https://xdebug.org/docs/profiler for how to trigger
                    these requests.
```

_See code: [src/commands/up.ts](https://github.com/forumone/forumone-cli/blob/v1.7.1/src/commands/up.ts)_

## `f1 wp`

run wp-cli commands

```
USAGE
  $ f1 wp

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  print command information prior to execution
  --dry-run      print command instead of running it
```

_See code: [src/commands/wp.ts](https://github.com/forumone/forumone-cli/blob/v1.7.1/src/commands/wp.ts)_
<!-- commandsstop -->
