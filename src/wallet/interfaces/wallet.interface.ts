import { CurrencyEnum } from '../enums/wallet.enum';

export interface ICreateWallet {
  walletId: string;
  userId: number;
}

export interface IWalletBalance {
  walletId: string;
  currency?: CurrencyEnum;
}
