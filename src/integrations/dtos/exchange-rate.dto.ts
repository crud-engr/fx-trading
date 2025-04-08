import { IsEnum, IsNotEmpty } from 'class-validator';
import { CurrencyEnum } from 'src/wallet/enums/wallet.enum';

export class RateDto {
  @IsEnum(CurrencyEnum)
  @IsNotEmpty()
  currency: CurrencyEnum;
}
