export interface ICreateUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  otp?: string;
  otpExpiry?: Date;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUserLeanData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  walletId: string;
  isEmailVerified: boolean;
  otp: string;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVerifyOtp {
  email: string;
  otp: string;
}
