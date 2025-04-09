import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CurrencyEnum } from '../enums/wallet.enum';

export class WalletBalanceDto {
  @IsNotEmpty()
  @IsString()
  walletId: string;

  @IsEnum(CurrencyEnum)
  @IsNotEmpty()
  currency: CurrencyEnum;
}

export class GetTransactionsDto {
  @IsNotEmpty()
  @IsString()
  walletId: string;
}

export class FundWalletDto {
  @IsString()
  @IsNotEmpty()
  walletId: string;

  @IsString()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  pin: string;

  @IsString()
  @IsOptional()
  reference: string;
}
