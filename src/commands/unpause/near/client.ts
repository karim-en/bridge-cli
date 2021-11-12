import PauseClient from '../../pause/near/client';

export default class Unpause extends PauseClient {
  static description = 'Unpause Ethereum client on NEAR';

  static flags = {
    ...PauseClient.flags
  };

  static args = [...PauseClient.args];

  async run(): Promise<void> {
    return super.run(false);
  }
}
