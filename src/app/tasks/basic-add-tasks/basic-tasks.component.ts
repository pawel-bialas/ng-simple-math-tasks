import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UUID} from "angular2-uuid";
import {TasksOptions} from "../model/TasksOptions";
import {TasksOptionsService} from "../service/tasks-options.service";
import {Observable} from "rxjs";
import {QMarkPosition} from "../model/QMarkPosition";
import {MathOperator} from "../model/MathOperator";


@Component({
  selector: 'basic-add-tasks',
  templateUrl: './basic-tasks.component.html',
  styleUrls: ['./basic-tasks.component.css']
})
export class BasicTasksComponent implements OnInit, OnDestroy {

  givenNum: number = 0;
  whenNum: number = 0;
  resultNum: number = 0;
  userNumber: number = 0;
  toggleButton: boolean = true;
  @Input('uid') uid!: String;
  @Output() solution: EventEmitter<any> = new EventEmitter<any>();
  tasksOptions$: Observable<TasksOptions> = this.tasksOptionsService.data$;
  tasksOptions!: TasksOptions;
  qMarkPosition = QMarkPosition;

  constructor(private tasksOptionsService: TasksOptionsService) {
    this.tasksOptions$.subscribe(value => {
      this.tasksOptions = new TasksOptions(value.quantity, value.range, value.qMarkPosition, value.mathOperator);
    });
    if (this.tasksOptions.qMarkPosition === QMarkPosition.right && this.tasksOptions.mathOperator !== MathOperator.subtract && this.tasksOptions.mathOperator !== MathOperator.divide) {
      this.givenNum = Math.floor((Math.random() * this.tasksOptions.range / 2) + 1);
      this.whenNum = Math.floor((Math.random() * this.tasksOptions.range / 2) + 1 + this.givenNum);
      this.resultNum = 0
    } else if (this.tasksOptions.qMarkPosition === QMarkPosition.right && this.tasksOptions.mathOperator === MathOperator.divide) {
      let results = this.divideAnswerProvider();
      let index = Math.floor((Math.random() *results.length) + 1)
      this.givenNum = results[index].givenNum;
      this.whenNum = results[index].whenNum;
      this.resultNum = 0
    } else if (this.tasksOptions.qMarkPosition === QMarkPosition.right && this.tasksOptions.mathOperator === MathOperator.subtract) {
      this.givenNum = Math.floor((Math.random() * this.tasksOptions.range / 2) + 1);
      this.whenNum = Math.floor((Math.random() * this.tasksOptions.range / 2) + 1);
      this.givenNum = this.givenNum + this.whenNum;
      this.resultNum = 0
    } else if (this.tasksOptions.qMarkPosition === QMarkPosition.center && this.tasksOptions.mathOperator === MathOperator.subtract) {
      this.givenNum = Math.floor((Math.random() * this.tasksOptions.range / 2) + 1);
      this.whenNum = 0;
      this.resultNum = Math.floor((Math.random() * this.tasksOptions.range / 2) + 1);
      this.givenNum = this.givenNum + this.resultNum;
    } else if (this.tasksOptions.qMarkPosition === QMarkPosition.center && this.tasksOptions.mathOperator === MathOperator.divide) {
      let results = this.divideAnswerProvider();
      let index = Math.floor((Math.random() *results.length) + 1)
      this.givenNum = results[index].givenNum;
      this.whenNum = 0
      this.resultNum = results[index].resultNum;
    } else if (this.tasksOptions.qMarkPosition === QMarkPosition.center && this.tasksOptions.mathOperator !== MathOperator.subtract && this.tasksOptions.mathOperator !== MathOperator.divide) {
      this.givenNum = Math.floor((Math.random() * this.tasksOptions.range / 2) + 1);
      this.whenNum = 0;
      this.resultNum = Math.floor((Math.random() * this.tasksOptions.range / 2) + 1 + this.givenNum);
    } else if (this.tasksOptions.qMarkPosition === QMarkPosition.left && this.tasksOptions.mathOperator === MathOperator.subtract) {
      this.givenNum = 0;
      this.whenNum = Math.floor((Math.random() * this.tasksOptions.range / 2) + 1 + this.resultNum);
      this.resultNum = Math.floor((Math.random() * this.tasksOptions.range / 2) + 1);
    } else if (this.tasksOptions.qMarkPosition === QMarkPosition.left && this.tasksOptions.mathOperator !== MathOperator.subtract && this.tasksOptions.mathOperator !== MathOperator.divide) {
      this.givenNum = 0;
      this.whenNum = Math.floor((Math.random() * this.tasksOptions.range / 2) + 1);
      this.resultNum = Math.floor((Math.random() * this.tasksOptions.range / 2) + 1 + this.whenNum);
    } else if (this.tasksOptions.qMarkPosition === QMarkPosition.left && this.tasksOptions.mathOperator === MathOperator.divide) {
      let results = this.divideAnswerProvider();
      let index = Math.floor((Math.random() *results.length) + 1)
      this.givenNum = 0
      this.whenNum = results[index].whenNum;;
      this.resultNum = results[index].resultNum;
    }
  }

  ngOnInit(): void {

  }

  addAnswer(): void {
    if (this.tasksOptions.qMarkPosition === QMarkPosition.right) {
      this.resultNum = this.userNumber;
    }
    if (this.tasksOptions.qMarkPosition === QMarkPosition.center) {
      this.whenNum = this.userNumber;
    }
    if (this.tasksOptions.qMarkPosition === QMarkPosition.left) {
      this.givenNum = this.userNumber;
    }
    this.solution.emit(
      {
        task: [this.givenNum, this.whenNum, this.resultNum],
        result: this.checkAnswer(),
        uid: this.uid,
        taskOptions: this.tasksOptions
      }
    )
    this.toggleButton = !this.toggleButton;
  }

  checkAnswer(): boolean {
    if (this.tasksOptions.mathOperator === MathOperator.add) {
      return this.givenNum + this.whenNum === this.resultNum;
    } else if (this.tasksOptions.mathOperator === MathOperator.subtract) {
      return this.givenNum - this.whenNum === this.resultNum;
    } else if (this.tasksOptions.mathOperator === MathOperator.multiply) {
      return this.givenNum * this.whenNum === this.resultNum;
    } else if (this.tasksOptions.mathOperator === MathOperator.divide) {
      return this.givenNum / this.whenNum === this.resultNum;
    } else return false;

  }

  ngOnDestroy(): void {

  }

  private divideAnswerProvider(): any[] {
    let result: any[] = [];
    for (let i = 1; i < this.tasksOptions.range * 2; i++) {
      for (let j = 1; j < 11; j++) {
        if ((i % j === 0) && (i * j < this.tasksOptions.range * 4)) {
          result.push({
            givenNum: i,
            whenNum: j,
            resultNum: i / j
          })
        }
      }
    }
    return this.shuffleArray(result);
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
