export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

export type HttpStatusValue = (typeof HttpStatus)[keyof typeof HttpStatus];
export type HttpStatusCode = keyof typeof HttpStatus;
