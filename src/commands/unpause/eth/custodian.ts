import PauseCustodian from '../../pause/eth/custodian';

export default class Unpause extends PauseCustodian {
  static description = 'Unpause Custodian on Ethereum';

  static flags = {
    ...PauseCustodian.flags
  };

  static args = [...PauseCustodian.args];

  async run(): Promise<void> {
    return super.run(false);
  }
}
