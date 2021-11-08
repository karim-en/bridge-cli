import PauseAll from '../../pause/eth/all';

export default class Unpause extends PauseAll {
  static description = 'Unpause all eth contracts';

  static flags = {
    ...PauseAll.flags
  };

  static args = [...PauseAll.args];

  async run(): Promise<void> {
    return super.run(false);
  }
}
