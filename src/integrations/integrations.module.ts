import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  THIRD_PARTY_INTEGRATION_TYPES,
  ExchangeRateGatewayEnum,
} from './constants/index';
import { ExchangeRateGateway } from './services/exchange-rates/exchange-rate.gateway';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
    ExchangeRateGateway,

    // Exchange rate gateway provider
    {
      provide: THIRD_PARTY_INTEGRATION_TYPES.EXCHANGE_GATEWAY_PROVIDER,
      useFactory: (
        configService: ConfigService,
        exchangeRateProvider: ExchangeRateGateway,
      ) => {
        const exchangeRateGatewayProvider = configService.get(
          'EXCHANGE_RATE_GATEWAY_PROVIDER',
        );
        switch (exchangeRateGatewayProvider.toLowerCase()) {
          case ExchangeRateGatewayEnum.EXCHANGE_RATE:
            return exchangeRateProvider;
          default:
            throw new Error(
              `Unknown exhange rate provider: ${exchangeRateProvider} encountered in config`,
            );
        }
      },
      inject: [ConfigService, ExchangeRateGateway],
    },
  ],
  controllers: [],
  exports: [THIRD_PARTY_INTEGRATION_TYPES.EXCHANGE_GATEWAY_PROVIDER],
})
export class IntegrationsModule {}
