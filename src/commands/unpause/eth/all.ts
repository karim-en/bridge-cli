import PauseAll from '../../pause/eth/all';

export default class Unpause extends PauseAll {
  static description =
    'Unpause all Bridge contracts on Ethereum: NearOnEthereum client, NearProver, ERC20Locker, EthCustodian';

  static flags = {
    ...PauseAll.flags
  };

  static args = [...PauseAll.args];

  async run(): Promise<void> {
    return super.run(false);
  }
}
