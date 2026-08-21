import { NestFastifyApplication } from '@nestjs/platform-fastify';

export const setupAppCors = (app: NestFastifyApplication): void => {
  app.enableCors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });
};
