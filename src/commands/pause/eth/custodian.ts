import { BridgeCommand } from '../../../base';
import { flags } from '@oclif/command';
import { EthAdminControlled } from '../../../emergency-utils/eth-admin-controlled';
import { EthCustodianPausedStatus } from '../../../emergency-utils/eth-admin-controlled-status';

export default class PauseCustodian extends BridgeCommand {
  static description = 'Pause Custodian on Ethereum';

  static flags = {
    ...BridgeCommand.flags,

    status: flags.boolean({
      char: 's',
      description: 'Show the current paused status of the contract.'
    }),

    depositToEvm: flags.boolean({
      description: 'Pause deposit to EVM'
    }),

    depositToNear: flags.boolean({
      description: 'Pause deposit to NEAR'
    }),

    withdraw: flags.boolean({
      description: 'Pause withdraw'
    }),

    all: flags.boolean({
      char: 'a',
      description: 'Pause all actions'
    })
  };

  static args = [...BridgeCommand.args];

  async run(isPause = true): Promise<void> {
    const contract = await EthAdminControlled.create(
      this.conf.contracts.ethereum.custodian,
      await this.conf.ethereumSigner()
    );
    const status = new EthCustodianPausedStatus(await contract.getPaused());

    this.logger.info('Deposit to EVM paused:', status.depositToEvm);
    this.logger.info('Deposit to NEAR paused:', status.depositToNear);
    this.logger.info('Withdraw paused:', status.withdraw);

    if (this.flags.status) {
      return;
    }

    if (this.flags.depositToEvm) {
      status.depositToEvm = isPause;
    }

    if (this.flags.depositToNear) {
      status.depositToNear = isPause;
    }

    if (this.flags.withdraw) {
      status.withdraw = isPause;
    }

    if (this.flags.all) {
      status.pauseAll(isPause);
    }

    const tx = await contract.setPaused(status.toMask());
    await tx.wait();
    this.logger.info(this.conf.etherscan.transaction(tx.hash));
  }
}
