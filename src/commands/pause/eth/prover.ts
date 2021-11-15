import { BridgeCommand } from '../../../base';
import { flags } from '@oclif/command';
import { EthAdminControlled } from '../../../emergency-utils/eth-admin-controlled';
import { EthProverPausedStatus } from '../../../emergency-utils/eth-admin-controlled-status';

export default class PauseProver extends BridgeCommand {
  static description = 'Pause NEAR Prover on Ethereum';

  static flags = {
    ...BridgeCommand.flags,

    status: flags.boolean({
      char: 's',
      description: 'Show the current paused status of the contract'
    }),

    verify: flags.boolean({
      description: 'Pause verify'
    }),

    all: flags.boolean({
      char: 'a',
      description: 'Pause all actions'
    })
  };

  static args = [...BridgeCommand.args];

  async run(isPause = true): Promise<void> {
    const contract = await EthAdminControlled.create(
      this.conf.contracts.ethereum.prover,
      await this.conf.ethereumSigner()
    );
    const status = new EthProverPausedStatus(await contract.getPaused());
    this.logger.info('Verify paused:', status.verify);

    if (this.flags.status) {
      return;
    }

    if (this.flags.verify) {
      status.verify = isPause;
    }

    if (this.flags.all) {
      status.pauseAll(isPause);
    }

    const tx = await contract.setPaused(status.toMask());
    await tx.wait();
    this.logger.info(this.conf.etherscan.transaction(tx.hash));
  }
}
