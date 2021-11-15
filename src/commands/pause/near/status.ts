import { BridgeCommand } from '../../../base';
import { NearAdminControlled } from '../../../emergency-utils/near-admin-controlled';
import {
  FactoryPausedStatus,
  NearClientPausedStatus,
  NearProverPausedStatus
} from '../../../emergency-utils/near-admin-controlled-status';

export default class Status extends BridgeCommand {
  static description =
    'Show pause status for all Bridge contracts on Near: EthereumOnNear client, EthProver, NearTokenFactory';

  static flags = {
    ...BridgeCommand.flags
  };

  static args = [...BridgeCommand.args];

  async run(): Promise<void> {
    const near = await this.conf.NEAR;
    const clientContract = new NearAdminControlled(
      await near.account(this.conf.contracts.near.client)
    );

    const factoryContract = new NearAdminControlled(
      await near.account(this.conf.contracts.near.tokenFactory)
    );

    const proverContract = new NearAdminControlled(
      await near.account(this.conf.contracts.near.prover)
    );

    const nearClientPausedStatus = new NearClientPausedStatus(
      await clientContract.getPaused()
    );
    this.logger.info(nearClientPausedStatus);

    const factoryPausedStatus = new FactoryPausedStatus(
      await factoryContract.getPaused()
    );
    this.logger.info(factoryPausedStatus);

    const nearProverPausedStatus = new NearProverPausedStatus(
      await proverContract.getPaused()
    );
    this.logger.info(nearProverPausedStatus);
  }
}
