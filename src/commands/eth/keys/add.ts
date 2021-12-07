import { BridgeCommand } from '../../../base';
import { ethers } from 'ethers';

export default class AddKey extends BridgeCommand {
  static description = 'Add Ethereum Key into the Key Store.';

  static flags = {
    ...BridgeCommand.flags
  };

  static args = [
    ...BridgeCommand.args,
    { name: 'privateKey', required: true, default: '' },
    { name: 'name', required: false, default: '' }
  ];

  async run(): Promise<void> {
    let name = undefined;
    if (this.args.name !== '') {
      name = this.args.name;
    }

    await this.conf.ethKeyStore.addKey({
      name: name,
      address: ethers.utils.computeAddress(this.args.privateKey),
      network: this.conf.ethereumNetworkId,
      isLedger: false,
      keyPath: undefined,
      privateKey: this.args.privateKeyOrPath
    });
  }
}
