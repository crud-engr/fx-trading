import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/users/users.module';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports: [UsersModule, WalletModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
