import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";

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
}
