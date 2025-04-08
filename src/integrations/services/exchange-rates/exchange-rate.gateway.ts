import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { CurrencyEnum } from 'src/wallet/enums/wallet.enum';

/**
 * Exchange rate provider
 */
@Injectable()
export class ExchangeRateGateway {
  private httpService: HttpService;
  private readonly logger = new Logger(ExchangeRateGateway.name);

  constructor(private configService: ConfigService) {
    this.httpService = new HttpService(
      axios.create({
        baseURL: this.configService.get('EXCHANGE_RATE_BASE_URL'),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    );
  }

  /**
   * Convert from base currency to other currencies
   */
  async convertCurrency(
    baseCurrency: CurrencyEnum,
    targetCurrency: CurrencyEnum,
  ) {
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `/${this.configService.get('EXCHANGE_RATE_API_KEY')}/pair/${baseCurrency}/${targetCurrency}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(`: ${error.message}`, error.stack);
            throw new Error(
              `Error in converting ${baseCurrency} to ${targetCurrency} `,
            );
          }),
        ),
    );
    return data;
  }

  /**
   * Get Fx rates
   * @param currency
   * @returns
   */
  async getSupportedRates(currency: CurrencyEnum) {
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `/${this.configService.get('EXCHANGE_RATE_API_KEY')}/latest/${currency}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(`: ${error.message}`, error.stack);
            throw new Error(`Error in fetching ${currency} exchange rate `);
          }),
        ),
    );
    return data;
  }
}
