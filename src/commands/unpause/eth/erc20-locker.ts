import PauseErc20Locker from '../../pause/eth/erc20-locker';

export default class Unpause extends PauseErc20Locker {
  static description = 'Unpause erc20 locker';

  static flags = {
    ...PauseErc20Locker.flags
  };

  static args = [...PauseErc20Locker.args];

  async run(): Promise<void> {
    return super.run(false);
  }
}
