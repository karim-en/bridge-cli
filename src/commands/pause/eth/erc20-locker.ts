import { BridgeCommand } from '../../../base';
import { flags } from '@oclif/command';
import { EthAdminControlled } from '../../../emergency-utils/eth-admin-controlled';
import { ERC20LockerPausedStatus } from '../../../emergency-utils/eth-admin-controlled-status';

export default class PauseErc20Locker extends BridgeCommand {
  static description = 'Pause erc20 locker';

  static flags = {
    ...BridgeCommand.flags,

    status: flags.boolean({
      char: 's',
      description: 'Show the current paused status of the contract.'
    }),

    lock: flags.boolean({
      char: 'l',
      description: 'Pause lock'
    }),

    verify: flags.boolean({
      char: 'u',
      description: 'Pause unlock'
    }),

    all: flags.boolean({
      char: 'a',
      description: 'Pause all actions'
    })
  };

  static args = [...BridgeCommand.args];

  async run(isPause = true): Promise<void> {
    const contract = await EthAdminControlled.create(
      this.conf.contracts.ethereum.erc20Locker,
      await this.conf.ethereumSigner()
    );
    const status = new ERC20LockerPausedStatus(await contract.getPaused());
    this.logger.info('Lock paused:', status.lock);
    this.logger.info('Unlock paused:', status.unlock);

    if (this.flags.status) {
      return;
    }

    if (this.flags.lock) {
      status.lock = isPause;
    }

    if (this.flags.unlock) {
      status.unlock = isPause;
    }

    if (this.flags.all) {
      status.pauseAll(isPause);
    }

    const tx = await contract.setPaused(status.toMask());
    await tx.wait();
    this.logger.info(this.conf.etherscan.transaction(tx.hash));
  }
}
