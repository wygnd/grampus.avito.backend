import { HttpException } from '@nestjs/common';
import { ERROR_CODE } from '@shared/constants';
import { ErrorCodeEnum } from '@shared/enums';

export class AppException extends HttpException {
  public readonly code: ErrorCodeEnum;

  constructor(code: ErrorCodeEnum, message?: string, details?: unknown) {
    const entry = ERROR_CODE[code];

    super(
      {
        code: code,
        message: message ?? entry.message,
        details: details,
      },
      entry.status,
    );

    this.code = code;
  }
}
