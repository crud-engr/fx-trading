import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateUserDto,
  LoginDto,
  VerifyOtpDto,
} from 'src/users/dtos/user-auth.dto';
import { AuthService } from '../services/auth.service';
import { IUserLeanData } from 'src/users/interfaces/user-auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async signup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IUserLeanData> {
    return await this.authService.signup(createUserDto);
  }

  @Post('verify')
  public async verifyOtp(
    @Body() verifyOtpDto: VerifyOtpDto,
  ): Promise<IUserLeanData> {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  @Post('login')
  public async signin(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
