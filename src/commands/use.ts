import { BridgeNoConfigCommand } from '../base';
import { CONFIG_PATH } from '../config';
import * as fs from 'fs';
import { join } from 'path';
import { readFileSync } from 'fs';

const CONFIG_FILE_PREFIX = 'configuration/';

export default class Use extends BridgeNoConfigCommand {
  static description = 'Select bridge to be used';

  static flags = {
    ...BridgeNoConfigCommand.flags
  };

  static args = [
    ...BridgeNoConfigCommand.args,
    { name: 'bridge_id', required: true, default: '' }
  ];

  async run(): Promise<void> {
    if (!fs.existsSync(join(CONFIG_PATH, this.args.bridge_id, 'config.yml'))) {
      const response = await readFileSync(
        CONFIG_FILE_PREFIX + this.args.bridge_id + '.yml'
      );
      const data = response.toString();

      await fs.promises.mkdir(join(CONFIG_PATH, this.args.bridge_id), {
        recursive: true
      });

      const conf = await fs.promises.open(
        join(CONFIG_PATH, this.args.bridge_id, 'config.yml'),
        'w'
      );

      await fs.promises.writeFile(conf, data);
      await conf.close();
    }

    const bridge = await fs.promises.open(join(CONFIG_PATH, 'bridge'), 'w');

    await fs.promises.writeFile(bridge, this.args.bridge_id);
    await bridge.close();
  }
}
