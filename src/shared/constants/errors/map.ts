import { HttpStatus } from '@nestjs/common';
import { ErrorCodeEnum } from '@shared/enums';
import { IErrorCodeEntry } from '@shared/interfaces';

export const ERROR_CODE: Record<ErrorCodeEnum, IErrorCodeEntry> = {
  /* ======================= AVITO USERS ======================= */
  [ErrorCodeEnum.USER_NOT_FOUND]: {
    status: HttpStatus.NOT_FOUND,
    message: 'Пользователь не найден',
  },

  /* ======================= AVITO ACCOUNTS ======================= */
  [ErrorCodeEnum.ACCOUNT_EXISTS]: {
    status: HttpStatus.CONFLICT,
    message: 'Такой аккаунт уже существует',
  },
  [ErrorCodeEnum.ACCOUNT_NOT_FOUND]: {
    status: HttpStatus.NOT_FOUND,
    message: 'Аккаунта не существует',
  },

  /* ======================= AVITO CHATS ======================= */
  [ErrorCodeEnum.CHAT_NOT_FOUND]: {
    status: HttpStatus.NOT_FOUND,
    message: 'Чата не существует',
  },

  /* ======================= AVITO ITEMS ======================= */
  [ErrorCodeEnum.ITEM_NOT_FOUND]: {
    status: HttpStatus.NOT_FOUND,
    message: 'Объявления не существует',
  },

  /* ======================= AVITO MESSAGES ======================= */
  [ErrorCodeEnum.MESSAGE_NOT_SEND]: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Не удалось отправить сообщение',
  },

  /* ======================= AVITO API ======================= */
  [ErrorCodeEnum.AVITO_GET_TOKEN_ERROR]: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Api error',
  },

  /* ======================= WEBHOOKS ======================= */
  [ErrorCodeEnum.WEBHOOK_MESSAGE_WAS_RECEIVED]: {
    status: HttpStatus.CONFLICT,
    message: 'Данные уже были получены',
  },
  [ErrorCodeEnum.WEBHOOK_INVALID_MESSAGE_PAYLOAD]: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Bad data',
  },
  [ErrorCodeEnum.WEBHOOK_INVALID_PROCESSED]: {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Ошибка обработки webhook',
  },

  /* ======================= GENERAL ======================= */
  [ErrorCodeEnum.INTERNAL_ERROR]: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Непредвиденная ошибка',
  },
  [ErrorCodeEnum.VALIDATION_ERROR]: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Ошибка валидации',
  },
  [ErrorCodeEnum.TOO_MANY_ATTEMPTS]: {
    status: HttpStatus.TOO_MANY_REQUESTS,
    message: 'Слишком много попыток',
  },
  [ErrorCodeEnum.REQUEST_TIMEOUT]: {
    status: HttpStatus.REQUEST_TIMEOUT,
    message: 'Превышено время ожидания ответа',
  },
  [ErrorCodeEnum.NOT_ALLOWED]: {
    status: HttpStatus.METHOD_NOT_ALLOWED,
    message: 'Метод недоступен',
  },
  [ErrorCodeEnum.RESOURCE_NOT_FOUND]: {
    status: HttpStatus.NOT_FOUND,
    message: 'Ресурс не найден',
  },
};
