export class TasksOptions {

  quantity: number
  range: number
  variant: String
  operator: String

  public constructor(quantity: number, range: number, variant: String, operator: String) {
   this.quantity = quantity;
   this.range = range;
   this.variant = variant;
   this.operator = operator;
  }

}

