export class AuthError extends Error {
  status?: number;

  constructor(error: {
    name: string;
    status?: number;
    message: string;
    cause?: unknown;
  }) {
    super(error.message);

    this.cause = error.cause;
    this.name = error.name;
    this.status = error.status;
  }
}
