import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max } from 'class-validator';

export class RestoreCouponsDto {
  @IsNumber()
  @IsNotEmpty()
  @Max(30, {
    message: 'O campo "daysToExpire" deve ser um número entre 1 e 30',
  })
  @ApiProperty({
    description: 'Data de validade do cupom em dias',
    type: Number,
    example: 12,
  })
  daysToExpire: number;
}
