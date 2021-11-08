import { Account } from 'near-api-js';
import * as borsh from 'borsh';
import BN from 'bn.js';
import { FinalExecutionOutcome } from 'near-api-js/lib/providers';

class Assignable {
  constructor(properties: any) {
    Object.keys(properties).forEach((key) => {
      // @ts-ignore
      this[key] = properties[key];
    });
  }
}

class U128 extends Assignable {
  value?: BN;
}

const u128Schema = new Map([
  [U128, { kind: 'struct', fields: [['value', 'u128']] }]
]);

export class NearAdminControlled {
  account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  async setPaused(newMask: number): Promise<FinalExecutionOutcome> {
    return this.account.functionCall({
      contractId: this.account.accountId,
      methodName: 'set_paused',
      args: new U128({
        value: newMask
      }),
      stringify: (input) => {
        return Buffer.from(borsh.serialize(u128Schema, input));
      }
    });
  }

  async getPaused(): Promise<number> {
    return this.account.viewFunction(
      this.account.accountId,
      'get_paused',
      {},
      {
        parse: (response: Uint8Array) => {
          const result: U128 = borsh.deserialize(
            u128Schema,
            U128,
            Buffer.from(response)
          );
          return result.value!.toNumber();
        }
      }
    );
  }
}
