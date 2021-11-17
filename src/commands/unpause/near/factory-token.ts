import PauseFactoryToken from '../../pause/near/factory-token';

export default class Unpause extends PauseFactoryToken {
  static description = 'Unpause bridge factory token on NEAR';

  static flags = {
    ...PauseFactoryToken.flags
  };

  static args = [...PauseFactoryToken.args];

  async run(): Promise<void> {
    return super.run(false);
  }
}
