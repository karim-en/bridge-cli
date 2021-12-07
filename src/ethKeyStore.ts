import * as fs from 'fs';
import { join } from 'path';

// TODO: Move to a separate + more secure project

export class EthereumKey {
  address?: string;

  isLedger?: boolean;

  privateKey?: string;

  keyPath?: string;

  name?: string;

  network?: string;

  static async loadFromFile(path: string): Promise<EthereumKey> {
    return JSON.parse((await fs.promises.readFile(path)).toString('utf8'));
  }
}

export class EthereumKeyStore {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  async addKey(key: EthereumKey) {
    if (!fs.existsSync(this.path)) {
      await fs.promises.mkdir(this.path);
    }

    await fs.promises.writeFile(
      join(this.path, key.address + '.json'),
      JSON.stringify(key, null, 2)
    );

    if (key.name !== undefined) {
      await fs.promises.writeFile(
        join(this.path, key.name + '.json'),
        JSON.stringify(key, null, 2)
      );
    }
  }

  async getKey(identifier: string): Promise<EthereumKey> {
    return await EthereumKey.loadFromFile(
      join(this.path, identifier + '.json')
    );
  }
}
