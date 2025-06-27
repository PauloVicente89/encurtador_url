import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class LoginDto {
  @ApiProperty({ example: "hello@example.com", required: true })
  @IsEmail()
  @IsNotEmpty({ message: "E-mail is required" })
  email: string

  @ApiProperty({ example: "123IsNotPassword", required: true })
  @IsNotEmpty({ message: "Password is required" })
  password: string
}