import { BridgeCommand } from '../../../base';
import { LedgerSigner } from '@ethersproject/hardware-wallets';

export default class AddKey extends BridgeCommand {
  static description = 'Add Ethereum ledger account into the Key Store.';

  static args = [
    ...BridgeCommand.args,
    { name: 'keyPath', required: false, default: '' },
    { name: 'name', required: false, default: '' }
  ];

  async run(): Promise<void> {
    let name;
    if (this.args.name !== '') {
      name = this.args.name;
    }

    const ledgerSigner = new LedgerSigner(
      undefined,
      undefined,
      this.args.keyPath
    );

    const address = await ledgerSigner.getAddress();
    await this.conf.ethKeyStore.addKey({
      name: name,
      address: address,
      network: this.conf.ethereumNetworkId,
      isLedger: true,
      keyPath: this.args.keyPath,
      privateKey: undefined
    });
  }
}
