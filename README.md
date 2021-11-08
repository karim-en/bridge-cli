# Rainbow Bridge CLI

CLI to manage and verify the bridge between NEAR and Ethereum

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/rainbow-bridge.svg)](https://npmjs.org/package/rainbow-bridge)
[![Downloads/week](https://img.shields.io/npm/dw/rainbow-bridge.svg)](https://npmjs.org/package/rainbow-bridge)
[![License](https://img.shields.io/npm/l/rainbow-bridge.svg)](https://github.com/aurora-is-near/bridge/blob/master/package.json)

<!-- toc -->
* [Rainbow Bridge CLI](#rainbow-bridge-cli)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g rainbow-bridge
$ bridge COMMAND
running command...
$ bridge (-v|--version|version)
rainbow-bridge/0.0.10 linux-x64 node-v16.13.0
$ bridge --help [COMMAND]
USAGE
  $ bridge COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`bridge eth:deploy CONTRACTPATH`](#bridge-ethdeploy-contractpath)
* [`bridge eth:keys:add PRIVATEKEY [NAME]`](#bridge-ethkeysadd-privatekey-name)
* [`bridge eth:keys:use IDENTIFIER`](#bridge-ethkeysuse-identifier)
* [`bridge factory:metadata_emitter [ADDRESS]`](#bridge-factorymetadata_emitter-address)
* [`bridge factory:pause`](#bridge-factorypause)
* [`bridge factory:unpause`](#bridge-factoryunpause)
* [`bridge help [COMMAND]`](#bridge-help-command)
* [`bridge list`](#bridge-list)
* [`bridge monitor`](#bridge-monitor)
* [`bridge pause:eth:all`](#bridge-pauseethall)
* [`bridge pause:eth:client`](#bridge-pauseethclient)
* [`bridge pause:eth:erc20-locker`](#bridge-pauseetherc20-locker)
* [`bridge pause:eth:prover`](#bridge-pauseethprover)
* [`bridge pause:near:all`](#bridge-pausenearall)
* [`bridge pause:near:client`](#bridge-pausenearclient)
* [`bridge pause:near:factory`](#bridge-pausenearfactory)
* [`bridge pause:near:prover`](#bridge-pausenearprover)
* [`bridge tokens:list`](#bridge-tokenslist)
* [`bridge tokens:metadata TOKENADDRESS`](#bridge-tokensmetadata-tokenaddress)
* [`bridge tokens:set_icon TOKENS`](#bridge-tokensset_icon-tokens)
* [`bridge tokens:set_metadata TOKEN`](#bridge-tokensset_metadata-token)
* [`bridge tools:deploy-contracts TOKENS CONTRACT`](#bridge-toolsdeploy-contracts-tokens-contract)
* [`bridge tools:generate-config FILE`](#bridge-toolsgenerate-config-file)
* [`bridge tools:migrate-icons TOKENS CONTRACT`](#bridge-toolsmigrate-icons-tokens-contract)
* [`bridge unpause:eth:all`](#bridge-unpauseethall)
* [`bridge unpause:eth:client`](#bridge-unpauseethclient)
* [`bridge unpause:eth:erc20-locker`](#bridge-unpauseetherc20-locker)
* [`bridge unpause:eth:prover`](#bridge-unpauseethprover)
* [`bridge unpause:near:all`](#bridge-unpausenearall)
* [`bridge unpause:near:client`](#bridge-unpausenearclient)
* [`bridge unpause:near:factory`](#bridge-unpausenearfactory)
* [`bridge unpause:near:prover`](#bridge-unpausenearprover)
* [`bridge use BRIDGE_ID`](#bridge-use-bridge_id)

## `bridge eth:deploy CONTRACTPATH`

Add Ethereum Key into the Key Store.

```
USAGE
  $ bridge eth deploy CONTRACTPATH

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/eth/deploy.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/eth/deploy.ts)_

## `bridge eth:keys:add PRIVATEKEY [NAME]`

Add Ethereum Key into the Key Store.

```
USAGE
  $ bridge eth keys add PRIVATEKEY [NAME]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/eth/keys/add.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/eth/keys/add.ts)_

## `bridge eth:keys:use IDENTIFIER`

Add Ethereum Key into the Key Store.

```
USAGE
  $ bridge eth keys use IDENTIFIER

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/eth/keys/use.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/eth/keys/use.ts)_

## `bridge factory:metadata_emitter [ADDRESS]`

Pause factory

```
USAGE
  $ bridge factory metadata_emitter [ADDRESS]

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/factory/metadata_emitter.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/factory/metadata_emitter.ts)_

## `bridge factory:pause`

Pause factory

```
USAGE
  $ bridge factory pause

OPTIONS
  -d, --deposit  Pause deposits
  -h, --help     show CLI help
  -s, --status   Show the current paused status of the contract.
  -t, --deploy   Pause deploy token
```

_See code: [src/commands/factory/pause.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/factory/pause.ts)_

## `bridge factory:unpause`

Unpause factory

```
USAGE
  $ bridge factory unpause

OPTIONS
  -d, --deposit  Pause deposits
  -h, --help     show CLI help
  -s, --status   Show the current paused status of the contract.
  -t, --deploy   Pause deploy token
```

_See code: [src/commands/factory/unpause.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/factory/unpause.ts)_

## `bridge help [COMMAND]`

display help for bridge

```
USAGE
  $ bridge help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `bridge list`

List all bridges available

```
USAGE
  $ bridge list

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/list.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/list.ts)_

## `bridge monitor`

Expose bridge information through prometheus metrics

```
USAGE
  $ bridge monitor

OPTIONS
  -h, --help  show CLI help
  -l, --list  List information tracked
```

_See code: [src/commands/monitor.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/monitor.ts)_

## `bridge pause:eth:all`

Pause all near contracts

```
USAGE
  $ bridge pause eth all

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/pause/eth/all.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/pause/eth/all.ts)_

## `bridge pause:eth:client`

Pause Near on Eth client

```
USAGE
  $ bridge pause eth client

OPTIONS
  -a, --all        Pause all actions
  -b, --addBlock   Pause addBlock
  -c, --challenge  Pause challenge
  -d, --deposit    Pause deposit
  -h, --help       show CLI help
  -s, --status     Show the current paused status of the contract.
  -v, --verify     Pause verify
  -w, --withdraw   Pause withdraw
```

_See code: [src/commands/pause/eth/client.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/pause/eth/client.ts)_

## `bridge pause:eth:erc20-locker`

Pause erc20 locker

```
USAGE
  $ bridge pause eth erc20-locker

OPTIONS
  -a, --all     Pause all actions
  -h, --help    show CLI help
  -l, --lock    Pause lock
  -s, --status  Show the current paused status of the contract.
  -u, --verify  Pause unlock
```

_See code: [src/commands/pause/eth/erc20-locker.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/pause/eth/erc20-locker.ts)_

## `bridge pause:eth:prover`

Pause prover on Eth

```
USAGE
  $ bridge pause eth prover

OPTIONS
  -a, --all     Pause all actions
  -h, --help    show CLI help
  -s, --status  Show the current paused status of the contract.
  -v, --verify  Pause verify
```

_See code: [src/commands/pause/eth/prover.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/pause/eth/prover.ts)_

## `bridge pause:near:all`

Pause all near contracts

```
USAGE
  $ bridge pause near all

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/pause/near/all.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/pause/near/all.ts)_

## `bridge pause:near:client`

Pause eth client on NEAR

```
USAGE
  $ bridge pause near client

OPTIONS
  -a, --all             Pause all actions
  -h, --addBlockHeader  Pause add block header
  -h, --help            show CLI help
  -s, --status          Show the current paused status of the contract.
```

_See code: [src/commands/pause/near/client.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/pause/near/client.ts)_

## `bridge pause:near:factory`

Pause factory

```
USAGE
  $ bridge pause near factory

OPTIONS
  -a, --all      Pause all actions
  -d, --deposit  Pause deposits
  -h, --help     show CLI help
  -s, --status   Show the current paused status of the contract.
  -t, --deploy   Pause deploy token
```

_See code: [src/commands/pause/near/factory.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/pause/near/factory.ts)_

## `bridge pause:near:prover`

Pause eth prover on NEAR

```
USAGE
  $ bridge pause near prover

OPTIONS
  -a, --all             Pause all actions
  -b, --addBlockHeader  Pause verify
  -h, --help            show CLI help
  -s, --status          Show the current paused status of the contract.
```

_See code: [src/commands/pause/near/prover.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/pause/near/prover.ts)_

## `bridge tokens:list`

List all tokens deployed

```
USAGE
  $ bridge tokens list

OPTIONS
  -e, --etherscan  link to etherscan
  -h, --help       show CLI help
  -n, --near       link to NEAR Explorer
  -r, --raw        raw token address
```

_See code: [src/commands/tokens/list.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/tokens/list.ts)_

## `bridge tokens:metadata TOKENADDRESS`

Check metadata from ERC20 tokens

```
USAGE
  $ bridge tokens metadata TOKENADDRESS

OPTIONS
  -e, --erc20  Show metadata from ERC20
  -h, --help   show CLI help
```

_See code: [src/commands/tokens/metadata.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/tokens/metadata.ts)_

## `bridge tokens:set_icon TOKENS`

Set icons of bridged ERC20 (NEP141) tokens. Pass the path to https://github.com/aurora-is-near/bridge-assets/tree/master/tokens on your local machine.

```
USAGE
  $ bridge tokens set_icon TOKENS

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/tokens/set_icon.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/tokens/set_icon.ts)_

## `bridge tokens:set_metadata TOKEN`

Set metadata of bridged ERC20 (NEP141) tokens

```
USAGE
  $ bridge tokens set_metadata TOKEN

OPTIONS
  -b, --bulk  Set metadata from file
  -h, --help  show CLI help
```

_See code: [src/commands/tokens/set_metadata.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/tokens/set_metadata.ts)_

## `bridge tools:deploy-contracts TOKENS CONTRACT`

Deploy contracts in batch

```
USAGE
  $ bridge tools deploy-contracts TOKENS CONTRACT

ARGUMENTS
  TOKENS    List with all tokens address. Generate using `bridge tokens list`
  CONTRACT  Binary contract path

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/tools/deploy-contracts.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/tools/deploy-contracts.ts)_

## `bridge tools:generate-config FILE`

Generate config/base.ts file from yml file automatically. This is used to have automatically fully typed config file.

```
USAGE
  $ bridge tools generate-config FILE

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/tools/generate-config.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/tools/generate-config.ts)_

## `bridge tools:migrate-icons TOKENS CONTRACT`

Apply icon migration to all bridged tokens.

```
USAGE
  $ bridge tools migrate-icons TOKENS CONTRACT

ARGUMENTS
  TOKENS    List with all tokens address. Generate using `bridge tokens list`
  CONTRACT  New bridge token contract

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/tools/migrate-icons.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/tools/migrate-icons.ts)_

## `bridge unpause:eth:all`

Unpause all eth contracts

```
USAGE
  $ bridge unpause eth all

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/unpause/eth/all.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/unpause/eth/all.ts)_

## `bridge unpause:eth:client`

Unpause Near on Eth client

```
USAGE
  $ bridge unpause eth client

OPTIONS
  -a, --all        Pause all actions
  -b, --addBlock   Pause addBlock
  -c, --challenge  Pause challenge
  -d, --deposit    Pause deposit
  -h, --help       show CLI help
  -s, --status     Show the current paused status of the contract.
  -v, --verify     Pause verify
  -w, --withdraw   Pause withdraw
```

_See code: [src/commands/unpause/eth/client.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/unpause/eth/client.ts)_

## `bridge unpause:eth:erc20-locker`

Unpause erc20 locker

```
USAGE
  $ bridge unpause eth erc20-locker

OPTIONS
  -a, --all     Pause all actions
  -h, --help    show CLI help
  -l, --lock    Pause lock
  -s, --status  Show the current paused status of the contract.
  -u, --verify  Pause unlock
```

_See code: [src/commands/unpause/eth/erc20-locker.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/unpause/eth/erc20-locker.ts)_

## `bridge unpause:eth:prover`

Unpause prover on Eth

```
USAGE
  $ bridge unpause eth prover

OPTIONS
  -a, --all     Pause all actions
  -h, --help    show CLI help
  -s, --status  Show the current paused status of the contract.
  -v, --verify  Pause verify
```

_See code: [src/commands/unpause/eth/prover.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/unpause/eth/prover.ts)_

## `bridge unpause:near:all`

Unpause all near contracts

```
USAGE
  $ bridge unpause near all

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/unpause/near/all.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/unpause/near/all.ts)_

## `bridge unpause:near:client`

Unpause eth client on NEAR

```
USAGE
  $ bridge unpause near client

OPTIONS
  -a, --all             Pause all actions
  -h, --addBlockHeader  Pause add block header
  -h, --help            show CLI help
  -s, --status          Show the current paused status of the contract.
```

_See code: [src/commands/unpause/near/client.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/unpause/near/client.ts)_

## `bridge unpause:near:factory`

Unpause factory

```
USAGE
  $ bridge unpause near factory

OPTIONS
  -a, --all      Pause all actions
  -d, --deposit  Pause deposits
  -h, --help     show CLI help
  -s, --status   Show the current paused status of the contract.
  -t, --deploy   Pause deploy token
```

_See code: [src/commands/unpause/near/factory.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/unpause/near/factory.ts)_

## `bridge unpause:near:prover`

Unpause eth prover on NEAR

```
USAGE
  $ bridge unpause near prover

OPTIONS
  -a, --all             Pause all actions
  -b, --addBlockHeader  Pause verify
  -h, --help            show CLI help
  -s, --status          Show the current paused status of the contract.
```

_See code: [src/commands/unpause/near/prover.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/unpause/near/prover.ts)_

## `bridge use BRIDGE_ID`

Select bridge to be used

```
USAGE
  $ bridge use BRIDGE_ID

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/use.ts](https://github.com/aurora-is-near/bridge-cli/blob/v0.0.10/src/commands/use.ts)_
<!-- commandsstop -->
