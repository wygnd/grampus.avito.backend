export interface IAvitoApiMessageSendRequest {
  message: {
    text: string;
  };
  type: 'text';
}

export interface IAvitoMessageSend {
  userId: number;
  chatId: string;
  chatExternalId: string;
  accessToken: string;
  text: string;
}
