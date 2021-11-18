import { BridgeCommand } from '../../../base';
import { NearAdminControlled } from '../../../emergency-utils/near-admin-controlled';
import {
  NearClientPausedStatus,
  NearProverPausedStatus,
  FactoryPausedStatus,
  IPausedStatus
} from '../../../emergency-utils/near-admin-controlled-status';

export default class PauseAll extends BridgeCommand {
  static description =
    'Pause all Bridge contracts on Near: EthereumOnNear client, EthProver, NearTokenFactory';

  static flags = {
    ...BridgeCommand.flags
  };

  static args = [...BridgeCommand.args];

  async pauseAll(
    isPause: boolean,
    address: string,
    status: IPausedStatus
  ): Promise<void> {
    try {
      const near = await this.conf.NEAR;
      const contract = new NearAdminControlled(await near.account(address));
      status.pauseAll(isPause);
      const res = await contract.setPaused(status.toMask());
      this.logger.info(
        this.conf.nearExplorer.transaction(res.transaction.hash)
      );
    } catch (error) {
      this.logger.error(error);
    }
  }

  async run(isPause = true): Promise<void> {
    await this.pauseAll(
      isPause,
      this.conf.contracts.near.client,
      new NearClientPausedStatus(0)
    );
    await this.pauseAll(
      isPause,
      this.conf.contracts.near.tokenFactory,
      new FactoryPausedStatus(0)
    );
    await this.pauseAll(
      isPause,
      this.conf.contracts.near.prover,
      new NearProverPausedStatus(0)
    );
  }
}
