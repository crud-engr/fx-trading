import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from '../entity/wallet.entity';
import { ICreateWallet, IWalletBalance } from '../interfaces/wallet.interface';
import { WalletTransaction } from '../entity/wallet-transaction.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(WalletTransaction)
    private readonly walletTransactionRepository: Repository<WalletTransaction>,
  ) {}

  /**
   * Create wallet
   * @param wallet
   * @returns
   */
  public async create(wallet: ICreateWallet): Promise<Wallet> {
    return await this.walletRepository.save(wallet);
  }

  /**
   * Get wallet by userId
   * @param userId
   * @returns
   */
  public async getWalletBalance(data: IWalletBalance) {
    const wallet = await this.walletRepository.findOne({
      where: { walletId: data.walletId },
      select: ['balance'],
    });

    if (!wallet || !wallet.balance) return null;

    return {
      balance: {
        [data.currency]: wallet.balance[data.currency],
      },
    };
  }

  /**
   * Get transaction history of a wallet
   * @param data
   * @returns
   */
  public async getTransactions(walletId: string): Promise<WalletTransaction[]> {
    return await this.walletTransactionRepository.find({
      where: {
        walletId,
      },
    });
  }
}
