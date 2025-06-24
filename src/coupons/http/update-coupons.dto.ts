
import { Type } from "class-transformer";
import { IsDate, IsNumber, IsOptional} from "class-validator";

export class UpdateCouponsDto {
  @IsOptional()
  @IsNumber()
  max_uses: number;

  @Type(() => Date)
  @IsDate()
  deletedAt: Date;

}