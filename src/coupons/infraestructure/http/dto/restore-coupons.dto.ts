import { Type } from "class-transformer";
import { IsDate } from "class-validator";

export class RestoreCouponsDto {
  @IsDate()
  @Type(() => Date)
  valid_until: Date;

  constructor(valid_until: Date) {
    this.valid_until = valid_until;
  }

  validate(): void {
    if (!(this.valid_until instanceof Date) || this.valid_until <= new Date()) {
      throw new Error("Invalid date format for valid_until");
    }
  }
}
