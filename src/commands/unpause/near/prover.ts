import PauseProver from '../../pause/near/prover';

export default class Unpause extends PauseProver {
  static description = 'Unpause prover';

  static flags = {
    ...PauseProver.flags
  };

  static args = [...PauseProver.args];

  async run(): Promise<void> {
    return super.run(false);
  }
}
