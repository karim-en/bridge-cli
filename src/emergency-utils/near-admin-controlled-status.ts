export interface IPausedStatus {
  toMask(): number;
  pauseAll(pause: boolean): void;
}

export class FactoryPausedStatus implements IPausedStatus {
  deploy: boolean;

  deposit: boolean;

  constructor(mask: number) {
    this.deploy = (mask & 1) !== 0;
    this.deposit = (mask & 2) !== 0;
  }

  toMask(): number {
    return Number(this.deploy) | (Number(this.deposit) << 1);
  }

  pauseAll(pause: boolean): void {
    this.deploy = pause;
    this.deposit = pause;
  }
}

export class NearClientPausedStatus implements IPausedStatus {
  addBlockHeader: boolean;

  constructor(mask: number) {
    this.addBlockHeader = (mask & 1) !== 0;
  }

  toMask(): number {
    return Number(this.addBlockHeader);
  }

  pauseAll(pause: boolean): void {
    this.addBlockHeader = pause;
  }
}

export class NearProverPausedStatus implements IPausedStatus {
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

export class NearFactoryTokenPausedStatus implements IPausedStatus {
  withdraw: boolean;

  constructor(mask: number) {
    this.withdraw = (mask & 1) !== 0;
  }

  toMask(): number {
    return Number(this.withdraw);
  }

  pauseAll(pause: boolean): void {
    this.withdraw = pause;
  }
}
