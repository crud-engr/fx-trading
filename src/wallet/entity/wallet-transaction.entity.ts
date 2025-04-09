import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  TransactionStatusEnum,
  TransactionTypeEnum,
} from '../enums/wallet.enum';

@Entity('wallet_transactions')
export class WalletTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  walletId: string;

  @Column()
  amount: number;

  @Column()
  rate: number;

  @Column()
  exchangeType: string;

  @Column()
  status: TransactionStatusEnum;

  @Column()
  type: TransactionTypeEnum;

  @Column()
  baseValue: number;

  @Column()
  targetValue: number;

  @Column()
  baseCurrency: number;

  @Column()
  targetCurrency: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
