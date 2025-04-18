import {
  IsEmpty,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { UserType } from '../../user/enum/user.type.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((o) => o.type === UserType.AGENCY) // Only validate if user type is AGENCY
  @IsString()
  @IsNotEmpty()
  agency: string;

  @IsEnum(UserType)
  @IsNotEmpty()
  type: UserType;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @IsMobilePhone('fa-IR')
  @IsNotEmpty()
  mobile: string;
}
