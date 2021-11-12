import { BridgeCommand } from '../../../base';
import { flags } from '@oclif/command';
import { NearAdminControlled } from '../../../emergency-utils/near-admin-controlled';
import { FactoryPausedStatus } from '../../../emergency-utils/near-admin-controlled-status';

export default class PauseFactory extends BridgeCommand {
  static description = 'Pause token factory on Near';

  static flags = {
    ...BridgeCommand.flags,

    status: flags.boolean({
      char: 's',
      description: 'Show the current paused status of the contract.'
    }),

    deploy: flags.boolean({
      description: 'Pause deploy token'
    }),

    deposit: flags.boolean({
      description: 'Pause deposits'
    }),

    all: flags.boolean({
      char: 'a',
      description: 'Pause all actions'
    })
  };

  static args = [...BridgeCommand.args];

  async run(isPause = true): Promise<void> {
    const near = await this.conf.NEAR;
    const contract = new NearAdminControlled(
      await near.account(this.conf.contracts.near.tokenFactory)
    );
    const status = new FactoryPausedStatus(await contract.getPaused());

    this.logger.info('Deploy paused:', status.deploy);
    this.logger.info('Deposit paused:', status.deposit);

    if (this.flags.status) {
      return;
    }

    if (this.flags.deploy) {
      status.deploy = isPause;
    }

    if (this.flags.deposit) {
      status.deposit = isPause;
    }

    if (this.flags.all) {
      status.pauseAll(isPause);
    }

    const res = await contract.setPaused(status.toMask());
    this.logger.info(this.conf.nearExplorer.transaction(res.transaction.hash));
  }
}
