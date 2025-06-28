import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUrl } from "class-validator";
import { Links } from "generated/prisma";

export class CreateShortUrlDto implements 
  Omit<
    Links,
    'id' |
    'userId' |
    'accessCount' |
    'code' |
    'createdAt' |
    'updatedAt' |
    'deletedAt'
  > 
{
  @IsNotEmpty({ message: "Original URL is required" })
  @IsUrl()
  @ApiProperty({ example: "https://example.com", required: true })
  originalUrl: string;
}