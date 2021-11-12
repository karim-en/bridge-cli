import PauseClient from '../../pause/eth/client';

export default class Unpause extends PauseClient {
  static description = 'Unpause NEAR light-client on Ethereum';

  static flags = {
    ...PauseClient.flags
  };

  static args = [...PauseClient.args];

  async run(): Promise<void> {
    return super.run(false);
  }
}
