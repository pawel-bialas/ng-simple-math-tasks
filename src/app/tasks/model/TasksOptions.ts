import {QMarkPosition} from "./QMarkPosition";
import {MathOperator} from "./MathOperator";

export class TasksOptions {

  quantity: number
  range: number
  qMarkPosition: QMarkPosition
  mathOperator: MathOperator

  public constructor(quantity: number, range: number, qMarkPosition: QMarkPosition, mathOperator: MathOperator) {
   this.quantity = quantity;
   this.range = range;
   this.qMarkPosition = qMarkPosition;
   this.mathOperator = mathOperator;
  }

}

