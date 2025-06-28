import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsUrl, IsUUID } from "class-validator";
import { Links } from "generated/prisma";

export class CreateLinkDto implements 
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

  @IsUUID()
  @IsOptional()
  @ApiProperty({ example: "7abb5e4c-23a9-4d39-a68f-aa2a2d6ca6e7", required: false })
  userId: string | null;

  @ApiProperty({ example: "7aaDad", required: false, description: "Generated automatically by the API" })
  @IsOptional()
  code: string;
}