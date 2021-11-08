import PauseProver from '../../pause/eth/prover';

export default class Unpause extends PauseProver {
  static description = 'Unpause prover on Eth';

  static flags = {
    ...PauseProver.flags
  };

  static args = [...PauseProver.args];

  async run(): Promise<void> {
    return super.run(false);
  }
}
