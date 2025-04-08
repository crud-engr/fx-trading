import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'src/app/app.controller';
import { AppService } from 'src/app/app.service';
import { AuthModule } from 'src/auth/auth.module';
import { ExchangeRateController } from 'src/integrations/controllers/exchange-rates/exhange-rate.controller';
import { ExchangeRateGateway } from 'src/integrations/services/exchange-rates/exchange-rate.gateway';
import { User } from 'src/users/entity/user.entity';
import { UsersModule } from 'src/users/users.module';
import { Wallet } from 'src/wallet/entity/wallet.entity';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    WalletModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: process.env.DB_HOST,
      // port: parseInt(process.env.DB_PORT, 10),
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [User, Wallet],
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController, ExchangeRateController],
  providers: [AppService, ExchangeRateGateway, ConfigService],
})
export class AppModule {}
