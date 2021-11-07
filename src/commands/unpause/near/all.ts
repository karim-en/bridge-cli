import PauseAll from '../../pause/near/all';

export default class Unpause extends PauseAll {
  static description = 'Unpause all near contracts';

  static flags = {
    ...PauseAll.flags
  };

  static args = [...PauseAll.args];

  async run(): Promise<void> {
    return super.run(false);
  }
}
