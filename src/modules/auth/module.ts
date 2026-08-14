import { AuthController } from '@modules/auth/controllers';
import { Module } from '@nestjs/common';
import { AuthService } from '@modules/auth/services';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
