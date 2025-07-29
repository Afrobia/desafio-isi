import { IsEnum, IsNumber } from "class-validator";
import { Actions } from "../../../../products/domain/actions.enum";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto {
  @IsNumber()
  @ApiProperty()
  amount: number;

  @IsEnum(Actions)
  @ApiProperty()
  action: Actions;
}
