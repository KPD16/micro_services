import {
    validate,
    validateOrReject,
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    Max,
    IsNotEmpty,
    IsEnum,
  } from 'class-validator';
import { IUser } from '../types/users_types';
  
export class User implements IUser {
  id: number;

  @IsNotEmpty()
  firstName: string;
  lastName: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  @IsEnum(['operator', 'admin', 'user'])
  role: 'operator' | 'admin' | 'user';
}  