import { HttpStatusValue } from '../constants/https-status';

export class HttpError extends Error {
  constructor(
    message: string,
    public status: HttpStatusValue
  ) {
    super(message);
    this.name = 'HttpError';
    Object.setPrototypeOf(this, HttpError.prototype);
  }

  toJSON() {
    return {
      message: this.message,
      status: this.status,
    };
  }
}

export function createHttpError(
  message: string,
  status: HttpStatusValue
): HttpError {
  return new HttpError(message, status);
}
