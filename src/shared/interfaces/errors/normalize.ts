import { ErrorCodeEnum } from '@shared/enums';

export interface INormalizeError {
  statusCode: number;
  code: ErrorCodeEnum;
  message: string;
}
