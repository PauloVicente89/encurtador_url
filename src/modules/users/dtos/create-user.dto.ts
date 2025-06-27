import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";
import { Users } from "generated/prisma";

export class CreateUserDto implements 
  Omit<
    Users,
    "id" | 
    "createdAt" |
    "updatedAt"
  >
{
  @IsEmail()
  @ApiProperty({ example: "hello@example.com", required: true })
  @IsNotEmpty({ message: "E-mail is required" })
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  @ApiProperty({ example: "123IsNotPassword", required: true })
  @IsNotEmpty({ message: "Password is required" })
  password: string;

  @ApiProperty({ example: "Paulo", required: true })
  @IsNotEmpty({ message: "Name is required" })
  name: string;
}