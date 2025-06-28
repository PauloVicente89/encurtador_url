import { ApiProperty } from '@nestjs/swagger';

export class InternalServerErrorResponse {
  @ApiProperty({
    example: 'InternalServerError',
  })
  message: string;

  @ApiProperty({ example: 500 })
  statusCode: number;
}
