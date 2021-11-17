import { BridgeCommand } from '../../../base';
import { flags } from '@oclif/command';
import { NearAdminControlled } from '../../../emergency-utils/near-admin-controlled';
import { NearFactoryTokenPausedStatus } from '../../../emergency-utils/near-admin-controlled-status';
import { Connection } from 'postgresql-client';
import * as nearAPI from 'near-api-js';

export default class PauseFactoryToken extends BridgeCommand {
  static description = 'Pause bridge factory token on NEAR';

  static flags = {
    ...BridgeCommand.flags,

    status: flags.boolean({
      char: 's',
      description: 'Show the current paused status of the contract'
    }),

    token: flags.string({
      description: '*.factory.near | all',
      required: true
    }),

    withdraw: flags.boolean({
      description: 'Pause withdraw'
    }),

    all: flags.boolean({
      char: 'a',
      description: 'Pause all actions'
    })
  };

  static args = [...BridgeCommand.args];

  async pauseToken(
    token: string,
    isPause: boolean,
    near: nearAPI.Near
  ): Promise<void> {
    const tokenContract = new NearAdminControlled(await near.account(token));
    const status = new NearFactoryTokenPausedStatus(
      await tokenContract.getPaused()
    );

    this.logger.info(`Token ${token}`, status);

    if (this.flags.status) {
      return;
    }

    if (this.flags.withdraw) {
      status.withdraw = isPause;
    }

    if (this.flags.all) {
      status.pauseAll(isPause);
    }

    const res = await tokenContract.setPaused(status.toMask());
    this.logger.info(this.conf.nearExplorer.transaction(res.transaction.hash));
  }

  async run(isPause = true): Promise<void> {
    const near = await this.conf.NEAR;

    if (this.flags.token.toLowerCase() === 'all') {
      const allTokens = await getFactoryTokenList(
        this.conf.near.indexer,
        this.conf.contracts.near.tokenFactory
      );

      if (allTokens !== undefined) {
        await Promise.all(
          allTokens.map((token: string) => {
            return this.pauseToken(
              this.conf.bridgeTokenAccountIdFromAddress(token),
              isPause,
              near
            );
          })
        );
      }
    } else {
      await this.pauseToken(this.flags.token, isPause, near);
    }
  }
}

export async function getFactoryTokenList(
  indexer: string,
  tokenFactoryAddress: string
): Promise<string[] | undefined> {
  const conn = new Connection(indexer);
  await conn.connect();

  const QUERY = `SELECT args FROM public.action_receipt_actions
    WHERE receipt_receiver_account_id = '${tokenFactoryAddress}'
    AND args ->> 'method_name' = 'deploy_bridge_token'
    ORDER BY receipt_included_in_block_timestamp ASC`;

  const result = await conn.query(QUERY);

  const tokens = result.rows?.map((row: Buffer[]): string => {
    const text = row[0].slice(1, row[0].length).toString('utf8');
    const info = JSON.parse(text);
    return info.args_json.address.toLowerCase();
  });

  await conn.close();
  return tokens;
}
