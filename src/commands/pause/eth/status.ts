import { BridgeCommand } from '../../../base';
import {
  EthClientPausedStatus,
  EthProverPausedStatus,
  ERC20LockerPausedStatus,
  EthCustodianPausedStatus
} from '../../../emergency-utils/eth-admin-controlled-status';
import { EthAdminControlled } from '../../../emergency-utils/eth-admin-controlled';

export default class Status extends BridgeCommand {
  static description =
    'Show pause status for all Bridge contracts on Ethereum: NearOnEthereum client, NearProver, ERC20Locker, EthCustodian';

  static flags = {
    ...BridgeCommand.flags
  };

  static args = [...BridgeCommand.args];

  async run(): Promise<void> {
    const clientContract = await EthAdminControlled.create(
      this.conf.contracts.ethereum.client,
      await this.conf.ethereumSigner()
    );

    const erc20LockerContract = await EthAdminControlled.create(
      this.conf.contracts.ethereum.erc20Locker,
      await this.conf.ethereumSigner()
    );

    const proverContract = await EthAdminControlled.create(
      this.conf.contracts.ethereum.prover,
      await this.conf.ethereumSigner()
    );

    const custodianContract = await EthAdminControlled.create(
      this.conf.contracts.ethereum.custodian,
      await this.conf.ethereumSigner()
    );

    const clientStatus = new EthClientPausedStatus(
      await clientContract.getPaused()
    );
    this.logger.info(clientStatus);

    const ethCustodianStatus = new EthCustodianPausedStatus(
      await custodianContract.getPaused()
    );
    this.logger.info(ethCustodianStatus);

    const erc20LockerStatus = new ERC20LockerPausedStatus(
      await erc20LockerContract.getPaused()
    );
    this.logger.info(erc20LockerStatus);

    const ethProverStatus = new EthProverPausedStatus(
      await proverContract.getPaused()
    );
    this.logger.info(ethProverStatus);
  }
}
