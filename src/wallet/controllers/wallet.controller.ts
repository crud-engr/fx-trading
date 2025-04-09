import { Body, Controller, Get } from '@nestjs/common';
import { WalletService } from '../services/wallet.service';
import { GetTransactionsDto, WalletBalanceDto } from '../dtos/wallet.dto';

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

  /**
   * Get transaction history of a wallet
   * @param walletBalanceDto
   * @returns
   */
  @Get('transactions')
  public async getTransactions(
    @Body() getTransactionHistoryDto: GetTransactionsDto,
  ) {
    return await this.walletService.getTransactions(
      getTransactionHistoryDto.walletId,
    );
  }
}
