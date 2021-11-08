export interface IPausedStatus {
  toMask(): number;
  pauseAll(pause: boolean): void;
}

export class EthClientPausedStatus implements IPausedStatus {
  deposit: boolean;

  withdraw: boolean;

  addBlock: boolean;

  challenge: boolean;

  verify: boolean;

  constructor(mask: number) {
    this.deposit = (mask & 1) !== 0;
    this.withdraw = (mask & 2) !== 0;
    this.addBlock = (mask & 4) !== 0;
    this.challenge = (mask & 8) !== 0;
    this.verify = (mask & 16) !== 0;
  }

  toMask(): number {
    return (
      Number(this.deposit) |
      (Number(this.withdraw) << 1) |
      (Number(this.addBlock) << 2) |
      (Number(this.challenge) << 3) |
      (Number(this.verify) << 4)
    );
  }

  pauseAll(pause: boolean): void {
    this.deposit = pause;
    this.withdraw = pause;
    this.addBlock = pause;
    this.challenge = pause;
    this.verify = pause;
  }
}

export class EthProverPausedStatus implements IPausedStatus {
  verify: boolean;

  constructor(mask: number) {
    this.verify = (mask & 1) !== 0;
  }

  toMask(): number {
    return Number(this.verify);
  }

  pauseAll(pause: boolean): void {
    this.verify = pause;
  }
}

export class ERC20LockerPausedStatus implements IPausedStatus {
  lock: boolean;

  unlock: boolean;

  constructor(mask: number) {
    this.lock = (mask & 1) !== 0;
    this.unlock = (mask & 2) !== 0;
  }

  toMask(): number {
    return Number(this.lock) | (Number(this.unlock) << 1);
  }

  pauseAll(pause: boolean): void {
    this.lock = pause;
    this.unlock = pause;
  }
}
