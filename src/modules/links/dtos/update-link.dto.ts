import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUrl, IsUUID } from "class-validator";
import { Links } from "generated/prisma";

export class UpdateLinkDto implements 
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
  @ApiProperty({ example: "https://example.com", required: false })
  @IsOptional()
  originalUrl?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ example: "7abb5e4c-23a9-4d39-a68f-aa2a2d6ca6e7", required: false })
  userId?: string | null;

  @ApiProperty({ example: "7aaDad", required: false, description: "Generated automatically by the API" })
  @IsOptional()
  code?: string;

  @ApiProperty({ example: 2344, required: false, description: "Generated automatically by the API" })
  @IsOptional()
  accessCount?: number;

  @ApiProperty({ example: new Date(), required: false, description: "Generated automatically by the API" })
  @IsOptional()
  deletedAt?: Date;
}