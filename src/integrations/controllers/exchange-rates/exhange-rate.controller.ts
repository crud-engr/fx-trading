import { Body, Controller, Get } from '@nestjs/common';
import { RateDto } from 'src/integrations/dtos/exchange-rate.dto';
import { ExchangeRateGateway } from 'src/integrations/services/exchange-rates/exchange-rate.gateway';

@Controller('fx')
export class ExchangeRateController {
  constructor(private readonly exchangeRateGateway: ExchangeRateGateway) {}

  @Get('rates')
  public async getFxRates(@Body() rateDto: RateDto) {
    // Wrap this rates in cache
    return await this.exchangeRateGateway.getSupportedRates(rateDto.currency);
  }
}
