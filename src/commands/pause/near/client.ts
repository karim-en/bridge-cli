import { BridgeCommand } from '../../../base';
import { flags } from '@oclif/command';
import { AdminControlled } from '../../../emergency-utils/near-admin-controlled';
import { EthClientPausedStatus } from '../../../emergency-utils/near-admin-controlled-status';

export default class PauseClient extends BridgeCommand {
  static description = 'Pause eth client';

  static flags = {
    ...BridgeCommand.flags,

    status: flags.boolean({
      char: 's',
      description: 'Show the current paused status of the contract.'
    }),

    addBlockHeader: flags.boolean({
      char: 'h',
      description: 'Pause add block header'
    }),

    all: flags.boolean({
      char: 'a',
      description: 'Pause all actions'
    })
  };

  static args = [...BridgeCommand.args];

  async run(isPause = true): Promise<void> {
    const near = await this.conf.NEAR;
    const contract = new AdminControlled(
      await near.account(this.conf.contracts.near.client)
    );
    const status = new EthClientPausedStatus(await contract.getPaused());

    this.logger.info('Add block header paused:', status.addBlockHeader);

    if (this.flags.status) {
      return;
    }

    if (this.flags.addBlockHeader) {
      status.addBlockHeader = isPause;
    }

    if (this.flags.all) {
      status.pauseAll(isPause);
    }

    const res = await contract.setPaused(status.toMask());
    this.logger.info(this.conf.nearExplorer.transaction(res.transaction.hash));
  }
}
