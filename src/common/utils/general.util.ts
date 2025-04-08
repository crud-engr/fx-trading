import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';

export class GeneralUtil {
  // Generate a random 6-digit OTP
  public static generateOTP = (): string => {
    return `${Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)}`;
  };

  // Generate a random 10-digit wallet account number
  public static generateWalletAccount = (): string => {
    return `${Math.floor(Math.random() * (9999999999 - 1000000000 + 1) + 1000000000)}`;
  };

  // Capitalize the first letter of a string
  public static capitalizeFirstLetter = (text: string) => {
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
  };

  //  Generate a unique transaction reference
  public static generateTransactionRef(): string {
    const rand = uuidv4().replace(/-/g, '').substring(0, 15).toUpperCase();
    return `FXTRAD-${rand}`;
  }

  // Compare a hash with a plain string
  public static compareHash(hash: string, plainString: string): boolean {
    return bcrypt.compareSync(plainString, hash);
  }

  // Hash a string
  public static hashString(plainString: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainString, salt);
  }
}
