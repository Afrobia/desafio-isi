import { IsEnum, IsNumber } from "class-validator";
import { Actions } from "../../../../products/domain/actions.enum";

export class UpdateProductDto {
  @IsNumber()
  amount: number;

  @IsEnum(Actions)
  action: Actions;
}
