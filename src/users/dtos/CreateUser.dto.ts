import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateUserAddressDto } from './CreateUserAddress.dto';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    example: 'john',
    required: true,
  })
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @ApiProperty({
    example: 'asD123.',
    required: true,
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateUserAddressDto)
  address: CreateUserAddressDto;
}
