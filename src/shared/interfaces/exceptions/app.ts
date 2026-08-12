import { HttpStatus } from '@nestjs/common';
import { ErrorCodeEnum } from '@shared/enums';

export interface IErrorCodeEntry {
  status: HttpStatus;
  message: string;
}

export interface IAppErrorException {
  code: ErrorCodeEnum;
  message: string;
  details?: unknown;
}
