import { BridgeCommand } from '../../../base';
import { AdminControlled } from '../../../emergency-utils/near-admin-controlled';
import {
  EthClientPausedStatus,
  EthProverPausedStatus,
  FactoryPausedStatus,
  IPausedStatus
} from '../../../emergency-utils/near-admin-controlled-status';

export default class PauseAll extends BridgeCommand {
  static description = 'Pause all near contracts';

  static flags = {
    ...BridgeCommand.flags
  };

  static args = [...BridgeCommand.args];

  async pauseAll(
    isPause: boolean,
    address: string,
    status: IPausedStatus
  ): Promise<void> {
    const near = await this.conf.NEAR;
    const contract = new AdminControlled(await near.account(address));
    status.pauseAll(isPause);
    const res = await contract.setPaused(status.toMask());
    this.logger.info(this.conf.nearExplorer.transaction(res.transaction.hash));
  }

  async run(isPause = true): Promise<void> {
    await this.pauseAll(
      isPause,
      this.conf.contracts.near.client,
      new EthClientPausedStatus(0)
    );
    await this.pauseAll(
      isPause,
      this.conf.contracts.near.tokenFactory,
      new FactoryPausedStatus(0)
    );
    await this.pauseAll(
      isPause,
      this.conf.contracts.near.prover,
      new EthProverPausedStatus(0)
    );
  }
}
