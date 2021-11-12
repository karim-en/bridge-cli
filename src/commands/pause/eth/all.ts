import { BridgeCommand } from '../../../base';
import {
  EthClientPausedStatus,
  EthProverPausedStatus,
  ERC20LockerPausedStatus,
  IPausedStatus,
  EthCustodianPausedStatus
} from '../../../emergency-utils/eth-admin-controlled-status';
import { EthAdminControlled } from '../../../emergency-utils/eth-admin-controlled';

export default class PauseAll extends BridgeCommand {
  static description =
    'Pause all Bridge contracts on Ethereum: NearOnEthereum client, NearProver, ERC20Locker, EthCustodian';

  static flags = {
    ...BridgeCommand.flags
  };

  static args = [...BridgeCommand.args];

  async pauseAll(
    isPause: boolean,
    address: string,
    status: IPausedStatus
  ): Promise<void> {
    const contract = await EthAdminControlled.create(
      address,
      await this.conf.ethereumSigner()
    );
    status.pauseAll(isPause);
    const tx = await contract.setPaused(status.toMask());
    await tx.wait();
    this.logger.info(this.conf.etherscan.transaction(tx.hash));
  }

  async run(isPause = true): Promise<void> {
    await this.pauseAll(
      isPause,
      this.conf.contracts.ethereum.client,
      new EthClientPausedStatus(0)
    );
    await this.pauseAll(
      isPause,
      this.conf.contracts.ethereum.erc20Locker,
      new ERC20LockerPausedStatus(0)
    );
    await this.pauseAll(
      isPause,
      this.conf.contracts.ethereum.prover,
      new EthProverPausedStatus(0)
    );
    await this.pauseAll(
      isPause,
      this.conf.contracts.ethereum.custodian,
      new EthCustodianPausedStatus(0)
    );
  }
}
