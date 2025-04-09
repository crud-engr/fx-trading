import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { GeneralUtil } from 'src/common/utils/general.util';
import {
  ICreateUser,
  ILoginUser,
  IUserLeanData,
  IVerifyOtp,
} from 'src/users/interfaces/user-auth.interface';
import { UsersService } from 'src/users/services/users.service';
import { WalletService } from 'src/wallet/services/wallet.service';
import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

/**
 * Authentication business logic
 */
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly walletService: WalletService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Signup user
   * @param data
   * @returns
   */
  public async signup(data: ICreateUser): Promise<IUserLeanData> {
    try {
      // Check if user already exists
      const user = await this.usersService.findByEmail(
        data.email.toLowerCase().trim(),
      );
      if (user) {
        throw new ConflictException('User already exists');
      }

      // Hash password
      data.password = GeneralUtil.hashString(data.password);

      // Generate and send OTP
      const otp = GeneralUtil.generateOTP();
      data.otp = otp;
      data.otpExpiry = moment().add(10, 'minutes').toDate();

      // Create user
      const newUser = await this.usersService.create(data);

      // Send OTP to user via mail

      const { password, ...others } = newUser;
      return others;
    } catch (error) {
      throw new BadRequestException(`${error.message}`);
    }
  }

  /**
   * Verify OTP
   * @param data
   * @returns
   */
  public async verifyOtp(data: IVerifyOtp): Promise<IUserLeanData> {
    try {
      // Check if email exists
      const user = await this.usersService.findByEmail(
        data.email.toLowerCase().trim(),
      );

      if (!user) {
        throw new BadRequestException('User not found');
      }

      // Check if OTP is valid
      if (data.otp !== user.otp) {
        throw new BadRequestException('Invalid or expired OTP');
      }

      // Check if OTP is expired
      if (user.otpExpiry < new Date()) {
        throw new BadRequestException('Invalid or expired OTP');
      }

      const walletData = {
        userId: user.id,
        walletId: GeneralUtil.generateWalletAccount(),
      };

      // Create wallet
      const wallet = await this.walletService.create(walletData);
      if (!wallet) {
        throw new BadRequestException('Error creating wallet');
      }

      // Update user with verified email
      user.isEmailVerified = true;
      user.otp = null;
      user.otpExpiry = null;
      user.walletId = wallet.walletId;

      // Update user
      const updatedUser = await this.usersService.update(user.id, user);

      // Sign jwt
      const signedData = { id: updatedUser.id, email: updatedUser.email };
      const jwtKey = this.configService.get<string>('JWT_KEY');
      const token = jwt.sign(signedData, jwtKey, { expiresIn: '7d' });

      const { password, ...others } = updatedUser;
      return { token, ...others };
    } catch (error) {
      throw new BadRequestException(`${error.message}`);
    }
  }

  /**
   * Sign in user
   * @param data
   * @returns
   */
  public async login(data: ILoginUser): Promise<IUserLeanData> {
    try {
      const user = await this.usersService.findByEmail(
        data.email.toLowerCase().trim(),
      );
      if (!user) {
        throw new BadRequestException('Invalid email or password');
      }

      if (!user.isEmailVerified) {
        throw new BadRequestException('Account is not verified');
      }

      // Compare password
      const isPasswordValid = GeneralUtil.compareHash(
        user.password,
        data.password,
      );

      if (!isPasswordValid) {
        throw new BadRequestException('Invalid email or password');
      }

      // Sign token
      const signedData = { id: user.id, email: user.email };
      const jwtKey = this.configService.get<string>('JWT_KEY');
      const token = jwt.sign(signedData, jwtKey, { expiresIn: '7d' });

      const { password, ...others } = user;
      return { token, ...others };
    } catch (error) {
      throw new BadRequestException(`${error.message}`);
    }
  }
}
