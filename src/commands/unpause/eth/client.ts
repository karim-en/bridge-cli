import PauseClient from '../../pause/eth/client';

export default class Unpause extends PauseClient {
  static description = 'Unpause Near on Eth client';

  static flags = {
    ...PauseClient.flags
  };

  static args = [...PauseClient.args];

  async run(): Promise<void> {
    return super.run(false);
  }
}
