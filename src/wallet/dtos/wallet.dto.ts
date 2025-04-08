import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CurrencyEnum } from '../enums/wallet.enum';

export class WalletBalanceDto {
  @IsNotEmpty()
  @IsString()
  walletId: string;

  @IsEnum(CurrencyEnum)
  @IsNotEmpty()
  currency: CurrencyEnum;
}
