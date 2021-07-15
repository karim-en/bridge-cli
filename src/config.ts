import * as assert from 'assert';
import * as nearAPI from 'near-api-js';
import { homedir } from 'os';
import { join } from 'path';

class BaseConfig {
  config: any;

  constructor(config: unknown) {
    this.config = config;
  }

  has(key: string, type = '') {
    assert.ok(key in this.config);
    if (type !== '') {
      assert.strictEqual(typeof this.config[key], type);
    }
  }
}

export class Monitor extends BaseConfig {
  get port(): number {
    this.has('port', 'number');
    return this.config.port;
  }

  get timeout(): number {
    this.has('timeout', 'number');
    return this.config.timeout;
  }
}

export class Global extends BaseConfig {
  get bridgeId(): string {
    this.has('bridge_id', 'string');
    return this.config.bridge_id;
  }

  get nearNodeUrl(): string {
    this.has('near_node_url', 'string');
    return this.config.near_node_url;
  }
}

export class Config extends BaseConfig {
  get monitor(): Monitor {
    this.has('monitor');
    return new Monitor(this.config.monitor);
  }

  get global(): Global {
    this.has('global');
    return new Global(this.config.global);
  }

  get keyStorePath(): string {
    return join(homedir(), '.near-credentials');
  }

  get keyStore(): nearAPI.keyStores.KeyStore {
    return new nearAPI.keyStores.UnencryptedFileSystemKeyStore(
      this.keyStorePath
    );
  }

  get nearNodeUrl(): string {
    return this.global.nearNodeUrl;
  }

  get nearNetworkId(): string {
    switch (this.global.bridgeId) {
      case 'mainnet':
        return 'mainnet';
      case 'ropsten':
        return 'testnet';
      default:
        return 'local';
    }
  }

  get NEAR(): Promise<nearAPI.Near> {
    return nearAPI.connect({
      nodeUrl: this.nearNodeUrl,
      networkId: this.nearNetworkId,
      deps: {
        keyStore: this.keyStore
      }
    });
  }
}
