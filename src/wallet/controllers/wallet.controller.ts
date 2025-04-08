import { Body, Controller, Get, Query } from '@nestjs/common';
import { CurrencyEnum } from '../enums/wallet.enum';
import { WalletService } from '../services/wallet.service';
import { WalletBalanceDto } from '../dtos/wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  /**
   * Get Wallet Balance
   * @param currency
   * @returns
   */
  @Get('')
  public async getWalletBalance(@Body() walletBalanceDto: WalletBalanceDto) {
    return await this.walletService.getWalletBalance(walletBalanceDto);
  }
}
