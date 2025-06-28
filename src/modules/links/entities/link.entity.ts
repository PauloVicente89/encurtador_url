import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Links } from "generated/prisma";

export class LinkEntity implements Links {
  constructor(partial: Partial<LinkEntity>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  id: string;

  @ApiProperty()
  originalUrl: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  userId: string | null;

  @ApiProperty()
  accessCount: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  @Exclude()
  deletedAt: Date | null;
}