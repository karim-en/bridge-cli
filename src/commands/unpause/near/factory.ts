import PauseFactory from '../../pause/near/factory';

export default class Unpause extends PauseFactory {
  static description = 'Unpause factory';

  static flags = {
    ...PauseFactory.flags
  };

  static args = [...PauseFactory.args];

  async run(): Promise<void> {
    return super.run(false);
  }
}
