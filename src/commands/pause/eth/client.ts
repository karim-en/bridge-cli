import { BridgeCommand } from '../../../base';
import { flags } from '@oclif/command';
import { EthAdminControlled } from '../../../emergency-utils/eth-admin-controlled';
import { EthClientPausedStatus } from '../../../emergency-utils/eth-admin-controlled-status';

export default class PauseClient extends BridgeCommand {
  static description = 'Pause NEAR light-client on Ethereum';

  static flags = {
    ...BridgeCommand.flags,

    status: flags.boolean({
      char: 's',
      description: 'Show the current paused status of the contract.'
    }),

    deposit: flags.boolean({
      description: 'Pause deposit'
    }),

    withdraw: flags.boolean({
      description: 'Pause withdraw'
    }),

    addBlock: flags.boolean({
      description: 'Pause addBlock'
    }),

    challenge: flags.boolean({
      description: 'Pause challenge'
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
      this.conf.contracts.ethereum.client,
      await this.conf.ethereumSigner()
    );
    const status = new EthClientPausedStatus(await contract.getPaused());

    this.logger.info('Deposit paused:', status.deposit);
    this.logger.info('Withdraw paused:', status.withdraw);
    this.logger.info('Add block paused:', status.addBlock);
    this.logger.info('Challenge paused:', status.challenge);
    this.logger.info('Verify paused:', status.verify);

    if (this.flags.status) {
      return;
    }

    if (this.flags.deposit) {
      status.deposit = isPause;
    }

    if (this.flags.withdraw) {
      status.withdraw = isPause;
    }

    if (this.flags.addBlock) {
      status.addBlock = isPause;
    }

    if (this.flags.challenge) {
      status.challenge = isPause;
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
