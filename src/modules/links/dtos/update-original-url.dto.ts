import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUrl } from "class-validator";
import { Links } from "generated/prisma";

export class UpdateOriginalUrlDto implements 
  Omit<
    Links,
    'id' |
    'userId' |
    'originalUrl' |
    'accessCount' |
    'code' |
    'createdAt' |
    'updatedAt' |
    'deletedAt'
  > 
{
  @IsUrl()
  @ApiProperty({ example: "https://example.com", required: true })
  @IsNotEmpty({ message: 'Original URL cannot be empty' })
  originalUrl: string;
}