import { ethers } from 'ethers';
import { TransactionResponse } from '@ethersproject/abstract-provider';

export class EthAdminControlled {
  private contract: ethers.Contract;

  static async create(
    address: string,
    signer: ethers.Wallet
  ): Promise<EthAdminControlled> {
    const abi = [
      'function paused() public returns (uint value)',
      'function adminPause(uint value)'
    ];

    const contract = new ethers.Contract(address, abi, signer);

    return new EthAdminControlled(contract);
  }

  constructor(contract: ethers.Contract) {
    this.contract = contract;
  }

  async setPaused(newMask: number): Promise<TransactionResponse> {
    return this.contract.adminPause(newMask);
  }

  async getPaused(): Promise<number> {
    return this.contract.paused();
  }
}
