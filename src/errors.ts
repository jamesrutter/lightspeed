export class LightspeedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LightspeedError';
  }
}

export class LightspeedAuthError extends LightspeedError {
  constructor(message: string) {
    super(message);
    this.name = 'LightspeedAuthError';
  }
}
